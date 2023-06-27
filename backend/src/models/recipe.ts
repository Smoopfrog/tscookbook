import { InferSchemaType, Schema, model } from "mongoose";

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: [{ type: String }],
    portion: { type: String },
    cooktime: { type: String },
    ingredients: [{ amount: String, measurement: String, name: String }],
    directions: [{ text: String }],
  },
  { timestamps: true }
);

type Recipe = InferSchemaType<typeof recipeSchema>;

export default model<Recipe>("Recipe", recipeSchema);
