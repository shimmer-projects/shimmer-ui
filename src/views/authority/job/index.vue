<script setup lang="ts">
import { ApiResult, Pager } from "@/api/base";
import {
  Job,
  jobDelete,
  jobDetail,
  jobInsert,
  jobList,
  jobUpdate
} from "@/api/job";
import { reactive, ref } from "vue";
import JobForm from "@/views/authority/job/JobForm.vue";

defineOptions({
  name: "JobManager"
});

const jobs = ref();

const defaultPageSize = ref(10);
// 列表查询
const page = ref({ pageNo: 1, pageSize: defaultPageSize.value } as Pager<Job>);

const changeCurrentPage = (value: number) => {
  // 基于查询条件的分页查询
  page.value.pageNo = value;
  searchAssign();
};
const changePrevPage = (value: number) => {
  page.value.pageNo = value - 1;
  searchAssign();
};
const changeNextPage = (value: number) => {
  page.value.pageNo = value + 1;
  searchAssign();
};
const changePageSize = (size: number) => {
  page.value.pageSize = size;
  searchAssign();
};

const searchAssign = () => {
  const param = Object.assign(page.value, searchForm);
  list(param);
};
const list = (data?: Job) => {
  jobList(data).then((res: ApiResult<Array<Job>>) => {
    page.value = res.page;
    jobs.value = res.data;
  });
};

list({ pageNo: 1, pageSize: defaultPageSize.value } as any);

// Job数据
let formData = reactive({} as Job);

// 新增
const dialogVisible = ref();
const addJob = () => {
  dialogVisible.value = true;
};
const confirmAdd = () => {
  jobInsert(formData).then(() => {
    dialogVisible.value = false;
    list();
  });
};

// 修改
const editVisible = ref();
const handleEdit = (id: number) => {
  jobDetail(id).then((res: ApiResult<Job>) => {
    formData = reactive(res.data);
    editVisible.value = true;
  });
};
const confirmEdit = () => {
  jobUpdate(formData).then(() => {
    editVisible.value = false;
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

// 删除
const handleDelete = (id: number) => {
  jobDelete(id).then(() => list());
};

// search
const searchForm = reactive({
  positionName: "",
  positionCode: "",
  remark: ""
});
const onSubmit = () => {
  list(searchForm);
};
</script>

<template>
  <div>
    <el-dialog v-model="dialogVisible" title="新增职位" width="700" draggable>
      <JobForm v-model="formData" />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmAdd"> 确认</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="editVisible" title="修改职位" width="700" draggable>
      <JobForm v-model="formData" />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmEdit"> 确认</el-button>
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
        padding-top: 15px;
        padding-left: 2rem;
        background-color: #fff;
      "
    >
      <el-button type="primary" @click="addJob">新增</el-button>
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="职位名称">
          <el-input
            v-model="searchForm.positionName"
            placeholder="请输入职位名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="职位编码">
          <el-input
            v-model="searchForm.positionCode"
            placeholder="请输入职位编码"
            clearable
          />
        </el-form-item>
        <el-form-item label="职位描述">
          <el-input
            v-model="searchForm.remark"
            placeholder="请输入职位描述"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div
      style="
        height: 100%;
        padding: 0.5rem;
        margin-top: 0.5rem;
        background-color: #fff;
      "
    >
      <el-table
        :data="jobs"
        highlight-current-row
        border
        :header-cell-style="{ background: '#f5f7fa', color: '#606266' }"
        style="width: 100%"
      >
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
              >详情
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click="handleEdit(scope.row.id)"
              >编辑
            </el-button>
            <el-popconfirm
              title="确定要删除吗?"
              @confirm="handleDelete(scope.row.id)"
            >
              <template #reference>
                <el-button link type="primary" size="small">删除 </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        small
        layout="total, sizes, prev, pager, next, jumper"
        v-model:current-page="page.pageNo"
        v-model:page-size="page.pageSize"
        :total="page.recordCount"
        @current-change="changeCurrentPage"
        @prev-click="changePrevPage"
        @next-click="changeNextPage"
        @size-change="changePageSize"
        :default-page-size="defaultPageSize"
        style="
          display: flex;
          justify-content: flex-end;
          width: 100%;
          margin: 16px 0;
        "
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-form-inline {
  float: right;

  .el-input {
    --el-input-width: 220px;
  }

  .el-select {
    --el-select-width: 220px;
  }
}

.el-table__inner-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
