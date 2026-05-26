import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

import EmptyState from "../components/EmptyState";
import MatchCard from "../components/MatchCard";
import { useMatchFiltersContext } from "../contexts/MatchFiltersContext";
import { useMatchesContext } from "../contexts/MatchesContext";
import { useMatchFilters } from "../hooks/useMatchFilters";
import type { AppRootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<AppRootStackParamList>;

export default function SearchScreen() {
  const navigation = useNavigation<Nav>();
  const [searchText, setSearchText] = useState("");
  const { activeFilterCount } = useMatchFiltersContext();
  const { matches } = useMatchesContext();
  const filteredMatches = useMatchFilters(matches, searchText);
  const inputRef = useRef<TextInput>(null);

  return (
    <View className="flex-1 bg-neutral-50">
      {/* Header */}
      <View className="bg-secondary-900 pt-14 pb-4 px-4">
        <Text className="text-white text-2xl font-bold mb-4">Busca</Text>

        <View className="flex-row gap-2">
          <View className="flex-1 flex-row items-center bg-secondary-800 rounded-xl px-3 h-11 gap-2">
            <MaterialCommunityIcons name="magnify" size={18} color="#94A3B8" />
            <TextInput
              ref={inputRef}
              className="flex-1 text-white text-sm"
              placeholder="Esporte, local, organizador..."
              placeholderTextColor="#64748B"
              value={searchText}
              onChangeText={setSearchText}
              returnKeyType="search"
              autoFocus
              accessibilityLabel="Campo de busca"
            />
            {searchText.length > 0 && (
              <Pressable onPress={() => setSearchText("")} accessibilityLabel="Limpar busca">
                <MaterialCommunityIcons name="close-circle" size={16} color="#64748B" />
              </Pressable>
            )}
          </View>

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
      </View>

      {/* Results count */}
      {searchText.length > 0 && (
        <View className="px-4 py-2 bg-white border-b border-neutral-100">
          <Text className="text-sm text-neutral-500">
            {filteredMatches.length} resultado{filteredMatches.length === 1 ? "" : "s"}
          </Text>
        </View>
      )}

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
          searchText.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="Digite para buscar"
              description="Encontre partidas por esporte, local ou nome do organizador."
            />
          ) : (
            <EmptyState
              icon="😕"
              title="Nenhum resultado"
              description={`Não encontramos partidas para "${searchText}".`}
            />
          )
        }
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}
