import { Colors } from "@/constants/Colors";
import useLoadImage from "@/hooks/useLoadImage";
import CustomRegularText from "@/UI/Text/CustomRegularText";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { styles } from "./outfitForm.style";
import { IOutfit, TCategory } from "@/types";
import { useSQLiteContext } from "expo-sqlite";
import { ImagePickerAsset } from "expo-image-picker";
import * as SQLite from "expo-sqlite";

const AddImage = () => {
  const { image, pickImage, launchCamera } = useLoadImage({});
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [showAlert, setShowAlert] = useState(false);

  const db = useSQLiteContext();

  const saveImageToMediaLibrary = async (
    image: ImagePickerAsset,
    description: string,
    category: TCategory
  ) => {
    if (permissionResponse?.status !== "granted") {
      await requestPermission();
    }
    try {
      const asset = await MediaLibrary.createAssetAsync(image.uri);
      const album = await MediaLibrary.createAlbumAsync(
        "weather-outfits-sort",
        asset,
        false
      );
      console.log("Image saved to Media Library:");
    } catch (error) {
      console.error("Error saving to Media Library:", error);
      return;
    }
    try {
      await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY NOT NULL,
    imageUri TEXT NOT NULL,
    description TEXT NOT NULL,
    fileName TEXT NOT NULL,
    category TEXT NOT NULL
    )`);
      const result = await db.runAsync(
        "INSERT INTO images (imageUri, description, fileName, category) VALUES (?, ?, ?, ?)",
        [image.uri, description, image.fileName || "", category]
      );
      console.log(result.lastInsertRowId, result.changes);
    } catch (error) {
      console.error("Error saving to database:", error);
    }
  };

  // const saveImageToMediaLibrary = async (imageUri: string) => {
  //   if (permissionResponse?.status !== "granted") {
  //     await requestPermission();
  //   }
  //   try {
  //     const asset = await MediaLibrary.createAssetAsync(imageUri);
  //     const album = await MediaLibrary.createAlbumAsync(
  //       "weather-outfits-sort",
  //       asset,
  //       false
  //     );
  //     console.log("Image saved to Media Library:");
  //   } catch (error) {
  //     console.error("Error saving to Media Library:", error);
  //   }
  // };

  const getAll = async () => {
    try {
      const allRows = await db.getAllAsync("SELECT * FROM images");
      for (const row of allRows) {
        console.log(row);
      }
    } catch (error) {
      console.error("Error getAll fn", error);
    }
  };

  const getById = async (id: number) => {
    try {
      const row = await db.getFirstAsync("SELECT * FROM images WHERE id = ?", [
        id,
      ]);
      console.log(row);
    } catch (error) {
      console.error("Error getById fn", error);
    }
  };

  const updateRow = async (outfit: IOutfit) => {
    try {
      const row = await db.runAsync(
        "UPDATE images SET imageUri = ?, description = ?, category = ? WHERE id = ?",
        [outfit.imageUri, outfit.description, outfit.category, outfit.id]
      );
      console.log(row);
    } catch (error) {
      console.error("Error updateRow fn", error);
    }
  };
  const deleteRow = async (id: number) => {
    try {
      await db.runAsync("DELETE FROM images WHERE id = $id", { $id: id });

      // console.log(row);
    } catch (error) {
      console.error("Error deleteRow fn", error);
    }
  };

  useEffect(() => {
    if (image) {
      saveImageToMediaLibrary(image, "image", "chill");
    }
  }, [image]);

  if (showAlert) {
    Alert.alert(
      "Загрузка фото",
      "Выбери, как хочешь загрузить фото",
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
      <Pressable onPress={() => getAll()} style={styles.addTextBtn}>
        <CustomRegularText style={styles.addImageText}>
          get all rows
        </CustomRegularText>
      </Pressable>
      <Pressable onPress={() => getById(2)} style={styles.addTextBtn}>
        <CustomRegularText style={styles.addImageText}>
          get row by id
        </CustomRegularText>
      </Pressable>
      <Pressable
        onPress={() =>
          updateRow({
            category: "freeze",
            description: "image2",
            id: 2,
            imageUri: "testUrl2",
          })
        }
        style={styles.addTextBtn}
      >
        <CustomRegularText style={styles.addImageText}>
          edit row
        </CustomRegularText>
      </Pressable>
      <Pressable
        onPress={() => deleteRow(3)}
        // onPress={() => {
        //   db.closeSync();
        //   SQLite.deleteDatabaseSync("weather-outfits.db");
        // }}
        style={styles.addTextBtn}
      >
        <CustomRegularText style={styles.addImageText}>
          delete row
        </CustomRegularText>
      </Pressable>
    </View>
  );
};

export default AddImage;
