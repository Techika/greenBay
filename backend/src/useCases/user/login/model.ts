export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  token?: string;
  balance?:number;
  message?:string;
  username?:string;
}
