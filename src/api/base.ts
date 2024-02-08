export type ApiResult<T> = {
  code: string;
  desc: string;
  time: string;
  cost: number;
  data: T;
};

export type Pager<T> = {
  first: boolean;
  last: boolean;
  next: boolean;
  previous: boolean;
  pageCount: number;
  pageNo: number;
  pageSize: number;
  recordCount: number;
  data: Array<T>;
};
