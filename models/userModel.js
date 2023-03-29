import pool from "../db/pg.js";

const getUsers = async (req, res) => {
  try {
    const { rows: users } = await pool.query("SELECT * FROM users");
    res.json(users);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};

const getUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const myQuery = "SELECT * FROM users WHERE id = $1";
    const { rows: user } = await pool.query(myQuery, [id]);
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};

const postUsers = async (req, res) => {
  try {
    const { first_name, last_name, age } = req.body;
    if (!first_name || !last_name || !age)
      return res.json({ error: "missing values" });
    const myQuery =
      "INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *";
    const {
      rows: [user],
    } = await pool.query(myQuery, [first_name, last_name, age]);

    res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};

const putUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, age } = req.body;
    if (!first_name || !last_name || !age)
      return res.json({ error: "missing values" });
    const myQuery =
      "UPDATE users SET first_name = $1, last_name = $2, age = $3 WHERE id = $4 RETURNING *";

    const { rows: users } = await pool.query(myQuery, [
      first_name,
      last_name,
      age,
      id,
    ]);
    res.json(users);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};

const deletUser = async (req, res) => {
  try {
    const { id } = req.params;
    const myQuery = "DELETE FROM users WHERE id = $1 RETURNING *";
    const { rows: users } = await pool.query(myQuery, [id]);
    res.json(users);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const myQuery =
      "SELECT u.first_name, u.last_name, o.price, o.date from orders o JOIN users u ON o.user_id = u.id WHERE u.id = $1";
    const { rows: orders } = await pool.query(myQuery, [id]);
    res.json(orders);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};

const checkUserActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const myQuery = "SELECT * from orders WHERE user_id = $1";
    const { rows: orders } = await pool.query(myQuery, [id]);
    if (orders.length == 0) {
      const newQuery =
        "UPDATE users SET active = FALSE WHERE id = $1 RETURNING *";
      const { rows: users } = await pool.query(newQuery, [id]);
      res.json(users);
    } else {
      res.send("User has ordered before");
    }
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};

export {
  getUsers,
  getUserId,
  postUsers,
  putUser,
  deletUser,
  getUserOrders,
  checkUserActivity,
};
