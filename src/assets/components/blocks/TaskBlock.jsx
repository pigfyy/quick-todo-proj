export default function (props) {
  return (
    <div
      className={`block task ${props.isComplete ? "complete" : "incomplete"}`}
    >
      <span className="block--left">
        <span className="material-symbols-outlined icon">
          {props.isComplete ? "radio_button_checked" : "radio_button_unchecked"}
        </span>
        <span className="block--text">
          <input
            type="text"
            maxLength={20}
            defaultValue={props.text}
            onChange={(e) => {
              props.updateTaskName(e.target.value);
            }}
          />
        </span>
      </span>
      <span className="block--right">
        <span className="material-symbols-outlined icon">edit</span>
        <span className="material-symbols-outlined icon red-hover">close</span>
      </span>
    </div>
  );
}
