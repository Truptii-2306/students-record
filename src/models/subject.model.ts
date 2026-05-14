import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface SubjectAttributes {
  subject_id: number;
  subject_name: string;
}

interface SubjectCreationAttributes extends Optional<
  SubjectAttributes,
  "subject_id"
> {}

class Subject
  extends Model<SubjectAttributes, SubjectCreationAttributes>
  implements SubjectAttributes
{
  public subject_id!: number;
  public subject_name!: string;
}

Subject.init(
  {
    subject_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    subject_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "subjects",
    timestamps: false,
  },
);

export default Subject;
