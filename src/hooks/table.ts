// hook/table-props.ts

import { ref } from "vue"

import useLoading from "./loading"
// 请求接口
export default function useTbleProps(loadListFunc) {
  // 加载效果
  const { loading, setLoading } = useLoading(true)
  // 属性组
  const propsRes = ref({
    "row-key": "id",
    "bordered": true,
    "hoverable": true,
    "stripe": true,
    "size": "small",
    "column-resizable": true,
    // "row-selection": {
    //   type: "checkbox",
    //   showCheckedAll: true,
    //   onlyCurrent: false
    // },
    // "scroll": { y: 550, x: '100%' },
    "loading": loading,
    "data": [],
    "pagination": {
      current: 1,
      pageSize: 20,
      total: 0
    }
  })
  // 选中项的数据 row-key 集合
  const selectedRows = ref([])
  /**
   * 分页设置
   * @param current //当前页数
   * @param total //总页数默认是0条，可选
   * @param fetchData 获取列表数据,可选
   */
  interface SetPaginationPrams {
    current: number
    pageSize?: number
    total?: number
  }

  // 设置分页
  const setPagination = ({ current, total }: SetPaginationPrams) => {
    propsRes.value.pagination.current = current
    if (total) {
      propsRes.value.pagination.total = total
    }
  }

  // 单独设置默认属性
  const setProps = (params: object) => {
    Object.keys(params).forEach((item) => {
      propsRes.value[item] = params[item]
    })
  }

  // 设置请求参数，如果出了分页参数还有搜索参数，在模板页面调用此方法，可以加入参数
  const loadListParams = ref<object>({})
  const setLoadListParams = (params?: object) => {
    loadListParams.value = params
  }

  // 加载分页列表数据
  const loadList = async () => {
    setLoading(true)
    const { data } = await loadListFunc({
      ...propsRes.value.pagination,
      ...loadListParams.value
    })

    propsRes.value.data = data.list as T[]
    setPagination({ current: data.current, total: data.total })
    setLoading(false)
    return data
  }

  // 事件触发组
  const propsEvent = ref({
    // 排序触发
    sorterChange: (dataIndex: string, direction: string) => {
      console.log(dataIndex, direction)
    },
    // 排序触发
    selectionChange: (rowKeys: []) => {
      selectedRows.value = rowKeys
    },
    // 分页触发
    pageChange: (current: number) => {
      setPagination({ current })
      loadList()
    },
    // 修改每页显示条数
    pageSizeChange: (pageSize: number) => {
      propsRes.value.pagination.pageSize = pageSize
      loadList()
    }
  })

  return {
    propsRes,
    propsEvent,
    selectedRows,
    setProps,
    setLoading,
    loadList,
    setPagination,
    setLoadListParams
  }
}
