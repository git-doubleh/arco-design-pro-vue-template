<!--
 * @Description: 
 * @Date: 2022-10-10 09:44:00
 * @LastEditTime: 2022-10-19 15:46:18
-->
<template>
  <div class="container">
    <div class="content">
      <div class="content-inner">
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import LoginForm from "./components/login-form.vue"
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    height: 100vh;

    .content {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      padding-bottom: 40px;
    }

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
    }
  }
</style>
