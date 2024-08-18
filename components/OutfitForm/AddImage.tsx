import { Colors } from "@/constants/Colors";
import useLoadImage from "@/hooks/useLoadImage";
import CustomRegularText from "@/UI/Text/CustomRegularText";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { styles } from "./outfitForm.style";

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
        onDismiss: () => setShowAlert(false),
      }
    );
  }

  return (
    <View style={styles.inputWrapper}>
      <CustomRegularText style={styles.label}>Добавь фото</CustomRegularText>

      <Pressable onPress={() => setShowAlert(true)} style={styles.addTextBtn}>
        <CustomRegularText style={styles.addImageText}>➕</CustomRegularText>
      </Pressable>
    </View>
  );
};

export default AddImage;
