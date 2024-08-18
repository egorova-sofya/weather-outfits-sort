import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.yellow,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 50,
  },
  text: {
    color: Colors.black,
  },
  disabled: {
    opacity: 0.8,
  },
});

export default styles;
