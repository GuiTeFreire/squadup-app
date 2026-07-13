import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback } from "react";
import { FlatList, KeyboardAvoidingView, Platform, Text, View } from "react-native";

import ChatInput from "../components/ChatInput";
import Header from "../components/Header";
import MessageBubble from "../components/MessageBubble";
import { useMessagesContext } from "../contexts/MessagesContext";
import { useMatchDetail } from "../hooks/useMatchDetail";
import { CURRENT_USER } from "../mocks/users";
import type { AppRootStackParamList } from "../navigation/types";
import type { Message } from "../types";

type Nav = NativeStackNavigationProp<AppRootStackParamList>;
type Route = RouteProp<AppRootStackParamList, "MatchChat">;

export default function MatchChatScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { matchId } = route.params;

  const { match } = useMatchDetail(matchId);
  const { getMessages, sendMessage } = useMessagesContext();

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
      className="flex-1 bg-secondary-50"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <Header
        title={match ? match.title : "Chat da partida"}
        subtitle={
          match
            ? `${match.participants.filter((p) => p.status === "confirmed").length} participantes`
            : ""
        }
        onBack={() => navigation.goBack()}
      />

      {/* Messages list */}
      <FlatList
        data={messages}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        inverted
        contentContainerStyle={{ paddingVertical: 12 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View
            className="flex-1 items-center justify-center py-16"
            style={{ transform: [{ scaleY: -1 }] }}
          >
            <Text className="text-neutral-500 text-sm font-medium">Nenhuma mensagem ainda.</Text>
            <Text className="text-neutral-500 text-sm mt-0.5">Seja o primeiro a escrever!</Text>
          </View>
        }
      />

      {/* Input */}
      <ChatInput onSend={handleSend} />
    </KeyboardAvoidingView>
  );
}
