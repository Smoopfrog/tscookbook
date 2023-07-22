import { InferSchemaType, Schema, model } from "mongoose";

const recipeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: [{ type: String }],
    portion: { type: String },
    cooktime: { type: String },
    imgURL: { type: String },
    ingredients: [{ amount: String, name: String }],
    directions: [{ text: String }],
  },
  { timestamps: true }
);

type Recipe = InferSchemaType<typeof recipeSchema>;

export default model<Recipe>("Recipe", recipeSchema);
