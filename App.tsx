import "./global.css";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "./src/contexts/AuthContext";
import { MatchFiltersProvider } from "./src/contexts/MatchFiltersContext";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <MatchFiltersProvider>
          <StatusBar style="auto" />
          <RootNavigator />
        </MatchFiltersProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
