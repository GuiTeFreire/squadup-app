import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

import MatchCard from "../components/MatchCard";
import EmptyState from "../components/EmptyState";
import Header from "../components/Header";
import { useMatchFiltersContext } from "../contexts/MatchFiltersContext";
import { useMatchesContext } from "../contexts/MatchesContext";
import type { AppRootStackParamList } from "../navigation/types";
import { useMatchFilters } from "../hooks/useMatchFilters";

type Nav = NativeStackNavigationProp<AppRootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const [searchText, setSearchText] = useState("");
  const { activeFilterCount } = useMatchFiltersContext();
  const { matches } = useMatchesContext();
  const filteredMatches = useMatchFilters(matches, searchText);

  return (
    <View className="flex-1 bg-neutral-50">
      <Header variant="large" title="Partidas">
        <View className="flex-row gap-2">
          <View className="flex-1 flex-row items-center bg-secondary-800 rounded-xl px-3 h-11 gap-2">
            <MaterialCommunityIcons name="magnify" size={18} color="#94A3B8" />
            <TextInput
              className="flex-1 text-white text-sm"
              placeholder="Buscar partidas..."
              placeholderTextColor="#64748B"
              value={searchText}
              onChangeText={setSearchText}
              returnKeyType="search"
              accessibilityLabel="Buscar partidas"
            />
            {searchText.length > 0 && (
              <Pressable onPress={() => setSearchText("")} accessibilityLabel="Limpar busca">
                <MaterialCommunityIcons name="close-circle" size={16} color="#64748B" />
              </Pressable>
            )}
          </View>

          {/* Filter button */}
          <Pressable
            className="h-11 w-11 items-center justify-center bg-secondary-800 rounded-xl"
            onPress={() => navigation.navigate("Filters")}
            accessibilityLabel="Abrir filtros"
            accessibilityRole="button"
          >
            <MaterialCommunityIcons
              name="tune-variant"
              size={20}
              color={activeFilterCount > 0 ? "#2563EB" : "#94A3B8"}
            />
            {activeFilterCount > 0 && (
              <View className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">{activeFilterCount}</Text>
              </View>
            )}
          </Pressable>
        </View>
      </Header>

      {/* List */}
      <FlatList
        data={filteredMatches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MatchCard
            match={item}
            onPress={() => navigation.navigate("MatchDetail", { matchId: item.id })}
          />
        )}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListEmptyComponent={
          <EmptyState
            icon="⚽"
            title="Nenhuma partida encontrada"
            description="Tente ajustar os filtros ou buscar por outro termo."
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
