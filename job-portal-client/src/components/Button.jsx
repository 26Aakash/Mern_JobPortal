const Button = ({ onClickHandler, value, title }) => {
  return (
    <button
      onClick={onClickHandler}
      value={value}
      className="btn-outline text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-all duration-200"
    >
      {title}
    </button>
  );
};

export default Button;
