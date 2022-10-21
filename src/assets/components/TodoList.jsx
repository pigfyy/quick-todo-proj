import { nanoid } from "nanoid";
import HeaderBlock from "./blocks/HeaderBlock";
import TaskBlock from "./blocks/TaskBlock";
import React, { useEffect, useState } from "react";

export default function (props) {
  const [isOpen, setIsOpen] = useState([true, true]);

  useEffect(() => {
    const data = localStorage.getItem("isOpen");
    if (data) {
      setIsOpen(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  function makeTaskBlock(task) {
    return (
      <li key={task.id}>
        <TaskBlock
          text={task.text}
          isComplete={task.isComplete}
          key={task.id}
          id={task.id}
          editable={task.editable}
          updateTaskName={(e, id) => props.updateTasks(e, id)}
          updateIsCompleted={(id) => props.updateIsCompleted(id)}
          editTask={(id) => props.editTask(id)}
          deleteTask={(id) => props.deleteTask(id)}
          onBlur={(id) => props.onBlur(id)}
        />
      </li>
    );
  }

  function flipIsOpen(s) {
    let arr = [...isOpen];
    s === "Incomplete" ? (arr[0] = !arr[0]) : (arr[1] = !arr[1]);
    setIsOpen(arr);
  }

  const incompleteTasks = props.tasks
    .filter((task) => !task.isComplete)
    .map((task) => {
      return makeTaskBlock(task);
    });

  const completeTasks = props.tasks
    .filter((task) => task.isComplete)
    .map((task) => {
      return makeTaskBlock(task);
    });

  return (
    <main className="todo-list">
      <HeaderBlock
        text="Incomplete"
        isOpen={isOpen[0]}
        flipIsOpen={(s) => flipIsOpen(s)}
        key={nanoid()}
      />
      {isOpen[0] && <ul className="incomplete-tasks">{incompleteTasks}</ul>}
      <HeaderBlock
        text="Completed"
        isOpen={isOpen[1]}
        flipIsOpen={flipIsOpen}
        key={nanoid()}
      />
      {isOpen[1] && <ul className="complete-tasks">{completeTasks}</ul>}
    </main>
  );
}
