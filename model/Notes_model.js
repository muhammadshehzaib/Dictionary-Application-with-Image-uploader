const mongoose = require("mongoose");
const { Schema } = mongoose;

// * Creation of Notes Schema
const notesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    Completed: {
      type: Boolean,
      default: false,
    },
    Priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    categories: {
      type: [String],
    },

    dueDate: {
      type: Date,
    },
    reminder: {
      type: Date,
    },
  },

  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// * Creation of model
const Notes = mongoose.model("Notes", notesSchema);
module.exports = Notes;
