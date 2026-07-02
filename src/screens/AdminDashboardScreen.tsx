import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useMemo } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

import Avatar from "../components/Avatar";
import EmptyState from "../components/EmptyState";
import Header from "../components/Header";
import { useReportsContext } from "../contexts/ReportsContext";
import type { AppRootStackParamList } from "../navigation/types";
import type { Report } from "../types";
import { REASON_LABELS, STATUS_COLORS, STATUS_LABELS } from "../utils/reportLabels";

type Nav = NativeStackNavigationProp<AppRootStackParamList>;

function formatReportDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("pt-BR");
}

export default function AdminDashboardScreen() {
  const navigation = useNavigation<Nav>();
  const { reports } = useReportsContext();

  const sortedReports = useMemo(
    () =>
      [...reports].sort((a, b) => {
        if (a.status === "pending" && b.status !== "pending") return -1;
        if (a.status !== "pending" && b.status === "pending") return 1;
        return b.createdAt.localeCompare(a.createdAt);
      }),
    [reports]
  );
  const pendingCount = reports.filter((r) => r.status === "pending").length;

  function renderItem({ item }: { item: Report }) {
    return (
      <Pressable
        onPress={() => navigation.navigate("ReportDetail", { reportId: item.id })}
        accessibilityRole="button"
        accessibilityLabel={`Denúncia contra ${item.reportedUser.name}`}
        className="bg-white rounded-2xl p-4 mb-3 flex-row items-center gap-3"
      >
        <Avatar name={item.reportedUser.name} photoUrl={item.reportedUser.photoUrl} size="md" />
        <View className="flex-1">
          <Text className="text-sm font-bold text-secondary-900" numberOfLines={1}>
            {item.reportedUser.name}
          </Text>
          <Text className="text-xs text-neutral-500 mt-0.5" numberOfLines={1}>
            {REASON_LABELS[item.reason]} · {formatReportDate(item.createdAt)}
          </Text>
        </View>
        <View className={`self-start rounded-full px-3 py-1 ${STATUS_COLORS[item.status]}`}>
          <Text className="text-xs font-medium">{STATUS_LABELS[item.status]}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View className="flex-1 bg-neutral-50">
      <Header title="Painel administrativo" onBack={() => navigation.goBack()} />

      <Text className="text-sm text-neutral-500 px-4 pt-4 pb-2">
        {pendingCount === 0
          ? "Nenhuma denúncia pendente"
          : `${pendingCount} denúncia${pendingCount > 1 ? "s" : ""} pendente${pendingCount > 1 ? "s" : ""}`}
      </Text>

      <FlatList
        data={sortedReports}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingTop: 4, flexGrow: 1 }}
        ListEmptyComponent={
          <EmptyState icon="🛡️" title="Sem denúncias" description="Nada para moderar por aqui." />
        }
      />
    </View>
  );
}
