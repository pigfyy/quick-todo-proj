import TodoList from "./assets/components/TodoList";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

export default function () {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("tasks");
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleSubmit(e) {
    e.preventDefault();
    setInput("");
    setTasks((prevState) => {
      return [
        ...prevState,
        {
          text: input,
          isComplete: false,
          editable: false,
          id: nanoid(),
        },
      ];
    });
  }

  function updateTaskName(e, id) {
    let newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.text = e;
      }
      return task;
    });
    setTasks(newTasks);
  }

  function updateIsCompleted(id) {
    let newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }
      return task;
    });
    setTasks(newTasks);
  }

  function editTask(id, toggleOff) {
    setTasks((prevState) => {
      return prevState.map((task) => {
        if (task.id === id) {
          task.editable = toggleOff === true ? false : !task.editable;
        }
        return task;
      });
    });

    tasks.forEach((task) => {
      if (task.id === id && task.editable) {
      }
    });
  }

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  return (
    <>
      <h1>To-Do List</h1>
      <TodoList
        tasks={tasks}
        updateTasks={(e, id) => updateTaskName(e, id)}
        updateIsCompleted={(id) => {
          updateIsCompleted(id);
        }}
        editTask={(id) => {
          editTask(id, false);
        }}
        deleteTask={(id) => {
          deleteTask(id);
        }}
        onBlur={(id) => {
          editTask(id, true);
        }}
      />
      <div className="input">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            type="text"
            placeholder="Add a to-do"
            value={input}
            maxLength="50"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </form>
      </div>
    </>
  );
}
