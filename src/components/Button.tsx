import React, { memo } from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

const containerBase = "flex-row items-center justify-center rounded-xl";

const containerVariant: Record<Variant, string> = {
  primary: "bg-primary-500 active:bg-primary-600",
  secondary: "bg-secondary-800 active:bg-secondary-700",
  ghost: "bg-transparent border border-neutral-300 active:bg-neutral-100",
  outline: "bg-transparent border border-white active:bg-secondary-800",
};

const containerDisabled: Record<Variant, string> = {
  primary: "bg-primary-300",
  secondary: "bg-secondary-400",
  ghost: "border-neutral-200",
  outline: "border-secondary-600",
};

const containerSize: Record<Size, string> = {
  sm: "px-3 py-2",
  md: "px-5 py-3",
  lg: "px-6 py-4",
};

const textVariant: Record<Variant, string> = {
  primary: "text-white font-semibold",
  secondary: "text-white font-semibold",
  ghost: "text-secondary-700 font-semibold",
  outline: "text-white font-semibold",
};

const textDisabled: Record<Variant, string> = {
  primary: "text-white",
  secondary: "text-white",
  ghost: "text-neutral-400",
  outline: "text-secondary-500",
};

const textSize: Record<Size, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const spinnerColor: Record<Variant, string> = {
  primary: "#ffffff",
  secondary: "#ffffff",
  ghost: "#334155",
  outline: "#ffffff",
};

function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const containerClass = [
    containerBase,
    isDisabled ? containerDisabled[variant] : containerVariant[variant],
    containerSize[size],
    fullWidth ? "w-full" : "self-start",
  ].join(" ");

  const textClass = [
    isDisabled ? textDisabled[variant] : textVariant[variant],
    textSize[size],
  ].join(" ");

  return (
    <Pressable
      className={containerClass}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled }}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={spinnerColor[variant]}
          accessibilityLabel="Carregando"
        />
      ) : (
        <Text className={textClass}>{label}</Text>
      )}
    </Pressable>
  );
}

export default memo(Button);
