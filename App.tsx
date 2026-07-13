import "./global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "./src/contexts/AuthContext";
import { MatchesProvider } from "./src/contexts/MatchesContext";
import { MatchFiltersProvider } from "./src/contexts/MatchFiltersContext";
import { MessagesProvider } from "./src/contexts/MessagesContext";
import { RatingsProvider } from "./src/contexts/RatingsContext";
import { ReportsProvider } from "./src/contexts/ReportsContext";
import RootNavigator from "./src/navigation/RootNavigator";
import { queryClient } from "./src/services/queryClient";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AuthProvider>
          <RatingsProvider>
            <ReportsProvider>
              <MessagesProvider>
                <MatchFiltersProvider>
                  <MatchesProvider>
                    {/* Headers e heros são dark slate — status bar sempre clara */}
                    <StatusBar style="light" />
                    <RootNavigator />
                  </MatchesProvider>
                </MatchFiltersProvider>
              </MessagesProvider>
            </ReportsProvider>
          </RatingsProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
