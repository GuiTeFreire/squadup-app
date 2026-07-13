import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, View } from "react-native";

import { useAuth } from "../contexts/AuthContext";
import { colors } from "../theme";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

function BootScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-secondary-900">
      <ActivityIndicator size="large" color={colors.primary[500]} />
    </View>
  );
}

export default function RootNavigator() {
  const { isAuthenticated, isBooting } = useAuth();

  if (isBooting) {
    return <BootScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
