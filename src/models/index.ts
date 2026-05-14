import sequelize from "../config/db";

import Student from "./student.model";
import Subject from "./subject.model";
import Mark from "./marks.model";

const db = {
  sequelize,
  Student,
  Subject,
  Mark,
};

export default db;
