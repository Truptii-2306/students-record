import dotenv from "dotenv";
dotenv.config();
import express from "express";
import db from "./models";
import studentRoutes from "./routes/student.routes";
import marksRoutes from "./routes/marks.routes";
import subjectRoutes from "./routes/subject.routes";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/marks", marksRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connected successfully");

    await db.sequelize.sync({ alter: true });
    console.log("Database synced successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
  }
};

startServer();
