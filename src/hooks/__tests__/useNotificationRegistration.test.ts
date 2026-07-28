import { act, renderHook } from "@testing-library/react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

import { registerPushToken } from "../../services/api/users";
import { useNotificationRegistration } from "../useNotificationRegistration";

let mockIsDevice = true;

jest.mock("expo-device", () => ({
  get isDevice() {
    return mockIsDevice;
  },
}));

jest.mock("expo-constants", () => ({
  expoConfig: { extra: { eas: { projectId: "test-project-id" } } },
}));

jest.mock("expo-notifications", () => ({
  setNotificationHandler: jest.fn(),
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  getExpoPushTokenAsync: jest.fn(),
}));

jest.mock("../../services/api/users", () => ({
  registerPushToken: jest.fn(),
}));

describe("useNotificationRegistration", () => {
  afterEach(() => {
    jest.clearAllMocks();
    mockIsDevice = true;
  });

  it("registra o token quando a permissão já está concedida", async () => {
    (Notifications.getPermissionsAsync as jest.Mock).mockResolvedValue({ status: "granted" });
    (Notifications.getExpoPushTokenAsync as jest.Mock).mockResolvedValue({
      data: "ExponentPushToken[abc]",
    });

    const { result } = renderHook(() => useNotificationRegistration());
    await act(async () => {
      await result.current.registerForPushNotifications();
    });

    expect(Notifications.requestPermissionsAsync).not.toHaveBeenCalled();
    expect(Notifications.getExpoPushTokenAsync).toHaveBeenCalledWith({
      projectId: "test-project-id",
    });
    expect(registerPushToken).toHaveBeenCalledWith("ExponentPushToken[abc]");
  });

  it("pede permissão quando ainda não concedida e registra se o usuário aceitar", async () => {
    (Notifications.getPermissionsAsync as jest.Mock).mockResolvedValue({ status: "undetermined" });
    (Notifications.requestPermissionsAsync as jest.Mock).mockResolvedValue({ status: "granted" });
    (Notifications.getExpoPushTokenAsync as jest.Mock).mockResolvedValue({
      data: "ExponentPushToken[abc]",
    });

    const { result } = renderHook(() => useNotificationRegistration());
    await act(async () => {
      await result.current.registerForPushNotifications();
    });

    expect(Notifications.requestPermissionsAsync).toHaveBeenCalledTimes(1);
    expect(registerPushToken).toHaveBeenCalledWith("ExponentPushToken[abc]");
  });

  it("não registra token quando a permissão é negada", async () => {
    (Notifications.getPermissionsAsync as jest.Mock).mockResolvedValue({ status: "denied" });
    (Notifications.requestPermissionsAsync as jest.Mock).mockResolvedValue({ status: "denied" });

    const { result } = renderHook(() => useNotificationRegistration());
    await act(async () => {
      await result.current.registerForPushNotifications();
    });

    expect(Notifications.getExpoPushTokenAsync).not.toHaveBeenCalled();
    expect(registerPushToken).not.toHaveBeenCalled();
  });

  it("não faz nada em simulador/emulador (Device.isDevice false)", async () => {
    mockIsDevice = false;

    const { result } = renderHook(() => useNotificationRegistration());
    await act(async () => {
      await result.current.registerForPushNotifications();
    });

    expect(Notifications.getPermissionsAsync).not.toHaveBeenCalled();
    expect(registerPushToken).not.toHaveBeenCalled();
  });

  it("não registra quando não há projectId configurado", async () => {
    (Constants as { expoConfig: unknown }).expoConfig = { extra: {} };
    (Notifications.getPermissionsAsync as jest.Mock).mockResolvedValue({ status: "granted" });

    const { result } = renderHook(() => useNotificationRegistration());
    await act(async () => {
      await result.current.registerForPushNotifications();
    });

    expect(Notifications.getExpoPushTokenAsync).not.toHaveBeenCalled();
    expect(registerPushToken).not.toHaveBeenCalled();

    (Constants as { expoConfig: unknown }).expoConfig = {
      extra: { eas: { projectId: "test-project-id" } },
    };
  });

  it("nunca lança erro — resolve mesmo se getExpoPushTokenAsync falhar", async () => {
    (Notifications.getPermissionsAsync as jest.Mock).mockResolvedValue({ status: "granted" });
    (Notifications.getExpoPushTokenAsync as jest.Mock).mockRejectedValue(new Error("boom"));

    const { result } = renderHook(() => useNotificationRegistration());

    await act(async () => {
      await expect(result.current.registerForPushNotifications()).resolves.toBeUndefined();
    });

    expect(registerPushToken).not.toHaveBeenCalled();
  });

  it("nunca lança erro — resolve mesmo se registerPushToken falhar (rede fora do ar)", async () => {
    (Notifications.getPermissionsAsync as jest.Mock).mockResolvedValue({ status: "granted" });
    (Notifications.getExpoPushTokenAsync as jest.Mock).mockResolvedValue({
      data: "ExponentPushToken[abc]",
    });
    (registerPushToken as jest.Mock).mockRejectedValue(new Error("network down"));

    const { result } = renderHook(() => useNotificationRegistration());

    await act(async () => {
      await expect(result.current.registerForPushNotifications()).resolves.toBeUndefined();
    });
  });
});
