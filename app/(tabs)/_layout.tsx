import { Tabs } from "expo-router";
import React, { FC } from "react";
import CustomRegularText from "@/UI/Text/CustomRegularText";
import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import AddImage from "@/components/AddImage/AddImage";

const CustomTabBar: FC<any> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabPanel}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.name}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.button, isFocused && styles.buttonActive]}
            >
              {route.name === "freeze" && (
                <CustomRegularText style={styles.emoji}>🥶</CustomRegularText>
              )}
              {route.name === "index" && (
                <CustomRegularText style={styles.emoji}>🙂</CustomRegularText>
              )}
              {route.name === "chill" && (
                <CustomRegularText style={styles.emoji}>😣</CustomRegularText>
              )}
              {route.name === "warm" && (
                <CustomRegularText style={styles.emoji}>😎</CustomRegularText>
              )}
              {route.name === "hot" && (
                <CustomRegularText style={styles.emoji}>🥵</CustomRegularText>
              )}
            </Pressable>
          );
        })}
      </View>
      <AddImage />
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      sceneContainerStyle={{ backgroundColor: Colors.white }}
      tabBar={(props) => <CustomTabBar {...props} />}
      initialRouteName="index"
    >
      <Tabs.Screen name="freeze" />
      <Tabs.Screen name="chill" />
      <Tabs.Screen name="index" />
      <Tabs.Screen name="warm" />
      <Tabs.Screen name="hot" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  tabPanel: {
    backgroundColor: Colors.black,
    borderRadius: 30,
    flexDirection: "row",
    flexGrow: 1,
    padding: 4,
    height: "100%",
  },
  emoji: {
    fontSize: 22,
    lineHeight: 27,
  },

  button: {
    paddingVertical: 8,
    flexGrow: 1,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonActive: {
    backgroundColor: Colors.darkGray,
  },
});
