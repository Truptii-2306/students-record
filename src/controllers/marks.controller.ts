import { Request, Response } from "express";

import {
  createMarkService,
  getAllMarksService,
  getMarkByIdService,
  updateMarkService,
  deleteMarkService,
} from "../services/marks.service";

export const createMark = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const mark = await createMarkService(req.body);

    res.status(201).json({
      success: true,
      data: mark,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create mark",
      error,
    });
  }
};

export const getAllMarks = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const marks = await getAllMarksService();

    res.status(200).json({
      success: true,
      count: marks.length,
      data: marks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch marks",
      error,
    });
  }
};

export const getMarkById = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const mark = await getMarkByIdService(req.params.id);

    if (!mark) {
      res.status(404).json({
        success: false,
        message: "Mark not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: mark,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch mark",
      error,
    });
  }
};

export const updateMark = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const updatedMark = await updateMarkService(req.params.id, req.body);

    if (!updatedMark) {
      res.status(404).json({
        success: false,
        message: "Mark not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: updatedMark,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update mark",
      error,
    });
  }
};

export const deleteMark = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const deleted = await deleteMarkService(req.params.id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "Mark not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Mark deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete mark",
      error,
    });
  }
};
