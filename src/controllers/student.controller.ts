import { Request, Response } from "express";

import {
  createStudentService,
  getAllStudentsService,
  getStudentByIdService,
  updateStudentService,
  deleteStudentService,
} from "../services/student.service";

export const createStudent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    console.log("Received student data:", req.body);
    const student = await createStudentService(req.body);

    res.status(201).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create student",
      error,
    });
  }
};

export const getAllStudents = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const { students, totalCount } = await getAllStudentsService(page, limit);

    res.status(200).json({
      success: true,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
      error,
    });
  }
};

export const getStudentById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const student = await getStudentByIdService(req.params.id as string);

    if (!student) {
      res.status(404).json({
        success: false,
        message: "Student not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch student",
      error,
    });
  }
};

export const updateStudent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const updatedStudent = await updateStudentService(
      req.params.id as string,
      req.body,
    );

    if (!updatedStudent) {
      res.status(404).json({
        success: false,
        message: "Student not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update student",
      error,
    });
  }
};

export const deleteStudent = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const deleted = await deleteStudentService(req.params.id as string);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "Student not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete student",
      error,
    });
  }
};
