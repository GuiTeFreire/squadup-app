import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../contexts/AuthContext";
import type { AuthStackParamList } from "../navigation/types";

type RegisterNavProp = NativeStackNavigationProp<AuthStackParamList, "Register">;

function validateEmail(email: string) {
  return email.length > 0 && email.includes("@");
}

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterNavProp>();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    let valid = true;

    if (name.trim().length < 2) {
      setNameError("Informe seu nome completo");
      valid = false;
    } else {
      setNameError("");
    }

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

    if (birthDate.trim().length === 0) {
      setBirthDateError("Informe sua data de nascimento");
      valid = false;
    } else {
      setBirthDateError("");
    }

    if (!valid) return;

    setLoading(true);
    setTimeout(() => {
      register(name.trim(), email, password);
      setLoading(false);
      navigation.navigate("ProfileSetup");
    }, 600);
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ flexGrow: 1, padding: 24 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="mb-8">
        <Text className="text-3xl font-bold text-neutral-900">Crie sua conta</Text>
        <Text className="mt-2 text-base text-neutral-500">
          Junte-se ao SquadUp e encontre sua próxima partida
        </Text>
      </View>

      <View className="gap-4">
        <Input
          label="Nome completo"
          value={name}
          onChangeText={setName}
          error={nameError}
          placeholder="Seu nome"
          autoCapitalize="words"
        />

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

        <Input
          label="Data de nascimento"
          value={birthDate}
          onChangeText={setBirthDate}
          error={birthDateError}
          placeholder="DD/MM/AAAA"
          keyboardType="numeric"
          maxLength={10}
        />
      </View>

      <View className="mt-8">
        <Button
          label="Criar conta"
          onPress={handleRegister}
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
        />
      </View>
    </ScrollView>
  );
}
