import React, { FC, forwardRef } from "react";
import styles from "./button.style";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import CustomSemiBoldText from "@/UI/Text/CustomSemiBoldText";

interface Props extends React.ComponentProps<typeof Pressable> {
  children: string;
  style?: StyleProp<ViewStyle>;
}

const Button: FC<Props> = forwardRef(({ children, ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      {...props}
      style={[styles.button, props.disabled && styles.disabled, props.style]}
    >
      <CustomSemiBoldText style={styles.text}>{children}</CustomSemiBoldText>
    </Pressable>
  );
});

export default Button;
