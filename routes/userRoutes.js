import express from "express";
const router = express.Router();

import {
  authenticateUser,
  authorizePermissions,
} from "../middleware/authentication.js";
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userController.js";

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllUsers);

router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);
router.route("/:id").get(authenticateUser, getSingleUser);

export default router;
