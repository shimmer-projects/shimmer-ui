<script setup lang="ts">
import { reactive } from "vue";

defineOptions({
  name: "JobForm"
});

const formLabelWidth = "80px";
const jobForm = reactive({
  positionName: "",
  positionCode: "",
  remark: ""
});

defineExpose(jobForm);
</script>

<template>
  <el-form :model="jobForm">
    <el-form-item label="职位名称" :label-width="formLabelWidth">
      <el-input v-model="jobForm.positionName" />
    </el-form-item>
    <el-form-item label="职位编码" :label-width="formLabelWidth">
      <el-input v-model="jobForm.positionCode" />
    </el-form-item>
    <el-form-item label="描述说明" :label-width="formLabelWidth">
      <el-input v-model="jobForm.remark" type="textarea" />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
.main {
  font-size: 12px;
}
</style>
