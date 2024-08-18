import { Colors } from "@/constants/Colors";
import useLoadImage from "@/hooks/useLoadImage";
import CustomRegularText from "@/UI/Text/CustomRegularText";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library";

const AddImage = () => {
  const { image, pickImage, launchCamera } = useLoadImage({});
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [showAlert, setShowAlert] = useState(false);

  const saveImageToMediaLibrary = async (imageUri: string) => {
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
    <Pressable onPress={() => setShowAlert(true)} style={styles.customButton}>
      <CustomRegularText style={styles.customButtonText}>+</CustomRegularText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  customButton: {
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.black,
    marginLeft: -4,
  },
  customButtonText: {
    color: Colors.white,
    fontSize: 20,
    lineHeight: 24,
    height: 20,
  },
});

export default AddImage;
