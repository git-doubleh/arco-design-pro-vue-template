<template>
  <div class="container">
    <a-card class="general-card" :title="$t('menu.list.searchTable')">
      <FilterForm :options="filterOptions" @on-query="search"></FilterForm>

      <a-table
        :bordered="false"
        :pagination="pagination"
        row-key="id"
        :loading="loading"
        :data="renderData"
        :columns="columns"
        @page-change="onPageChange"
      >
        <template #filterType="{ record }">
          {{ $t(`searchTable.form.filterType.${record.filterType}`) }}
        </template>
        <template #status="{ record }">
          <span v-if="record.status === 'offline'" class="circle"></span>
          <span v-else class="circle pass"></span>
          {{ $t(`searchTable.form.status.${record.status}`) }}
        </template>
        <template #operations>
          <a-button v-permission="['admin']" type="text" size="small">
            {{ $t("searchTable.columns.operations.view") }}
          </a-button>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed } from "vue"
  import { useI18n } from "vue-i18n"
  import useLoading from "@/hooks/loading"
  import { queryPolicyList, PolicyRecord, PolicyParams } from "@/api/list"
  import FilterForm from "@/components/FilterForm/index.vue"

  const generateFormModel = () => {
    return {
      number: "",
      name: "",
      contentType: "",
      filterType: "",
      createdTime: [],
      status: ""
    }
  }
  const { loading, setLoading } = useLoading(true)
  const { t } = useI18n()
  const renderData = ref<PolicyRecord[]>([])
  const formModel = ref(generateFormModel())
  const basePagination = {
    current: 1,
    pageSize: 20,
    total: 0
  }
  const filterOptions = reactive([
    {
      type: "input",
      label: "searchTable.form.username",
      value: "userName"
    },
    {
      type: "select",
      label: "searchTable.form.gender",
      value: "sex",
      selectOptions: [
        {
          label: "男",
          value: "1"
        }
      ]
    },
    {
      type: "rangepicker",
      label: "searchTable.form.createtime",
      value: "createdPeriod",
      pickerParams: ["createdTimeBegin", "createdTimeEnd"]
    }
  ])
  // 使用计算属性定义 保证国际化支持
  const columns = computed(() => [
    {
      title: t("searchTable.columns.number"),
      dataIndex: "number"
    },
    {
      title: t("searchTable.columns.name"),
      dataIndex: "name"
    },
    {
      title: t("searchTable.columns.filterType"),
      dataIndex: "filterType",
      slotName: "filterType"
    },
    {
      title: t("searchTable.columns.count"),
      dataIndex: "count"
    },
    {
      title: t("searchTable.columns.status"),
      dataIndex: "status",
      slotName: "status"
    },
    {
      title: t("searchTable.columns.createdTime"),
      dataIndex: "createdTime"
    },
    {
      title: t("searchTable.columns.operations"),
      dataIndex: "operations",
      slotName: "operations"
    }
  ])
  const pagination = reactive({
    ...basePagination
  })
  const fetchData = async (
    params: PolicyParams = { current: 1, pageSize: 20 }
  ) => {
    setLoading(true)
    try {
      const { data } = await queryPolicyList(params)
      renderData.value = data.list
      pagination.current = params.current
      pagination.total = data.total
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false)
    }
  }

  /**
   * 查询回调
   * @param val
   */
  const search = (val) => {
    fetchData({
      ...basePagination,
      ...formModel.value
    } as unknown as PolicyParams)
  }
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current })
  }

  fetchData()
</script>

<script lang="ts">
  export default {
    name: "SearchTable"
  }
</script>

<style scoped lang="less">
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
</style>
