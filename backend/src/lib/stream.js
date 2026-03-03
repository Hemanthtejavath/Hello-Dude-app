import dotenv from "dotenv";
dotenv.config();
import { StreamChat } from "stream-chat";

const apiKey = process.env.STREAM_API_KEY;
const secretKey = process.env.STREAM_API__SEC_KEY;

if (!apiKey || !secretKey) {
  throw new Error("Stream API key or Secret key is missing");
}

// ✅ Create Stream client
const streamClient = StreamChat.getInstance(apiKey, secretKey);

// ✅ Create / Update user in Stream
export const upsertStreamUser = async (userData) => {
  try {
    if (!userData?.id) {
      throw new Error("Stream user id is missing");
    }

    await streamClient.upsertUser({
      id: userData.id.toString(), // ensure string
      name: userData.name,
      image: userData.image,
    });

    return true;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
    return false;
  }
};

export async function generateStreamToken(userId) {
  try {
    //ensure userId is string
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error generating Stream token:", error);
    return null; // or throw error based on your error handling strategy
  }
}

export default streamClient;
