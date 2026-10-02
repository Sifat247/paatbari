import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { LanguageProvider } from "./src/context/LanguageContext";
import { CartProvider } from "./src/context/CartContext";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { COLORS } from "./src/constants/theme";

export default function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <CartProvider>
          <NavigationContainer>
            <StatusBar style="dark" />
            <RootNavigator />
          </NavigationContainer>
        </CartProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
