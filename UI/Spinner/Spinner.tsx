import { Colors } from "@/constants/Colors";
import React, { FC } from "react";
import { ActivityIndicator } from "react-native";

interface Props extends React.ComponentProps<typeof ActivityIndicator> {}

const Spinner: FC<Props> = ({ ...props }) => {
  return <ActivityIndicator {...props} color={Colors.black} />;
};

export default Spinner;
