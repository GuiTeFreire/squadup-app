import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import Avatar from "../components/Avatar";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Header from "../components/Header";
import ReviewCard from "../components/ReviewCard";
import RatingStars from "../components/RatingStars";
import TrustBadges from "../components/TrustBadges";
import { MOCK_RATINGS } from "../mocks/ratings";
import { MOCK_USERS } from "../mocks/users";
import type { AppRootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<AppRootStackParamList>;
type Route = RouteProp<AppRootStackParamList, "PublicProfile">;

const sportLabel: Record<string, string> = {
  football: "Futebol",
  volleyball: "Vôlei",
  basketball: "Basquete",
  futsal: "Futsal",
  tennis: "Tênis",
  other: "Outro",
};

const levelLabel: Record<string, string> = {
  beginner: "Iniciante",
  intermediate: "Intermediário",
  advanced: "Avançado",
};

export default function PublicProfileScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { userId } = route.params;

  const user = useMemo(() => MOCK_USERS.find((u) => u.id === userId) ?? null, [userId]);
  const userReviews = useMemo(
    () => MOCK_RATINGS.filter((r) => r.ratedUser.id === userId),
    [userId]
  );

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-50">
        <Text className="text-neutral-500">Usuário não encontrado.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-neutral-50">
      <Header
        title={user.name}
        onBack={() => navigation.goBack()}
        rightElement={
          <Pressable
            onPress={() => navigation.navigate("ReportUser", { userId: user.id })}
            className="w-9 h-9 items-center justify-center"
            accessibilityLabel="Denunciar usuário"
            accessibilityRole="button"
          >
            <MaterialCommunityIcons name="flag-outline" size={22} color="#94A3B8" />
          </Pressable>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Profile hero */}
        <View className="bg-secondary-900 pb-6 px-4 items-center gap-3">
          <Avatar name={user.name} photoUrl={user.photoUrl} size="xl" />
          <View className="items-center gap-1">
            <View className="flex-row items-center gap-1.5">
              <Text className="text-xl font-bold text-white">{user.name}</Text>
              {user.isVerified && (
                <MaterialCommunityIcons name="check-decagram" size={18} color="#2563EB" />
              )}
            </View>
            {user.location ? (
              <View className="flex-row items-center gap-1">
                <MaterialCommunityIcons name="map-marker-outline" size={14} color="#94A3B8" />
                <Text className="text-sm text-neutral-400">{user.location}</Text>
              </View>
            ) : null}
          </View>
          <RatingStars rating={user.averageRating} size="md" showValue />
        </View>

        <View className="p-4 gap-4">
          {/* Trust badges */}
          <TrustBadges
            isVerified={user.isVerified}
            matchesPlayed={user.matchesPlayed}
            averageRating={user.averageRating}
          />

          {/* Stats row */}
          <View className="flex-row gap-3">
            <View className="flex-1 bg-white rounded-2xl p-4 items-center">
              <Text className="text-2xl font-bold text-secondary-900">{user.matchesPlayed}</Text>
              <Text className="text-xs text-neutral-500 mt-1">Partidas</Text>
            </View>
            <View className="flex-1 bg-white rounded-2xl p-4 items-center">
              <Text className="text-2xl font-bold text-secondary-900">
                {user.averageRating.toFixed(1)}
              </Text>
              <Text className="text-xs text-neutral-500 mt-1">Avaliação</Text>
            </View>
            <View className="flex-1 bg-white rounded-2xl p-4 items-center">
              <Text className="text-2xl font-bold text-secondary-900">{userReviews.length}</Text>
              <Text className="text-xs text-neutral-500 mt-1">Avaliações</Text>
            </View>
          </View>

          {/* Bio */}
          {user.bio ? (
            <View className="bg-white rounded-2xl p-4">
              <Text className="text-sm font-semibold text-secondary-900 mb-2">Sobre</Text>
              <Text className="text-sm text-neutral-600 leading-5">{user.bio}</Text>
            </View>
          ) : null}

          {/* Sports */}
          <View className="bg-white rounded-2xl p-4">
            <Text className="text-sm font-semibold text-secondary-900 mb-3">
              Esportes favoritos
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {user.favoriteSports.map((s) => (
                <Badge key={s} variant="sport" sport={s} label={sportLabel[s]} />
              ))}
            </View>
          </View>

          {/* Level */}
          <View className="bg-white rounded-2xl p-4 flex-row items-center justify-between">
            <Text className="text-sm font-semibold text-secondary-900">Nível de experiência</Text>
            <Badge variant="level" level={user.level} label={levelLabel[user.level]} />
          </View>

          {/* Reviews */}
          {userReviews.length > 0 ? (
            <View className="gap-3">
              <Text className="text-sm font-semibold text-secondary-900">
                Avaliações recebidas ({userReviews.length})
              </Text>
              {userReviews.map((r) => (
                <ReviewCard key={r.id} rating={r} />
              ))}
            </View>
          ) : (
            <View className="bg-white rounded-2xl p-4 items-center">
              <Text className="text-sm text-neutral-400">Nenhuma avaliação ainda.</Text>
            </View>
          )}

          {/* Report button */}
          <Button
            label="Denunciar usuário"
            onPress={() => navigation.navigate("ReportUser", { userId: user.id })}
            variant="ghost"
            fullWidth
          />
        </View>
      </ScrollView>
    </View>
  );
}
