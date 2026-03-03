import { router } from "expo-router";
import { useState } from "react";
import { Alert, Button, SafeAreaView, Text, TextInput, View } from "react-native";
import { login } from "../src/api/auth";
import { saveToken } from "../src/auth/tokenStorage";

export default function LoginScreen() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    try {
      setLoading(true);
      const res = await login({ username, password });
      await saveToken(res.token);
      router.replace("/orders");
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        "Falha no login.";
      Alert.alert("Login", msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Acessar</Text>

      <View style={{ gap: 8 }}>
        <Text>Usuário</Text>
        <TextInput
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
          style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
        />
      </View>

      <View style={{ gap: 8 }}>
        <Text>Senha</Text>
        <TextInput
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
        />
      </View>

      <Button title={loading ? "Entrando..." : "Entrar"} onPress={onSubmit} disabled={loading} />
    </SafeAreaView>
  );
}