import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

import { useAuth } from "../contexts/AuthContext";
import { colors } from "../theme";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { navigateFromPushNotification, navigationRef } from "./navigationRef";
import type { PushNotificationData } from "./navigationRef";

function BootScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-secondary-900">
      <ActivityIndicator size="large" color={colors.primary[500]} />
    </View>
  );
}

function isPushNotificationData(data: unknown): data is PushNotificationData {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof (data as Record<string, unknown>).type === "string" &&
    typeof (data as Record<string, unknown>).matchId === "string"
  );
}

/** Registrado uma única vez no root do app — funciona independente do usuário estar autenticado. */
function usePushNotificationNavigation() {
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data;
      if (isPushNotificationData(data)) {
        navigateFromPushNotification(data);
      }
    });
    return () => subscription.remove();
  }, []);
}

export default function RootNavigator() {
  const { isAuthenticated, isBooting } = useAuth();
  usePushNotificationNavigation();

  if (isBooting) {
    return <BootScreen />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
