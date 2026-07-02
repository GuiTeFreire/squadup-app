import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { memo, useState } from "react";
import { Pressable, TextInput, View } from "react-native";

interface ChatInputProps {
  onSend: (text: string) => void;
}

function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState("");

  const canSend = text.trim().length > 0;

  function handleSend() {
    if (!canSend) return;
    onSend(text);
    setText("");
  }

  return (
    <View className="flex-row items-end bg-white border-t border-neutral-100 px-4 py-3 gap-2">
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Mensagem..."
        placeholderTextColor="#9CA3AF"
        multiline
        maxLength={500}
        onSubmitEditing={handleSend}
        className="flex-1 bg-neutral-100 rounded-2xl px-4 py-2.5 text-sm text-secondary-900 max-h-28"
        style={{ minHeight: 40 }}
        accessibilityLabel="Campo de mensagem"
      />
      <Pressable
        onPress={handleSend}
        disabled={!canSend}
        accessibilityLabel="Enviar mensagem"
        accessibilityRole="button"
        className={`w-10 h-10 rounded-full items-center justify-center ${
          canSend ? "bg-primary-500" : "bg-neutral-200"
        }`}
      >
        <MaterialCommunityIcons name="send" size={18} color={canSend ? "#ffffff" : "#94A3B8"} />
      </Pressable>
    </View>
  );
}

export default memo(ChatInput);
