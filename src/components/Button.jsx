function Button(props) {
  return (
    <button
      className={`bg-cyan-700 p-2 rounded-md text-stone-50 hover:bg-cyan-800 active:bg-cyan-800 ${props.addStyles}`}
      {...props}
    >
      {props.children}
    </button>
  );
}

export default Button;