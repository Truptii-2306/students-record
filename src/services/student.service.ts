import Student from "../models/student.model";
import Mark from "../models/marks.model";
import Subject from "../models/subject.model";

export const createStudentService = async (data: any) => {
  return await Student.create(data);
};

export const getAllStudentsService = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;

  const { rows: students, count: totalCount } = await Student.findAndCountAll({
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });

  return {
    students,
    totalCount,
  };
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
