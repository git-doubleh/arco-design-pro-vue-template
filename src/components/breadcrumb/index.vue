<!--
 * @Description: 面包屑组件
 * @Date: 2022-10-10 09:44:00
 * @LastEditTime: 2022-10-19 17:00:46
-->
<template>
  <a-breadcrumb class="container-breadcrumb">
    <a-breadcrumb-item>
      <icon-apps />
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="item in levelList" :key="item">
      {{ $t(item.meta.locale) }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
  import { ref, watch } from "vue"
  import { useRoute } from "vue-router"

  const route = useRoute()
  // 面包屑数据
  const levelList = ref(null)

  /**
   * 计算面包屑层级
   */
  const getBreadcrumb = () => {
    const matched = route.matched.filter(
      (item) => item.meta && item.meta.locale
    )
    levelList.value = matched.filter((item) => item.meta && item.meta.locale)
  }

  watch(
    () => route.path,
    () => {
      getBreadcrumb()
    },
    { immediate: true }
  )
</script>

<style scoped lang="less">
  .container-breadcrumb {
    margin: 16px 0;

    :deep(.arco-breadcrumb-item) {
      color: rgb(var(--gray-6));

      &:last-child {
        color: rgb(var(--gray-8));
      }
    }
  }
</style>
