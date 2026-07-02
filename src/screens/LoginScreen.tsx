import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import SquadUpLogo from "../../assets/squadup_logo.svg";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../contexts/AuthContext";
import type { AuthStackParamList } from "../navigation/types";

type LoginNavProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

function validateEmail(email: string) {
  return email.length > 0 && email.includes("@");
}

export default function LoginScreen() {
  const navigation = useNavigation<LoginNavProp>();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Informe um e-mail válido");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    setLoading(true);
    setTimeout(() => {
      login(email, password);
      setLoading(false);
    }, 600);
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ flexGrow: 1, padding: 24, paddingTop: 96 }}
      keyboardShouldPersistTaps="handled"
    >
      {/* Brand header */}
      <View className="items-center mb-8">
        <SquadUpLogo width={180} height={54} />
        <Text className="mt-5 text-3xl font-bold text-secondary-900">Bem-vindo de volta</Text>
        <Text className="mt-1 text-base text-neutral-500 text-center">
          Entre com sua conta para continuar
        </Text>
      </View>

      <View className="gap-4">
        <Input
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          error={emailError}
          placeholder="seu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Input
          label="Senha"
          value={password}
          onChangeText={setPassword}
          error={passwordError}
          placeholder="Mínimo 6 caracteres"
          secureTextEntry
        />
      </View>

      <View className="mt-8">
        <Button
          label="Entrar"
          onPress={handleLogin}
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
        />
      </View>

      <View className="mt-6 flex-row justify-center">
        <Text className="text-base text-neutral-500">Não tem uma conta? </Text>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text className="text-base font-semibold text-primary-500">Criar conta</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
