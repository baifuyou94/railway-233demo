<script setup lang="ts">

import LoginForm from './Form.vue';

</script>
<template>
  <div class="login-container">‘
    <div  class="login">
      <div class="login_right_container">
        <div class="title_box">
          <h2 class="title">监测综合管理中心</h2>
        </div>
        <!-- form -->
        <login-form />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .login-container {
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(to right, #74ebd5 0%, #9face6 100%);

    display:flex;
    justify-content: center;
    align-items: center;
    padding:16px;
    .login {
      border-radius: 10px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
      // background-image: linear-gradient(to top, #9795f0 0%, #fbc8d4 100%);
      &_right {
        padding: 24px;
        &_container {
        padding: 24px;
        width: 360px;
        margin: 0 auto;
        }
      }
    }
  }
  .title_box {
    display: flex;
    .title {
      font-size: 22px;
      color: #000000;
    }
  }
</style>
