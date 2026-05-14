import { Request, Response } from "express";

import {
  createSubjectService,
  getAllSubjectsService,
  getSubjectByIdService,
  updateSubjectService,
  deleteSubjectService,
} from "../services/subject.service";

export const createSubject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const subject = await createSubjectService(req.body);

    res.status(201).json({
      success: true,
      data: subject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create subject",
      error,
    });
  }
};

export const getAllSubjects = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const subjects = await getAllSubjectsService();

    res.status(200).json({
      success: true,
      count: subjects.length,
      data: subjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch subjects",
      error,
    });
  }
};

export const getSubjectById = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const subject = await getSubjectByIdService(req.params.id);

    if (!subject) {
      res.status(404).json({
        success: false,
        message: "Subject not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: subject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch subject",
      error,
    });
  }
};

export const updateSubject = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const updatedSubject = await updateSubjectService(req.params.id, req.body);

    if (!updatedSubject) {
      res.status(404).json({
        success: false,
        message: "Subject not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: updatedSubject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update subject",
      error,
    });
  }
};

export const deleteSubject = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const deleted = await deleteSubjectService(req.params.id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "Subject not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete subject",
      error,
    });
  }
};
