import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import Student from "./student.model";
import Subject from "./subject.model";

interface MarkAttributes {
  mark_id: number;
  student_id: number;
  subject_id: number;
  marks_obtained: number;
  exam_date?: Date;
}

interface MarkCreationAttributes extends Optional<MarkAttributes, "mark_id"> {}

class Mark
  extends Model<MarkAttributes, MarkCreationAttributes>
  implements MarkAttributes
{
  public mark_id!: number;
  public student_id!: number;
  public subject_id!: number;
  public marks_obtained!: number;
  public exam_date?: Date;
}

Mark.init(
  {
    mark_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    marks_obtained: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },

    exam_date: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    sequelize,
    tableName: "marks",
    timestamps: false,
  },
);

Student.hasMany(Mark, {
  foreignKey: "student_id",
  onDelete: "CASCADE",
});

Mark.belongsTo(Student, {
  foreignKey: "student_id",
});

Subject.hasMany(Mark, {
  foreignKey: "subject_id",
  onDelete: "CASCADE",
});

Mark.belongsTo(Subject, {
  foreignKey: "subject_id",
});

export default Mark;
