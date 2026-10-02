import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Home,
  ShoppingBag,
  ShoppingCart,
  Truck,
  HeartHandshake,
} from "lucide-react-native";
import { COLORS } from "../constants/theme";
import { useLanguage, toBanglaDigits } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";

import { HomeScreen } from "../screens/HomeScreen";
import { ShopScreen } from "../screens/ShopScreen";
import { CartScreen } from "../screens/CartScreen";
import { TrackScreen } from "../screens/TrackScreen";
import { ArtisanStoryScreen } from "../screens/ArtisanStoryScreen";

const Tab = createBottomTabNavigator();

export const TabNavigator: React.FC = () => {
  const { isBn, t } = useLanguage();
  const { totalCount } = useCart();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.forest,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: t("হোম", "Home"),
          tabBarIcon: ({ color, size }) => (
            <Home size={size || 22} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="ShopTab"
        component={ShopScreen}
        options={{
          tabBarLabel: t("শপ", "Shop"),
          tabBarIcon: ({ color, size }) => (
            <ShoppingBag size={size || 22} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          tabBarLabel: t("ব্যাগ", "Bag"),
          tabBarIcon: ({ color, size }) => (
            <View style={{ position: "relative" }}>
              <ShoppingCart size={size || 22} color={color} />
              {totalCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {isBn ? toBanglaDigits(totalCount) : totalCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="TrackTab"
        component={TrackScreen}
        options={{
          tabBarLabel: t("ট্র্যাকিং", "Track"),
          tabBarIcon: ({ color, size }) => (
            <Truck size={size || 22} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="StoryTab"
        component={ArtisanStoryScreen}
        options={{
          tabBarLabel: t("কারিগর", "Artisans"),
          tabBarIcon: ({ color, size }) => (
            <HeartHandshake size={size || 22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.sand,
    height: 60,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "700",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: COLORS.leaf,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: "800",
  },
});
