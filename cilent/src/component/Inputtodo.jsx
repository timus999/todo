import React, { useState } from "react";

const Inputtodo = () => {
  const [description, setDescription] = useState("");

  //   for creating list in the database
  const submitTodo = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      console.log(body);
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      console.log(response);
      window.location = "/";
    } catch (err) {
      console.error(err.msg);
    }
  };
  return (
    <div>
      <h1 className="text-center text-5xl">Pern Todo List</h1>
      <form method="post" onSubmit={submitTodo}>
        <div className="text-center mt-5 flex justify-center gap-2">
          <input
            type="text"
            className="border border-black w-1/2 px-2"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add task"
          />
          <button className="bg-purple-500 px-3 rounded-lg py-2 hover:bg-purple-400">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Inputtodo;
