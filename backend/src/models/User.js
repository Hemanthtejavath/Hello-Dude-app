import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    bio: {
      type: String,
      maxlength: 500,
      default: "",
    },

    profilePic: {
      type: String,
      default: "",
    },

    nativeLanguage: {
      type: String,
      trim: true,
    },

    learningLanguage: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      default: "",
    },

    isOnboarding: {
      type: Boolean,
      default: false,
    },

    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

// 🔐 PRE-SAVE HOOK (must be BEFORE model)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

// ✅ CREATE MODEL AFTER HOOK
const User = mongoose.model("User", userSchema);

export default User;
