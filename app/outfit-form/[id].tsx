import MainLayout from "@/components/Layouts/MainLayout";
import OutfitForm from "@/components/OutfitForm/OutfitForm";
import { API } from "@/lib/api";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";

const EditOutfitFormScreen = () => {
  const { id } = useLocalSearchParams();

  const [getOutfit, { data: outfit, isLoading, isError }] =
    API.useLazyGetOutfitQuery();
  const [updateOutfit, {}] = API.useUpdateOutfitMutation();

  useEffect(() => {
    id && getOutfit({ id: id as string });
  }, [id]);

  return (
    <MainLayout>
      <OutfitForm onSubmit={updateOutfit} initialValues={outfit} />
    </MainLayout>
  );
};

export default EditOutfitFormScreen;
