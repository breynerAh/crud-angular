import express from "express";
import userController from "../../controllers/users/index.js";
// import { userGetAllController } from "../../controllers/users/getAllUser.js";

const router = express.Router();

router.post("/create", userController.create);
router.get("/", userController.getAll);
router.get("/:identification", userController.getOne);
router.put("/:identification", userController.update);
router.delete("/:identification", userController.delete);
// router.get("/", userGetAllController);

export default router;
