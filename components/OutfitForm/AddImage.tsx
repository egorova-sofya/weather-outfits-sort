import useLoadImage from "@/hooks/useLoadImage";
import CustomRegularText from "@/UI/Text/CustomRegularText";
import React, { FC, useEffect, useState } from "react";
import { Alert, Image, Pressable, View } from "react-native";
import { styles } from "./outfitForm.style";
import { ImagePickerAsset } from "expo-image-picker";

interface Props {
  image?: ImagePickerAsset;
  setImage: (image: ImagePickerAsset) => void;
}

const AddImage: FC<Props> = ({ image: initialImage, setImage }) => {
  const { image, pickImage, launchCamera } = useLoadImage({
    initalValue: initialImage,
  });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    image && setImage(image);
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
      {image ? (
        <Pressable onPress={() => setShowAlert(true)}>
          <Image source={{ uri: image.uri }} style={styles.image} />
        </Pressable>
      ) : (
        <Pressable onPress={() => setShowAlert(true)} style={styles.addTextBtn}>
          <CustomRegularText style={styles.addImageText}>➕</CustomRegularText>
        </Pressable>
      )}
    </View>
  );
};

export default AddImage;
