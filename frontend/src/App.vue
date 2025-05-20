<script setup lang="ts">
import { ref } from 'vue';
import zh_CN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useCommomStore } from '@/models';

const commomStore = useCommomStore();
commomStore.init();

dayjs.locale('zh-cn');
const locale = ref<any>(zh_CN);

</script>

<template>
  <a-config-provider :locale="locale">
    <router-view></router-view>
  </a-config-provider>
</template> 

<style>
</style>
