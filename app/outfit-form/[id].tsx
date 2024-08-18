import MainLayout from "@/components/Layouts/MainLayout";
import OutfitForm from "@/components/OutfitForm/OutfitForm";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const EditOutfitFormScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <MainLayout>
      <OutfitForm id={id as string} />
    </MainLayout>
  );
};

export default EditOutfitFormScreen;
