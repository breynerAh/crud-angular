// **CONEXIÓN MONGOOSE
import mongoose from "mongoose";
import app from "./app.js";

const port = process.env.PORT || 3001;

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conexión a mongo exitosa");
  } catch (error) {
    console.error("Error de conexión:", error);
  }
};

connection().then(() => {
  app.listen(port, () => {
    console.log(`app corriendo en el puerto: ${port}`);
  });
});
