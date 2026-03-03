import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, FlatList, RefreshControl, SafeAreaView, Text, View } from "react-native";
import { approveOrder, getOrders, OrderDto } from "../api/orders";
import { AuthContext } from "../auth/AuthContext";

export default function OrdersScreen() {
  const { signOut } = useContext(AuthContext);

  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function load() {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (e: any) {
      const status = e?.response?.status;
      if (status === 401) {
        Alert.alert("Sessão expirada", "Faça login novamente.");
        await signOut();
        return;
      }
      const msg = e?.response?.data?.error || "Falha ao carregar pedidos.";
      Alert.alert("Pedidos", msg);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onApprove(orderId: string) {
    try {
      await approveOrder(orderId);
      Alert.alert("Pedido", "Pedido aprovado com sucesso.");
      await load();
    } catch (e: any) {
      const msg = e?.response?.data?.error || "Falha ao aprovar pedido.";
      Alert.alert("Aprovação", msg);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>Pedidos</Text>
        <Button title="Sair" onPress={signOut} />
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderId}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} />}
        ListEmptyComponent={
          loading ? <Text>Carregando...</Text> : <Text>Nenhum pedido encontrado.</Text>
        }
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 12,
              marginBottom: 10,
              gap: 6,
            }}
          >
            <Text style={{ fontWeight: "700" }}>ID: {item.orderId}</Text>

            <Text>
              Cliente: {item.customerName ?? item.customerId ?? "-"}
            </Text>

            <Text>Valor: {item.totalAmount.toFixed(2)}</Text>
            <Text>Status: {item.status}</Text>

            {item.requiresManualApproval ? (
              <View style={{ marginTop: 8, gap: 8 }}>
                <Text style={{ color: "crimson", fontWeight: "600" }}>
                  Requer aprovação manual
                </Text>
                <Button title="Aprovar" onPress={() => onApprove(item.orderId)} />
              </View>
            ) : null}
          </View>
        )}
      />
    </SafeAreaView>
  );
}