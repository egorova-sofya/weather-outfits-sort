import { Image, StyleSheet, View, Pressable, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";
import useLoadImage from "@/hooks/useLoadImage";
import CustomSemiBoldText from "@/UI/Text/CustomSemiBoldText";
import * as MediaLibrary from "expo-media-library";

export default function HomeScreen() {
  const { image, pickImage, launchCamera } = useLoadImage({});
  const [showAlert, setShowAlert] = useState(false);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [imagesAssets, setImagesAssets] = useState<MediaLibrary.Asset[]>([]);

  // const getImages = async () => {
  //   const { assets } = await MediaLibrary.getAssetsAsync();
  //   setImagesAssets(assets);
  // };

  console.log("imagesAssets", imagesAssets);

  const getImagesFromAlbum = async () => {
    try {
      const albums = await MediaLibrary.getAlbumsAsync();
      const album = albums.find(
        (album) => album.title === "weather-outfits-sort"
      );

      if (album) {
        const assets = await MediaLibrary.getAssetsAsync({
          album: album.id, // Get only assets in the album
        });
        setImagesAssets(assets.assets);
        console.log("Images from album:", assets); // Debugging output
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

  const saveImageToMediaLibrary = async (imageUri) => {
    if (permissionResponse?.status !== "granted") {
      await requestPermission();
    }
    try {
      const asset = await MediaLibrary.createAssetAsync(imageUri);
      const album = await MediaLibrary.createAlbumAsync(
        "weather-outfits-sort",
        asset,
        false
      );
      console.log("Image saved to Media Library:");
    } catch (error) {
      console.error("Error saving to Media Library:", error);
    }
  };

  useEffect(() => {
    if (image) {
      saveImageToMediaLibrary(image);
    }
  }, [image]);

  if (showAlert) {
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Выбрать из галереи",
          onPress: () => {
            setShowAlert(false);
            pickImage();
          },
        },
        {
          text: "Сфотографировать",
          onPress: () => {
            setShowAlert(false);
            launchCamera();
          },
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setShowAlert(true)}>
        <CustomSemiBoldText>Pick Image</CustomSemiBoldText>
      </Pressable>
      {imagesAssets.length > 0 &&
        imagesAssets.map((image) => (
          <Image
            style={styles.image}
            source={{ uri: image.uri }}
            key={image.id}
          />
        ))}
    </View>
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
