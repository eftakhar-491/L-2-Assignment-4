import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./app/config/db";

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
