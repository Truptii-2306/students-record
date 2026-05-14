import Mark from "../models/marks.model";
import Student from "../models/student.model";
import Subject from "../models/subject.model";

export const createMarkService = async (data: any) => {
  return await Mark.create(data);
};

export const getAllMarksService = async () => {
  return await Mark.findAll({
    include: [
      {
        model: Student,
      },
      {
        model: Subject,
      },
    ],
  });
};

export const getMarkByIdService = async (id: string) => {
  return await Mark.findByPk(id, {
    include: [
      {
        model: Student,
      },
      {
        model: Subject,
      },
    ],
  });
};

export const updateMarkService = async (id: string, data: any) => {
  const mark = await Mark.findByPk(id);

  if (!mark) {
    return null;
  }

  await mark.update(data);

  return mark;
};

export const deleteMarkService = async (id: string) => {
  const mark = await Mark.findByPk(id);

  if (!mark) {
    return null;
  }

  await mark.destroy();

  return true;
};
