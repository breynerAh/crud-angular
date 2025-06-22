// **CONEXIÓN MONGOOSE
// import express from "express";
// import userRoutes from "./src/routes/users/index.js";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();

// app.use(express.json());
// app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
// app.use("/api/user", userRoutes);

// export default app;

// **CONEXIÓN MONGO
import express from "express";
import userRoutes from "./src/routes/users/index.js";
import { connectDb } from "./src/config/dbClient.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/user", userRoutes);

const port = process.env.PORT || 3001;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Conexión a mongo exitosa: ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error de conexión:", error);
  });
