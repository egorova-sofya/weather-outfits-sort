import CustomRegularText from "@/UI/Text/CustomRegularText";
import CustomSemiBoldText from "@/UI/Text/CustomSemiBoldText";
import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <CustomSemiBoldText>This screen doesn't exist.</CustomSemiBoldText>
      <Link href="/" style={styles.link}>
        <CustomRegularText>Go to home screen!</CustomRegularText>
      </Link>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
