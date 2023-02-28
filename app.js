import express from "express";
import { openDb } from "./src/db/configDB.js";
import { createTable } from "./src/controller/UserController.js";
import { createTabelaTreinos } from "./src/controller/WorkoutController.js"
import usuarioRoute from "./src/routes/userRouter.js";
import authRoute from "./src/routes/authRouter.js";
import workoutRoute from "./src/routes/workoutRouter.js";



const app = express();
const port = 3000;

app.use(express.json())

createTable();
createTabelaTreinos();

app.use("/", usuarioRoute);
app.use("/auth", authRoute);
app.use("/workout", workoutRoute);


app.listen(port, (req,res) => {
    console.log("Servidor online")
})

