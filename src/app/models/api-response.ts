// This file was created to use an unreleased interface with the angular-token library
// https://github.com/neroniaky/angular-token/blob/master/projects/angular-token/src/lib/angular-token.model.ts

export interface ApiResponse {
  status?: number;
  success?: boolean;
  statusText?: string;
  data?: UserData;
  errors?: any;
}

export interface UserData {
  id: number;
  provider: string;
  uid: string;
  name: string;
  nickname: string;
  image: any;
  login: string;
  administrator: boolean;
}
