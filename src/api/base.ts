export type ApiResult<T> = {
  code: string;
  desc: string;
  time: string;
  cost: number;
  page?: Pager;
  data?: T;
};

export type Pager = {
  first: boolean;
  last: boolean;
  next: boolean;
  previous: boolean;
  pageCount: number;
  pageNo: number;
  pageSize: number;
  recordCount: number;
};
