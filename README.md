# 📱 Orders Mobile App – React Native

O aplicativo consome a API Orders desenvolvida em .NET, permitindo:

- Autenticação via JWT
- Listagem de pedidos
- Aprovação manual de pedidos
- Armazenamento seguro do token

---

# 🚀 Tecnologias Utilizadas

- React Native (Expo)
- Expo Router
- Axios
- Expo SecureStore
- TypeScript

---

# 📦 Como Executar

## 1. Requisitos

- Node 18+ (recomendado 20 LTS)
- npm
- Expo CLI (via npx)
- Xcode (para iOS Simulator)
- Backend rodando em `http://localhost:8080`

Verificar versão:

```bash
node -v
```

## 2. Instalar dependências

```bash
npm install
```

## 3. Configurar URL da API

```bash
src/api/client.ts
```

Para iOS Simulator:
```bash
export const BASE_URL = "http://localhost:8080";
```

## 3. Iniciar aplicação
```bash
npx expo start
```

Pressionar:
```bash
i
```
