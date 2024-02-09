<script setup lang="ts">
import { ApiResult, Pager } from "@/api/base";
import { Job, jobDelete, jobDetail, jobInsert, jobList } from "@/api/job";
import { ref } from "vue";
import JobForm from "@/views/authority/job/JobForm.vue";

defineOptions({
  name: "JobManager"
});

const jobs = ref();

const list = () => {
  jobList().then((res: ApiResult<Pager<Job>>) => {
    console.log(res);
    jobs.value = res.data.data;
  });
};

list();

const dialogVisible = ref();
const addJob = () => {
  dialogVisible.value = true;
};

const jobForm = ref({} as Job);

const confirmAdd = () => {
  dialogVisible.value = false;
  console.log(jobForm.value);
  jobInsert(jobForm.value).then(() => {
    list();
  });
};
// 详情操作
const detailDialog = ref();
const jobDetails = ref();
const handleDetail = (id: number) => {
  jobDetail(id).then((res: ApiResult<Job>) => {
    jobDetails.value = res.data;
    detailDialog.value = true;
  });
};
const handleEdit = (id: number) => {
  console.log(id);
};

const handleDelete = (id: number) => {
  jobDelete(id).then(() => list());
};
</script>

<template>
  <div>
    <el-dialog v-model="dialogVisible" title="新增职位" width="700" draggable>
      <JobForm ref="jobForm" />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmAdd"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="detailDialog" title="职位详情" width="700" draggable>
      <el-form :model="jobDetails">
        <el-form-item label="职位名称" label-width="80">
          <el-input disabled v-model="jobDetails.positionName" />
        </el-form-item>
        <el-form-item label="职位编码" label-width="80">
          <el-input disabled v-model="jobDetails.positionCode" />
        </el-form-item>
        <el-form-item label="描述说明" label-width="80">
          <el-input disabled v-model="jobDetails.remark" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="detailDialog = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
    <div
      style="
        height: 60px;
        padding-top: 20px;
        padding-left: 2rem;
        background-color: #fff;
      "
    >
      <el-button type="primary" @click="addJob">新增</el-button>
    </div>
    <div
      style="
        height: 100%;
        padding: 0.5rem;
        margin-top: 0.5rem;
        background-color: #fff;
      "
    >
      <el-table :data="jobs" border style="width: 100%">
        <el-table-column prop="positionName" label="职位名称" width="180" />
        <el-table-column prop="positionCode" label="职位编码" width="180" />
        <el-table-column prop="remark" label="描述说明" />
        <el-table-column fixed="right" label="操作" width="180">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleDetail(scope.row.id)"
              >详情</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              @click="handleEdit(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
h1 {
  color: pink;
}
</style>
