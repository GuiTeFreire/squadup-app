import "./global.css";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "./src/contexts/AuthContext";
import { MatchesProvider } from "./src/contexts/MatchesContext";
import { MatchFiltersProvider } from "./src/contexts/MatchFiltersContext";
import { MessagesProvider } from "./src/contexts/MessagesContext";
import { RatingsProvider } from "./src/contexts/RatingsContext";
import { ReportsProvider } from "./src/contexts/ReportsContext";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <MatchesProvider>
          <RatingsProvider>
            <ReportsProvider>
              <MessagesProvider>
                <MatchFiltersProvider>
                  <StatusBar style="auto" />
                  <RootNavigator />
                </MatchFiltersProvider>
              </MessagesProvider>
            </ReportsProvider>
          </RatingsProvider>
        </MatchesProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
