export interface Recipe {
  _id: string;
  title: string;
  description?: string;
  portion?: string;
  cooktime?: string;
  category?: string;
  imgURL?: string;
  ingredients?: { amount?: string; name: string }[];
  directions?: { text: string }[];
  createdAt: string;
  updatedAt: string;
}
