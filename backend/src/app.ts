import express, { Response } from "express";
import cors from "cors";
import bookRouter from "./app/routes/bookRoutes";
import borrowRouter from "./app/routes/borrowRoutes";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["https://library-seven-psi.vercel.app", "http://localhost:5173"],
  })
);
app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowRouter);

app.get("/", (_, res: Response) => {
  res.send("API Is Running...");
});

export default app;
