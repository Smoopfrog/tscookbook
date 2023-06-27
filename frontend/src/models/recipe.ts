export interface Recipe {
  _id: string;
  title: string;
  description?: string;
  portion?: string;
  cooktime?: string;
  category?: string;
  ingredients?: { amount: number; measurement?: string; name: string }[];
  directions?: {direction: string}[];
  createdAt: string;
  updatedAt: string;
}
