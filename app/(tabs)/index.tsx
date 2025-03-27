import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import OutfitsList from "@/components/OutfitsList/OutfitsList";
import MainLayout from "@/components/Layouts/MainLayout";
import { useSQLiteContext } from "expo-sqlite";
import { IOutfit } from "@/types/types";
import Button from "@/components/Button/Button";
import { API } from "@/lib/api";

export default function HomeScreen() {
  const [outfits, setOutfits] = useState<IOutfit[]>([]);

  const db = useSQLiteContext();

  const getImagesFromAlbum = async () => {
    try {
      const albums = await MediaLibrary.getAlbumsAsync();
      const album = albums.find(
        (album) => album.title === "weather-outfits-sort"
      );

      if (album) {
        const assets = await MediaLibrary.getAssetsAsync({
          album: album.id,
        });

        try {
          const allRows: IOutfit[] = await db.getAllAsync(
            "SELECT * FROM images"
          );
          let finalArr: IOutfit[] = [];
          assets.assets.forEach((asset) => {
            finalArr = allRows.filter((row) => row.fileName === asset.filename);
          });

          setOutfits(finalArr);
        } catch (error) {
          console.error("Error getAll fn", error);
        }
        console.log("Images from album:", assets);
      } else {
        console.warn("Album not found!");
      }
    } catch (error) {
      console.error("Error getting images from album:", error);
    }
  };

  // useEffect(() => {
  //   getImagesFromAlbum();
  // }, []);

  return (
    <MainLayout>
      <View style={styles.container}>
        <OutfitsList outfits={outfits} />
      </View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
});
