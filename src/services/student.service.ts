import Student from "../models/student.model";
import Mark from "../models/marks.model";
import Subject from "../models/subject.model";

export const createStudentService = async (data: any) => {
  return await Student.create(data);
};

export const getAllStudentsService = async () => {
  return await Student.findAll();
};

export const getStudentByIdService = async (id: string) => {
  return await Student.findByPk(id, {
    include: [
      {
        model: Mark,
        include: [
          {
            model: Subject,
          },
        ],
      },
    ],
  });
};

export const updateStudentService = async (id: string, data: any) => {
  const student = await Student.findByPk(id);

  if (!student) {
    return null;
  }

  await student.update(data);

  return student;
};

export const deleteStudentService = async (id: string) => {
  const student = await Student.findByPk(id);

  if (!student) {
    return null;
  }

  await student.destroy();

  return true;
};
