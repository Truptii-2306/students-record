import Subject from "../models/subject.model";

export const createSubjectService = async (data: any) => {
  return await Subject.create(data);
};

export const getAllSubjectsService = async () => {
  return await Subject.findAll();
};

export const getSubjectByIdService = async (id: string) => {
  return await Subject.findByPk(id);
};

export const updateSubjectService = async (id: string, data: any) => {
  const subject = await Subject.findByPk(id);

  if (!subject) {
    return null;
  }

  await subject.update(data);

  return subject;
};

export const deleteSubjectService = async (id: string) => {
  const subject = await Subject.findByPk(id);

  if (!subject) {
    return null;
  }

  await subject.destroy();

  return true;
};
