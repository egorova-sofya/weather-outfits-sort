import { Colors } from "@/constants/Colors";
import CustomRegularText from "@/UI/Text/CustomRegularText";
import React, { FC } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

interface Props {
  id?: string;
}

const OutfitDetails: FC<Props> = ({ id }) => {
  return (
    <ScrollView
      style={{ flexGrow: 1 }}
      //   stickyHeaderIndices={[0]}
    >
      <Image
        style={styles.cover}
        source={{
          uri: "https://pichold.ru/wp-content/uploads/2018/10/Ozero_Rica_9.jpg",
        }}
      />
      <View style={styles.container}>
        <View style={styles.actions}>
          <Pressable style={styles.action}>
            <CustomRegularText style={styles.actionText}>↩️</CustomRegularText>
          </Pressable>
          <Pressable style={[styles.action, { marginLeft: "auto" }]}>
            <CustomRegularText style={styles.actionText}>🗑️</CustomRegularText>
          </Pressable>
          <Pressable style={styles.action}>
            <CustomRegularText style={styles.actionText}>️✏️</CustomRegularText>
          </Pressable>
        </View>

        <CustomRegularText style={{ padding: 12 }}>
          Lorem ipsum dolor sit amet consectetur. Id luctus cursus pharetra
          dignissim accumsan aliquet. In accumsan phasellus mi pretium
          pellentesque enim sit porta blandit. Lectus ornare sed etiam sit.
          Integer metus vestibulum nisi amet tristique in.
        </CustomRegularText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 12 : 0,
    gap: 12,
    padding: 12,
  },
  action: {
    padding: 12,
    backgroundColor: Colors.white,
    borderRadius: 50,
  },
  actionText: {
    fontSize: 22,
    lineHeight: 27,
  },
  cover: {
    width: "100%",
    height: "80%",
    minHeight: 300,
    marginBottom: 16,
  },
});

export default OutfitDetails;
