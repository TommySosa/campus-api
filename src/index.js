import express from "express";
import cors from "cors";
import coursesRoutes from "./routes/courses.routes.js";
import teachersRoutes from "./routes/teachers.routes.js";
import studentsRoutes from "./routes/students.routes.js";
import modulesRoutes from "./routes/modules.routes.js";
import exercisesRoutes from "./routes/exercises.routes.js";
import multipleRoutes from "./routes/multiple.routes.js";
import trueFalseRoutes from "./routes/true_false.routes.js";
import attendanceRoutes from "./routes/attendace.routes.js";
import usersRoutes from "./routes/users.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import contentRoutes from "./routes/content.routes.js"
import forumRoutes from "./routes/forum.routes.js"

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api", coursesRoutes);
app.use("/api", studentsRoutes);
app.use("/api", teachersRoutes);
app.use("/api", modulesRoutes);
app.use("/api", exercisesRoutes);
app.use("/api", multipleRoutes);
app.use("/api", trueFalseRoutes);
app.use("/api", attendanceRoutes);
app.use("/api", usersRoutes);
app.use("/api", categoryRoutes);
app.use("/api", contentRoutes);
app.use("/api", forumRoutes);

app.listen(4001, () => {
  console.log("Servidor iniciado en el puerto 4001");
});
