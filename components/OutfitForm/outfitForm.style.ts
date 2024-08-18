import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeText: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: "right",
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 24,
    marginTop: 12,
  },
  inputsWrapper: {
    flex: 1,
    gap: 24,
    marginBottom: 100,
  },
  label: {
    marginBottom: 4,
  },
  addTextBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.gray,
    borderRadius: 20,
    width: "45%",
    aspectRatio: 1 / 1.5,
  },
  addImageText: {
    fontSize: 40,
    lineHeight: 48,
  },
  categories: {
    flexDirection: "row",
  },
  category: {
    flexGrow: 1,
    borderRadius: 30,
    alignItems: "center",
    paddingVertical: 10,
  },
  categoryText: {
    fontSize: 22,
    lineHeight: 27,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    minHeight: 180,
    backgroundColor: Colors.gray,
    borderRadius: 20,
    padding: 12,
    fontSize: 14,
    textAlignVertical: "top",
  },
  saveBtn: {
    marginTop: 24,
    maxWidth: 154,
    alignSelf: "center",
  },
});
