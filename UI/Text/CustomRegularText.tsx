import React, { FC } from "react";
import { StyleSheet, Text } from "react-native";
import { TextProps } from "./props";
import { Colors } from "@/constants/Colors";

const CustomRegularText: FC<TextProps> = ({ children, style, ...props }) => {
  return (
    <Text {...props} style={[styles.text, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins",
    fontSize: 14,
    lineHeight: 18,
    color: Colors.black,
  },
});

export default CustomRegularText;
