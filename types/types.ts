export type TCategory = "freeze" | "chill" | "neutral" | "warm" | "hot";

export interface IOutfit {
  id?: number;
  image: string;
  description: string;
  category: TCategory;
}
