import { Router } from "express";
import {
  getUsers,
  getUserId,
  postUsers,
  putUser,
  deletUser,
  getUserOrders,
  checkUserActivity,
} from "../models/userModel.js";

const userRoutes = Router();

userRoutes.route("/").get(getUsers).post(postUsers);
userRoutes.route("/:id").get(getUserId).put(putUser).delete(deletUser);
userRoutes.route("/:id/orders").get(getUserOrders);
userRoutes.route("/:id/check-inactive").put(checkUserActivity);

export default userRoutes;
