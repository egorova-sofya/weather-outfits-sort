import OutfitDetails from "@/components/OutfitDetails/OutfitDetails";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const OutfitDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  return <OutfitDetails id={id as string} />;
};

export default OutfitDetailsScreen;
