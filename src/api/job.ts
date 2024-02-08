import { http } from "@/utils/http";
import { ApiResult, Pager } from "@/api/base";

export type Job = {
  positionName: string;
  positionCode: string;
  remark?: string;
};
export const jobList = (data?: ApiResult<Pager<Job>>) => {
  if (data.cost > 20) {
    console.log(data);
  }
  return http.get("/shimmer/position/fetch");
};

export const jobInsert = (data: Job) => {
  return http.post("/shimmer/position/insert", { data });
};

export const jobDelete = (id: number) => {
  return http.request("delete", "/shimmer/position/delete", { params: { id } });
};

export const jobDetail = (id: number) => {
  return http.request("get", "/shimmer/position/detail?id=" + id);
};
