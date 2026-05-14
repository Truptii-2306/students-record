import express from "express";

import {
  createMark,
  getAllMarks,
  getMarkById,
  updateMark,
  deleteMark,
} from "../controllers/marks.controller";

const router = express.Router();

router.post("/", createMark);

router.get("/", getAllMarks);

router.get("/:id", getMarkById);

router.put("/:id", updateMark);

router.delete("/:id", deleteMark);

export default router;
