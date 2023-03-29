import Express, { Router } from "express";
import userRoutes from "./controller/userController.js";
import orderRoutes from "./controller/orderController.js";
import cors from "cors";

const app = Express();
const port = process.env.PORT || 9000;

//set up cors and proper POST body managment
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

//Implement routing
app.use("/users/", userRoutes);
app.use("/orders/", orderRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
