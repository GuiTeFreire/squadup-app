import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback } from "react";
import { FlatList, KeyboardAvoidingView, Platform, Pressable, Text, View } from "react-native";

import ChatInput from "../components/ChatInput";
import MessageBubble from "../components/MessageBubble";
import { useMatchesContext } from "../contexts/MatchesContext";
import { useMessagesContext } from "../contexts/MessagesContext";
import { CURRENT_USER } from "../mocks/users";
import type { AppRootStackParamList } from "../navigation/types";
import type { Message } from "../types";

type Nav = NativeStackNavigationProp<AppRootStackParamList>;
type Route = RouteProp<AppRootStackParamList, "MatchChat">;

export default function MatchChatScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { matchId } = route.params;

  const { matches } = useMatchesContext();
  const { getMessages, sendMessage } = useMessagesContext();

  const match = matches.find((m) => m.id === matchId);
  const messages = getMessages(matchId);

  const handleSend = useCallback(
    (text: string) => {
      sendMessage(matchId, text);
    },
    [matchId, sendMessage]
  );

  const renderItem = useCallback(
    ({ item }: { item: Message }) => (
      <MessageBubble message={item} isOwn={item.senderId === CURRENT_USER.id} />
    ),
    []
  );

  const keyExtractor = useCallback((item: Message) => item.id, []);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-neutral-50"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View className="bg-secondary-900 pt-14 pb-4 px-4 flex-row items-center">
        <Pressable
          onPress={() => navigation.goBack()}
          className="w-9 h-9 items-center justify-center"
          accessibilityLabel="Voltar"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </Pressable>
        <View className="flex-1 mx-2">
          <Text className="text-white text-base font-bold" numberOfLines={1}>
            {match ? match.title : "Chat da partida"}
          </Text>
          <Text className="text-secondary-400 text-xs" numberOfLines={1}>
            {match
              ? `${match.participants.filter((p) => p.status === "confirmed").length} participantes`
              : ""}
          </Text>
        </View>
        <View className="w-9" />
      </View>

      {/* Messages list */}
      <FlatList
        data={messages}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        inverted
        contentContainerStyle={{ paddingVertical: 12 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-16">
            <Text className="text-neutral-400 text-sm">Nenhuma mensagem ainda.</Text>
            <Text className="text-neutral-400 text-sm">Seja o primeiro a escrever!</Text>
          </View>
        }
      />

      {/* Input */}
      <ChatInput onSend={handleSend} />
    </KeyboardAvoidingView>
  );
}
