import React, { FC } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

interface Props {
  children: React.ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>{children}</View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingBottom: 0,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 12 : 0,
  },
  content: {
    flex: 1,
  },
});

export default MainLayout;
