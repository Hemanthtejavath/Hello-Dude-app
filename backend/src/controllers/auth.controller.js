import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { upsertStreamUser } from "../lib/stream.js";

// sign up logic code
export async function signup(req, res) {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res.status(400).json({
        message: "All fields are requires",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    //this logic for if it is not a mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const exitstUser = await User.findOne({ email });
    if (exitstUser) {
      return res.status(400).json({
        message: " User already exits, please use a different e-mail",
      });
    }

    // Generate random colorful cartoon profile pic for user
    const randomSeed = Math.floor(Math.random() * 10000);
    const randomCartoonAvatar = `https://api.dicebear.com/9.x/big-smile/svg?seed=${randomSeed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf,ff488e,a29bfe,4ecdc4`;

    const newUser = await User.create({
      email,
      name,
      password,
      profilePic: randomCartoonAvatar,
    });

    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.name,
        image: newUser.profilePic || "",
      });
      console.log("stream user created");
    } catch (error) {
      console.log("error at stream");
    }

    const token = await jwt.sign(
      { userId: newUser._id },
      process.env.JWT_S_KEY,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
// login logic  code
export async function login(req, res) {
  const { email, password } = req.body;

  try {
    // 1️ Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 2️ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    // 3️ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_S_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profilePic: user.profilePic,
        isOnboarding: user.isOnboarding,
      },
    });
  } catch (error) {
    console.log("Error in login controller", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
//logout logic code
export async function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({ success: true, message: "Logout Successfully" });
}

// onbording logic code
export async function onbording(req, res) {
  try {
    const userId = req.user._id;
    const { name, bio, nativeLanguage, learningLanguage, location } = req.body;
    // if user not  provide all of these
    if (!name || !bio || !nativeLanguage || !learningLanguage || !location) {
      return res.status(400).json({
        message: "All fields are requires",
        // array of missing fileds
        missingFiled: [
          !name && "name",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }

    const updateUserDetails = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarding: true,
      },
      { new: true },
    );

    if (!updateUserDetails) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // updating details on streak app/ account also
    try {
      await upsertStreamUser({
        id: updateUserDetails._id.toString(),
        name: updateUserDetails.name,
        img: updateUserDetails.profilePic || "",
      });
    } catch (streamError) {
      console.log("stream error", streamError);
      process.exit(1);
    }

    res.status(200).json({
      success: true,
      message: "Onboarding completed successfully",
      user: updateUserDetails,
    });
  } catch (error) {
    console.error("Error in onboarding controller:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
