import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, RADIUS } from "../constants/theme";

interface BadgeProps {
  text: string;
  variant?: "eco" | "sale" | "handmade" | "neutral" | "gold";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = "neutral",
  size = "sm",
}) => {
  const getColors = () => {
    switch (variant) {
      case "eco":
        return { bg: COLORS.leafLight, text: COLORS.leaf, border: "#CBE7D7" };
      case "sale":
        return { bg: COLORS.dangerLight, text: COLORS.danger, border: "#F9C8C8" };
      case "handmade":
        return { bg: COLORS.juteLight, text: COLORS.juteDark, border: COLORS.sand };
      case "gold":
        return { bg: "#FFF9E6", text: "#9E7B15", border: "#F6E3A2" };
      default:
        return { bg: COLORS.sandLight, text: COLORS.forestLight, border: COLORS.sand };
    }
  };

  const colors = getColors();
  const isSm = size === "sm";

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          paddingVertical: isSm ? 2 : 4,
          paddingHorizontal: isSm ? 7 : 10,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: colors.text,
            fontSize: isSm ? 10 : 12,
            fontWeight: "600",
          },
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  text: {
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
});
