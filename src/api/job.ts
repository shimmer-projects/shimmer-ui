import { http } from "@/utils/http";

export type Job = {
  positionName: string;
  positionCode: string;
  remark?: string;
};
export const jobList = (data?: any) => {
  return http.get("/shimmer/position/fetch", {
    params: data
  });
};

export const jobInsert = (data: Job) => {
  return http.post("/shimmer/position/insert", { data });
};

export const jobDetail = (id: number) => {
  return http.request("get", "/shimmer/position/detail?id=" + id);
};
export const jobUpdate = (data: Job) => {
  return http.request("put", "/shimmer/position/update", { data });
};
export const jobDelete = (id: number) => {
  return http.request("delete", "/shimmer/position/delete", { params: { id } });
};
