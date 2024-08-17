import { Tabs } from "expo-router";
import React from "react";
import CustomRegularText from "@/UI/Text/CustomRegularText";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "neutral",
          tabBarIcon: ({ color, focused }) => (
            <CustomRegularText>🙂</CustomRegularText>
          ),
        }}
      />
      <Tabs.Screen
        name="chill"
        options={{
          title: "chill",
          tabBarIcon: ({ color, focused }) => (
            <CustomRegularText>😣</CustomRegularText>
          ),
        }}
      />
    </Tabs>
  );
}
