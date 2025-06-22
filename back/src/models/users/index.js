// ** MONGOOSE
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     identification: { type: String, required: true, unique: true },
//   },
//   { timestamps: true }
// );

// export const User = mongoose.model("User", userSchema);

// ** MONGO
import { connectDb } from "../../config/dbClient.js";

class userModel {
  constructor() {
    this.init();
  }

  async init() {
    this.db = await connectDb();
    this.collection = this.db.collection("users");
  }

  async create(user) {
    if (!this.collection) {
      console.error("La colección no está definida");
      throw new Error("La colección no está definida");
    }

    const allowedFields = {
      name: "string",
      email: "string",
      identification: "string",
    };

    const userFields = Object.keys(user);

    const hasAllFields = Object.keys(allowedFields).every((field) =>
      userFields.includes(field)
    );
    const hasOnlyAllowedFields = userFields.every((field) =>
      allowedFields.hasOwnProperty(field)
    );
    const hasCorrectTypes = userFields.every(
      (field) => typeof user[field] === allowedFields[field]
    );

    if (!hasAllFields || !hasOnlyAllowedFields || !hasCorrectTypes) {
      throw new Error(
        "Faltan campos, hay campos no permitidos o los tipos no son correctos."
      );
    }

    try {
      const result = await this.collection.insertOne(user);
      return result;
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  }

  async getAll() {
    if (!this.collection) {
      console.error("La colección no está definida");
      throw new Error("La colección no está definida");
    }
    try {
      const users = await this.collection.find({}).toArray();
      return users;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw new Error("Error al obtener los usuarios: ", error.message);
    }
  }

  async getOne(id) {
    if (!this.collection) {
      console.error("La colección no está definida");
      throw new Error("La colección no está definida");
    }
    try {
      const user = await this.collection.findOne({ identification: id });
      return user;
    } catch (error) {
      console.error("Error al obtener usuario por ID:", error);
      throw new Error("Error al obtener el usuario por ID: ", error.message);
    }
  }

  async update(id, user) {
    if (!this.collection) {
      console.error("La colección no está definida");
      throw new Error("La colección no está definida");
    }

    try {
      const result = await this.collection.updateOne(
        { identification: id },
        { $set: user }
      );
      return result;
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw new Error("Error al actualizar el usuario: ", error.message);
    }
  }

  async delete(id) {
    if (!this.collection) {
      console.error("La colección no está definida");
      throw new Error("La colección no está definida");
    }
    try {
      const result = await this.collection.deleteOne({ identification: id });
      return result;
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      throw new Error("Error al eliminar el usuario: ", error.message);
    }
  }
}

export default new userModel();
