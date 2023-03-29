import { Router } from "express";
import {
  getOrders,
  getOrderId,
  postOrder,
  putOrder,
  deletOrder,
} from "../models/orderModel.js";

const orderRoutes = Router();

orderRoutes.route("/").get(getOrders).post(postOrder);
orderRoutes.route("/:id").get(getOrderId).put(putOrder).delete(deletOrder);

export default orderRoutes;
