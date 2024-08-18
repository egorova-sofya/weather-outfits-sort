import CustomRegularText from "@/UI/Text/CustomRegularText";
import { StyleSheet, Image, Platform, View } from "react-native";

export default function ChillScreen() {
  return (
    <View>
      <CustomRegularText>freeze</CustomRegularText>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
