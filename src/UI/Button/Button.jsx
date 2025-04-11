import "./Button.css";

const Button = ({ props, children }) => {
  return <button {...props}>{children}</button>;
};

export default Button;
