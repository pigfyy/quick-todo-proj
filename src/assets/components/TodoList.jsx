import { nanoid } from "nanoid";
import HeaderBlock from "./blocks/HeaderBlock";
import TaskBlock from "./blocks/TaskBlock";

export default function (props) {
  function makeTaskBlock(task) {
    return (
      <li>
        <TaskBlock
          text={task.text}
          isComplete={task.isComplete}
          key={task.id}
          updateTaskName={props.updateTaskName}
        />
      </li>
    );
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
      <HeaderBlock text="Incomplete" isOpen={true} key={nanoid()} />
      <ul className="incomplete-tasks">{incompleteTasks}</ul>
      <HeaderBlock text="Completed" isOpen={false} key={nanoid()} />
      <ul className="complete-tasks">{completeTasks}</ul>
    </main>
  );
}
