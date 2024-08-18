import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import OutfitsList from "@/components/OutfitsList/OutfitsList";
import MainLayout from "@/components/Layouts/MainLayout";

export default function HomeScreen() {
  const [imagesAssets, setImagesAssets] = useState<MediaLibrary.Asset[]>([]);

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
        setImagesAssets(assets.assets);
        console.log("Images from album:", assets);
      } else {
        console.warn("Album not found!");
      }
    } catch (error) {
      console.error("Error getting images from album:", error);
    }
  };

  useEffect(() => {
    getImagesFromAlbum();
  }, []);

  return (
    <MainLayout>
      <View style={styles.container}>
        <OutfitsList outfits={imagesAssets} />
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
