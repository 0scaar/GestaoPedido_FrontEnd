import { api } from "./client";

export type OrderDto = {
  orderId: string;
  customerName?: string; // ideal: API devolve isso
  customerId?: string;   // fallback se não tiver name
  totalAmount: number;
  status: string;
  requiresManualApproval: boolean;
};

export async function getOrders() {
  const { data } = await api.get<OrderDto[]>("/api/orders");
  return data;
}

export async function approveOrder(orderId: string) {
  await api.put(`/api/orders/${orderId}/approve`);
}