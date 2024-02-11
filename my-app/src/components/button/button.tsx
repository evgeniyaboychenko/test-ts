import "./button.css";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  handleButtonSortClick: () => void;
};

const Button = ({ children, ...props }: Props) => {
  const { handleButtonSortClick } = props;
  return <button onClick={handleButtonSortClick}>{children}</button>;
};

export default Button;
