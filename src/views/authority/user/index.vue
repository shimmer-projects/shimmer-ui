<script setup lang="ts">
import { userList } from "@/api/user";
import { ref } from "vue";

defineOptions({
  name: "UserManager"
});
const users = ref();
const promise = userList();
promise.then(res => {
  users.value = res;
});
</script>

<template>
  <div>
    <h1>用户管理</h1>
    {{ users }}
  </div>
</template>

<style scoped lang="scss">
h1 {
  color: pink;
}
</style>
