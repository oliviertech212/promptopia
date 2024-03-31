import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const PromptSchema = new Schema({
  prompt: {
    type: String,
    required: [true, "prompt is required!"],
  },

  tag: {
    type: String,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
