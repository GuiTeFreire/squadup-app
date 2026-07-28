import * as Location from "expo-location";
import { useCallback, useState } from "react";

export interface DeviceLocation {
  latitude: number;
  longitude: number;
}

export interface UseDeviceLocationResult {
  location: DeviceLocation | null;
  permissionDenied: boolean;
  isLoading: boolean;
  requestLocation: () => Promise<void>;
}

export function useDeviceLocation(): UseDeviceLocationResult {
  const [location, setLocation] = useState<DeviceLocation | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const requestLocation = useCallback(async () => {
    setIsLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setPermissionDenied(true);
        setLocation(null);
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setPermissionDenied(false);
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch {
      setLocation(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { location, permissionDenied, isLoading, requestLocation };
}
