import pool from "../db/pg.js";

const getOrders = async (req, res) => {
  try {
    const myQuery = "SELECT * from orders";
    const { rows: orders } = await pool.query(myQuery);
    res.json(orders);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};

const getOrderId = async (req, res) => {
  try {
    const { id } = req.params;
    const myQuery = "SELECT * FROM orders WHERE id = $1";

    const { rows: order } = await pool.query(myQuery, [id]);
    res.json(order);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};

const postOrder = async (req, res) => {
  try {
    const { price, date, user_id } = req.body;
    if (!price || !date || !user_id) return res.json({ error: "missing data" });

    const myQuery =
      "INSERT INTO orders (price, date, user_id) VALUES ($1, $2, $3) RETURNING *";
    const {
      rows: [order],
    } = await pool.query(myQuery, [price, date, user_id]);
    res.status(201).json(order);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};

const putOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, date } = req.body;
    if (!price || !date) return res.json({ error: "missing data" });

    const myQuery =
      "UPDATE orders SET price = $1, date = $2 WHERE id = $3 RETURNING *";

    const { rows: order } = await pool.query(myQuery, [price, date, id]);
    res.json(order);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};

const deletOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const myQuery = "DELETE FROM orders WHERE id = $1 RETURNING *";
    const { rows: order } = await pool.query(myQuery, [id]);
    res.json(order);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};

export { getOrders, getOrderId, postOrder, putOrder, deletOrder };
