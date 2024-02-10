<script setup lang="ts">
import { Job } from "@/api/job";

defineOptions({
  name: "JobForm"
});

const formLabelWidth = "80px";

const model = defineModel<Job>();
</script>

<template>
  <el-form :model="model">
    <el-form-item label="职位名称" :label-width="formLabelWidth">
      <el-input v-model="model.positionName" />
    </el-form-item>
    <el-form-item label="职位编码" :label-width="formLabelWidth">
      <el-input v-model="model.positionCode" />
    </el-form-item>
    <el-form-item label="描述说明" :label-width="formLabelWidth">
      <el-input v-model="model.remark" type="textarea" />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
.main {
  font-size: 12px;
}
</style>
