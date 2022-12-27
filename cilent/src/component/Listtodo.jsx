import React, { useState, useEffect } from "react";
import EditTodo from "./EditTodo";
const Listtodo = () => {
  const [description, setDescription] = useState([]);

  //   for getting data from database
  const listTodo = async () => {
    try {
      const list = await fetch("http://localhost:5000/todos");
      const data = await list.json();
      console.log(data);
      setDescription(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  //   for rendering page everytime data is changed

  useEffect(() => {
    listTodo();
  }, []);

  //   for deleting single item from the todo list

  const deletelist = async (id) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "delete",
      });

      setDescription((description) => {
        description.filter((todo) => todo.t_id !== id);
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-10 relative">
        <h1 className="text-4xl">Description</h1>
        <div className="mt-5 w-3/4">
          <ol className="list-decimal">
            {description.map((todo) => {
              return (
                <div
                  key={todo.t_id}
                  className="flex mt-5 justify-between w-full"
                >
                  <li className="flex-1 pl-5">{todo.description}</li>
                  <div className="flex justify-between w-1/3">
                    <EditTodo todo={todo} />
                    <button
                      className="bg-red-600 hover:bg-red-500 px-3 py-2 rounded-md"
                      onClick={() => deletelist(todo.t_id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Listtodo;
