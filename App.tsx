import "./global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "./src/contexts/AuthContext";
import { MatchesProvider } from "./src/contexts/MatchesContext";
import { MatchFiltersProvider } from "./src/contexts/MatchFiltersContext";
import RootNavigator from "./src/navigation/RootNavigator";
import { queryClient } from "./src/services/queryClient";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AuthProvider>
          <MatchFiltersProvider>
            <MatchesProvider>
              {/* Headers e heros são dark slate — status bar sempre clara */}
              <StatusBar style="light" />
              <RootNavigator />
            </MatchesProvider>
          </MatchFiltersProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
