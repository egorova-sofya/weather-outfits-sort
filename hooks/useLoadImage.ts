import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  useCameraPermissions,
  PermissionStatus,
  launchCameraAsync,
  ImagePickerResult,
  ImagePickerAsset,
} from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";

interface Props {
  aspect?: [number, number];
  quality?: number;
  initalValue?: ImagePickerAsset;
}

const useLoadImage = ({ aspect = [1, 2], quality = 1, initalValue }: Props) => {
  const [image, setImage] = useState<null | ImagePickerAsset>(
    initalValue || null
  );
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermission() {
    if (
      cameraPermissionInformation?.status === PermissionStatus.DENIED ||
      cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    return true;
  }

  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: aspect,
      quality: quality,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const launchCamera = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app."
      );
      return;
    }

    let result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 0.5,
    });

    if (!result.canceled) {
      // setModalVisible(false);

      setImage(result.assets[0]);
    }
  };

  return {
    image,
    pickImage,
    launchCamera,
  };
};

export default useLoadImage;
