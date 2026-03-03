import express from "express";
import path from "path";
import "dotenv/config";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.auth.js";
import cookieparser from "cookie-parser";
import { connectDb } from "./lib/db.js";
import chatRoutes from "./routes/chat.route.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json()); // middlw where for json formate data from the user
app.use(cookieparser()); // cookie parser nothing but , when user onbording the page before it it verigy with  bearer toke( cookie)
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // allow cookies to be sent in cross-origin requests
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// static file serve in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frentend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frentend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is Running at ${PORT}`);
  connectDb();
});
