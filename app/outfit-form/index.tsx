import MainLayout from "@/components/Layouts/MainLayout";
import OutfitForm from "@/components/OutfitForm/OutfitForm";
import { API } from "@/lib/api";

export default function OutfitFormScreen() {
  const [createOutfit, { data, isLoading, isError }] =
    API.useCreateOutfitMutation();

  return (
    <MainLayout>
      <OutfitForm onSubmit={createOutfit} />
    </MainLayout>
  );
}
