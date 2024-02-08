<script setup lang="ts">
import { userList } from "@/api/user";
import { ref } from "vue";

defineOptions({
  name: "UserManager"
});
const users = ref();
const promise = userList();
promise.then(res => {
  console.log(res);
  users.value = res;
});
</script>

<template>
  <h1>用户管理</h1>
  {{ users }}
</template>

<style scoped lang="scss">
h1 {
  color: pink;
}
</style>
