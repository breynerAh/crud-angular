// ** MONGOOSE
// import { User } from "../../models/users/index.js";

// export const userController = async (req, res) => {
//   try {
//     const { name, email, identification } = req.body;

//     const user = new User({
//       name,
//       email,
//       identification,
//     });
//     await user.save();
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error al crear el usuario",
//       error: error.message,
//     });
//   }
// };

// ** MONGO
import userModel from "../../models/users/index.js";

class userController {
  constructor() {}

  async create(req, res) {
    try {
      const { name, email, identification } = req.body;

      const user = {
        name,
        email,
        identification,
      };

      const result = await userModel.create(user);

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({
        message: "Error al crear el usuario",
        error: error.message,
      });
    }
  }

  async getAll(req, res) {
    try {
      const users = await userModel.getAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getOne(req, res) {
    try {
      const { identification } = req.params;
      const user = await userModel.getOne(identification);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async update(req, res) {
    try {
      const { identification } = req.params;
      const user = req.body;

      const result = await userModel.update(identification, user);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async delete(req, res) {
    try {
      const { identification } = req.params;
      const result = await userModel.delete(identification);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export default new userController();
