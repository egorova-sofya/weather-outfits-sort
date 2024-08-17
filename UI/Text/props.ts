import { ReactNode } from "react";
import { Text } from "react-native";

export interface TextProps extends React.ComponentProps<typeof Text> {
  children: ReactNode;
  style?: any;
}
