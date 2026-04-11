const mongoose= require("mongoose");

const googleSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      minlength: 6,
      select: false, // 🔐 hide password by default
    },

    avatar: {
      type: String, // Google profile image
      default: "",
    },

    googleId: {
      type: String, // optional (for future use)
      default: null,
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  {
    timestamps: true, // ✅ adds createdAt & updatedAt
  }
);

const submission = mongoose.model("usergoogle", googleSchema);

module.exports= submission;