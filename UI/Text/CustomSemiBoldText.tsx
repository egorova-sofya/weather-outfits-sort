import { Colors } from "@/constants/Colors";
import React, { FC } from "react";
import { StyleSheet, Text, TextProps } from "react-native";

const CustomSemiBoldText: FC<TextProps> = ({ children, style, ...props }) => {
  return (
    <Text {...props} style={[styles.text, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "PoppinsSemiBold",
    color: Colors.black,
    fontSize: 14,
    lineHeight: 18,
  },
});

export default CustomSemiBoldText;
