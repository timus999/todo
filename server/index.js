const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db/connect");

app.use(cors());
app.use(express.json());

// get todos
app.get("/todos", async (req, res) => {
  try {
    const todo = await pool.query("SELECT * FROM todo");
    res.send(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE t_id = $1", [id]);
    res.send(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// post a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      `INSERT INTO todo (description) VALUES($1)`,
      [description]
    );
    res.send("adding complete");
    console.log(description);
  } catch (e) {
    console.error(e.message);
  }
});
// update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const todo = await pool.query(
      "UPDATE todo SET description = ($1) WHERE t_id = $2",
      [description, id]
    );
    res.send("updated successfully");
  } catch (err) {
    console.error(err.message);
  }
});

// delete todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("DELETE FROM todo WHERE t_id = $1", [id]);
    res.send("deleted completely");
  } catch (err) {
    console.error(err.message);
  }
});

// port ;
app.listen(5000, () => {
  console.log(`listening to port 5000`);
});
