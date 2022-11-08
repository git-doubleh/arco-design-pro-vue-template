<!--
 * @Description: 筛选项
 * @Date: 2022-09-09 13:52:39
 * @LastEditTime: 2022-11-08 10:24:27
-->
<template>
  <a-form
    ref="refFormInline"
    class="filter-form"
    :label-col-props="formLabel"
    layout="inline"
    :model="formInline"
  >
    <a-form-item
      v-for="(item, index) in options"
      :key="item.value"
      :label="$t(item.label)"
      :field="`options.${index}.value`"
    >
      <template v-if="item.type === 'input'">
        <a-input
          v-model="formInline[item.value]"
          allow-clear
          :style="{ width: formItemWidth.normal }"
          :placeholder="inputHolder(item.placeholder)"
        />
      </template>
      <template v-else-if="item.type === 'select'">
        <a-select
          v-model="formInline[item.value]"
          allow-clear
          :style="{ width: formItemWidth.normal }"
          :placeholder="selectHolder(item.placeholder)"
        >
          <a-option
            v-for="it in item.selectOptions"
            :key="item.props ? it[item.props.value] : it.value"
            :value="item.props ? it[item.props.value] : it.value"
          >
            {{ item.props ? $t(it[item.props.label]) : $t(it.label) }}
          </a-option>
        </a-select>
      </template>
      <template v-else-if="item.type === 'rangepicker'">
        <a-range-picker
          v-model="formInline[item.value]"
          v-bind="item"
          :style="{ width: formItemWidth.rangepicker }"
          :show-time="item.showTime === undefined ? true : item.showTime"
          :mode="item.mode === undefined ? 'date' : item.mode"
          :format="item.formart || formart"
          @change="rangePickerChange($event, item)"
        />
      </template>
      <template v-else>
        <a-date-picker
          v-model="formInline[item.value]"
          :style="{ width: formItemWidth.normal }"
          :show-time="item.showTime === undefined ? true : item.showTime"
          :mode="item.mode === undefined ? 'date' : item.mode"
          :format="item.formart || formart"
          :value-format="item.formart || formart"
          @change="datepickerChange($event, item)"
        />
      </template>
    </a-form-item>
    <div class="btns">
      <a-button style="margin-right: 8px" @click="onReset">{{
        $t("filter.reset")
      }}</a-button>
      <a-button type="primary" @click="onQuery">{{
        $t("filter.search")
      }}</a-button>
    </div>
  </a-form>
</template>

<script lang="ts" setup>
  // @ts-nocheck

  import { useI18n } from "vue-i18n"
  import {
    defineProps,
    defineEmits,
    ref,
    reactive,
    watch,
    PropType,
    computed
  } from "vue"
  import { IPropOptions, IForminline, IFormItemWidth } from "./type"

  const { t } = useI18n()
  const $emit = defineEmits(["onQuery"])
  const props = defineProps({
    labelWidth: {
      type: String,
      default: "100px"
    },
    options: {
      type: Array as PropType<IPropOptions[]>,
      default: () => [
        {
          type: "input", // select rangepicker datepicker
          label: "姓名",
          value: "userName",
          placeholder: "请输入",
          selectOptions: [], // 下拉绑定
          pickerParams: ["start", "end"], // 日期格式绑定参数 开始字段 结束字段
          mode: "date", // time|date|month|year|decade
          formart: "YYYY-MM-DD HH:mm:ss"
        }
      ]
    }
  })
  // 表单元素宽度
  const formItemWidth: IFormItemWidth = reactive({
    normal: "200px",
    rangepicker: "320px"
  })
  // 表单绑定对象
  const formInline: IForminline = ref({})
  // 标签的宽度
  const formLabel = reactive({ style: { width: props.labelWidth } })
  // 日期格式化
  const formart = ref("YYYY-MM-DD HH:mm:ss")

  // 输入框 placeholder
  const inputHolder = computed(() => {
    return (val) => {
      return val ? t(val) : t("filter.inputHolder")
    }
  })
  // 下拉框 placeholder
  const selectHolder = computed(() => {
    return (val) => {
      return val ? t(val) : t("filter.selectHolder")
    }
  })
  /**
   * 初始化绑定对象
   */
  const initParams = () => {
    props.options.forEach((v) => {
      if (v.type === "rangepicker") {
        const [start, end] = v?.pickerParams
        formInline.value[start] = undefined
        formInline.value[end] = undefined
        formInline.value[v.value] = []
      } else {
        formInline.value[v.value] = v.initvalue || undefined
      }
    })
  }

  // 初始化表单绑定对象
  watch(
    () => props.options,
    () => {
      if (props.options.length) {
        initParams()
      }
    },
    {
      immediate: true
    }
  )

  /**
   * 区间日期改变
   * @param event 选中的日期
   * @param target 当前项
   */
  const rangePickerChange = (event: object, target: object) => {
    formInline.value[target.value] = event
    const [start, end] = target.pickerParams
    ;[formInline.value[start], formInline.value[end]] = event.length
      ? [...event]
      : [undefined, undefined]
  }

  /**
   * 独立日期改变
   * @param event
   * @param target
   */
  const datepickerChange = (event: object, target: object) => {
    formInline.value[target.value] = event
  }
  /**
   * 重置
   */
  const onReset = () => {
    initParams()
  }
  /**
   * 查询
   */
  const onQuery = () => {
    const params = { ...formInline.value }
    // 赋值日期绑定数组字段为空
    const rangeDateKeys = props.options
      .filter((it) => it?.type === "rangepicker")
      .map((it) => it.value)

    rangeDateKeys.forEach((v) => {
      params[v] = undefined
    })

    $emit("onQuery", params)
  }
</script>

<style lang="less" scoped>
  .arco-form-layout-inline {
    .btns {
      flex: 10;
      text-align: right;
      white-space: nowrap;
    }
  }
</style>
