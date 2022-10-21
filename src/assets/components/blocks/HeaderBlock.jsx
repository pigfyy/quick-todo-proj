export default function (props) {
  return (
    <div className="block header">
      <span className="block--left">
        <span className="block--text">{props.text}</span>
      </span>
      <span className="block--right">
        <span
          className="material-symbols-outlined icon"
          onClick={() => {
            props.flipIsOpen(props.text);
          }}
        >
          {props.isOpen ? "remove" : "add"}
        </span>
      </span>
    </div>
  );
}
