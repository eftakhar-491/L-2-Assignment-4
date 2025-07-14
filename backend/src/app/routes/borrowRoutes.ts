import express, { RequestHandler } from "express";
import {
  createBorrow,
  getAllBorrows,
  getBorrowDetails,
} from "../controllers/borrowControllers";

const borrowRouter = express.Router();

borrowRouter.post("/", createBorrow as RequestHandler);

borrowRouter.get("/", getAllBorrows as RequestHandler);

borrowRouter.get("/:borrowId", getBorrowDetails as RequestHandler);

export default borrowRouter;
