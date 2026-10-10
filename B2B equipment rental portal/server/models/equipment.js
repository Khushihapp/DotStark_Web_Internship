import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    dailyRate: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    specifications: {
      type: Object,
    },

    availability: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Equipment = mongoose.model("Equipment", equipmentSchema);

export default Equipment;