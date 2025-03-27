export type TCategory = "freeze" | "chill" | "neutral" | "warm" | "hot";

export interface IOutfit {
  id: number;
  imageUri: string;
  fileName: string;
  description: string;
  category: TCategory;
}
