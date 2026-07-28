import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useCallback } from "react";

import { registerPushToken } from "../services/api/users";

// Sem isso, notificações recebidas com o app em primeiro plano não exibem banner (iOS).
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export interface UseNotificationRegistrationResult {
  registerForPushNotifications: () => Promise<void>;
}

export function useNotificationRegistration(): UseNotificationRegistrationResult {
  const registerForPushNotifications = useCallback(async () => {
    try {
      if (!Device.isDevice) return;

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let status = existingStatus;
      if (status !== "granted") {
        ({ status } = await Notifications.requestPermissionsAsync());
      }
      if (status !== "granted") return;

      const projectId = Constants.expoConfig?.extra?.eas?.projectId;
      if (!projectId) return;

      const { data: token } = await Notifications.getExpoPushTokenAsync({ projectId });
      await registerPushToken(token);
    } catch {
      // Nunca bloqueia login/boot por falha de push (D-Push-3) — silencioso de propósito.
    }
  }, []);

  return { registerForPushNotifications };
}
