export interface Recipe {
  _id: string;
  title: string;
  description?: string;
  portion?: string;
  cooktime?: string;
  category?: string;
  image: FileList | null;
  imgURL?: string;
  tags?: string[];
  ingredients?: { amount?: string; name: string }[];
  directions?: { text: string }[];
  createdAt: string;
  updatedAt: string;
}
