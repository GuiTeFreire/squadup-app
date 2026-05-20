import React, { memo, useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends Omit<TextInputProps, "className"> {
  label?: string;
  error?: string;
}

function Input({ label, error, ...rest }: InputProps) {
  const [focused, setFocused] = useState(false);

  const borderClass = error
    ? "border-error"
    : focused
      ? "border-primary-500"
      : "border-neutral-300";

  return (
    <View className="w-full">
      {label ? <Text className="mb-1 text-sm font-medium text-neutral-700">{label}</Text> : null}

      <TextInput
        className={`w-full rounded-lg border bg-white px-4 py-3 text-base text-neutral-900 ${borderClass}`}
        placeholderTextColor="#9ca3af"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        accessibilityLabel={label}
        {...rest}
      />

      {error ? <Text className="mt-1 text-sm text-error">{error}</Text> : null}
    </View>
  );
}

export default memo(Input);
