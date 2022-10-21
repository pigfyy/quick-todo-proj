import TodoList from "./assets/components/TodoList";
import React, { useState } from "react";
import { nanoid } from "nanoid";

export default function () {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setTasks((prevState) => {
      return [
        ...prevState,
        {
          text: input,
          isComplete: Math.random() > 0.5 ? true : false,
          id: nanoid(),
        },
      ];
    });
  }

  function updateTaskName(e) {}

  return (
    <>
      <h1>To-Do List</h1>
      <TodoList tasks={tasks} updateTasks={() => updateTaskName(e)} />
      <div className="input">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            type="text"
            placeholder="Add a to-do"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </form>
      </div>
    </>
  );
}
