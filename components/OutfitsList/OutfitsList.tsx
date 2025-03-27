import { StyleSheet, View, Image, FlatList } from "react-native";
import React, { FC } from "react";
import Spinner from "@/UI/Spinner/Spinner";
import CustomRegularText from "@/UI/Text/CustomRegularText";
import { Link } from "expo-router";
import { IOutfit } from "@/types/types";

interface Props {
  outfits?: IOutfit[];
}

const OutfitsList: FC<Props> = ({ outfits }) => {
  return (
    <View style={styles.container}>
      {!outfits ? (
        <View style={styles.notFound}>
          <Spinner />
        </View>
      ) : outfits.length === 0 ? (
        <View style={styles.notFound}>
          <CustomRegularText>Пока здесь пусто</CustomRegularText>
        </View>
      ) : (
        <FlatList
          data={outfits}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.cardContainer}>
              <Link
                style={styles.link}
                href={{
                  pathname: "/outfit-details/[id]",
                  params: { id: item.id },
                }}
              />
              <Image style={styles.card} source={{ uri: item.image }} />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{
            gap: 8,
          }}
          columnWrapperStyle={{
            gap: 8,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    flex: 1 / 2,
    position: "relative",
  },
  link: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  card: {
    minHeight: 180,
    borderRadius: 20,
    objectFit: "cover",
    aspectRatio: 1 / 1.5,
  },
});

export default OutfitsList;
