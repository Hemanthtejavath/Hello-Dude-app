import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const database = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mango db database conneted : ${database.connection.host}`);
  } catch (e) {
    console.log(`Error :${e.message}`);
    process.exit(1);
  }
};
