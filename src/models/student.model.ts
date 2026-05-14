import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface StudentAttributes {
  student_id: number;
  first_name: string;
  last_name: string;
  date_of_birth?: Date;
  gender?: string;
  email?: string;
}

interface StudentCreationAttributes extends Optional<
  StudentAttributes,
  "student_id"
> {}

class Student
  extends Model<StudentAttributes, StudentCreationAttributes>
  implements StudentAttributes
{
  public student_id!: number;
  public first_name!: string;
  public last_name!: string;
  public date_of_birth?: Date;
  public gender?: string;
  public email?: string;
}

Student.init(
  {
    student_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    date_of_birth: {
      type: DataTypes.DATEONLY,
    },

    gender: {
      type: DataTypes.STRING,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "students",
    timestamps: false,
  },
);

export default Student;
