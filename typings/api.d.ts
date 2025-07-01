export interface BaseResponse {
  status: boolean;
  message: string;
}
export interface Account {
  id: number;
  username: string;
  nickName: string;
  sex: number;
  age: number;
  phone: string;
  email: string;
  createTime: string;
  updateTime: string;
}
