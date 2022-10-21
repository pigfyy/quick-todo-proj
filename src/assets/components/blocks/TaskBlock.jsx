import { useRef } from "react";

export default function (props) {
  const inputRef = useRef(null);

  function handleFocus() {
    inputRef.current.focus();
  }

  return (
    <div
      className={`block task ${props.isComplete ? "complete" : "incomplete"}`}
    >
      <span className="block--left">
        <span
          className="material-symbols-outlined icon"
          onClick={() => props.updateIsCompleted(props.id)}
        >
          {props.isComplete ? "radio_button_checked" : "radio_button_unchecked"}
        </span>
        <span className="block--text">
          <input
            type="text"
            ref={inputRef}
            className={`block--text--input ${
              props.isComplete && "strike-greyed"
            } ${props.editable && "editable"}`}
            maxLength={50}
            readOnly={!props.editable}
            defaultValue={props.text}
            onChange={(e) => {
              props.updateTaskName(e.target.value, props.id);
            }}
            onBlur={() => {
              props.onBlur(props.id);
            }}
          />
        </span>
      </span>
      <span className="block--right">
        <span
          className="material-symbols-outlined icon"
          onClick={() => {
            props.editTask(props.id);
            handleFocus();
          }}
        >
          edit
        </span>
        <span
          className="material-symbols-outlined icon red-hover"
          onClick={() => props.deleteTask(props.id)}
        >
          close
        </span>
      </span>
    </div>
  );
}
