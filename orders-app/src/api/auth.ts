import { api } from "./client";

export type LoginRequest = { username: string; password: string };
export type LoginResponse = { token: string; expiresInSeconds: number };

export async function login(req: LoginRequest) {
  const { data } = await api.post<LoginResponse>("/api/auth/login", req);
  return data;
}