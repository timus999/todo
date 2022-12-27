import React from "react";
import { useState } from "react";

const EditTodo = ({ todo }) => {
  const [description, setdescription] = useState(todo.description);
  const [state, setstate] = useState(false);

  //   for toggling modal
  const toggleModal = () => {
    setstate(!state);
  };

  // updating
  const updateData = async () => {
    try {
      const body = { description };
      await fetch(`http://localhost:5000/todos/${todo.t_id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      console.log("updated");
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  //   this is for closing the modal when clicked outside the modal box
  const handle = (e) => {
    if (e.target.id === `id${todo.t_id}`) {
      toggleModal();
    }
  };
  return (
    <>
      <button
        className="bg-purple-600 hover:bg-purple-500 px-3 py-2 rounded-md"
        onClick={toggleModal}
        data-target={`id${todo.t_id}`}
      >
        Edit
      </button>

      {/* render when edit button is clicked  */}
      {state && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center backdrop-blur-sm"
          onClick={handle}
          id={`id${todo.t_id}`}
        >
          <div className="grid grid-rows-2 w-2/4">
            <div>
              <textarea
                type="text"
                className="border border-black outline-none px-3 py-2 w-full"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>
            <div className="mt-5 flex justify-end gap-6">
              <button
                className="bg-green-500 px-2 rounded-md hover:bg-green-400"
                onClick={updateData}
              >
                Edit
              </button>
              <button
                className="bg-red-500 px-2 rounded-md hover:bg-red-400"
                onClick={toggleModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTodo;
