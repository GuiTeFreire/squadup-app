import React, { memo, useState } from "react";
import { Image, Text, View } from "react-native";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  name: string;
  photoUrl?: string;
  size?: AvatarSize;
}

const sizeClass: Record<AvatarSize, string> = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-20 h-20",
};

const textSizeClass: Record<AvatarSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
  xl: "text-2xl",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function Avatar({ name, photoUrl, size = "md" }: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const showFallback = !photoUrl || imgError;
  const container = `${sizeClass[size]} rounded-full overflow-hidden items-center justify-center bg-primary-100`;

  return (
    <View className={container}>
      {showFallback ? (
        <Text className={`${textSizeClass[size]} font-semibold text-primary-700`}>
          {getInitials(name)}
        </Text>
      ) : (
        <Image
          source={{ uri: photoUrl }}
          className="w-full h-full"
          onError={() => setImgError(true)}
          accessibilityLabel={`Foto de ${name}`}
        />
      )}
    </View>
  );
}

export default memo(Avatar);
