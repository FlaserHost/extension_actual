import { FC } from "react";
import styles from "./Button.module.sass";
import classNames from "classnames";

interface ButtonProps {
  text: string;
  callback?: () => void;
  disabled?: boolean;
  merge?: boolean;
}

const Button: FC<ButtonProps> = ({ text, callback, disabled, merge}) => {
  return (
    <button
      className={classNames({
        [styles.button]: true,
        [styles.disabled]: disabled,
        [styles.merge]: merge
      })}
      onClick={callback}
    >
      {text}
    </button>
  );
};

export default Button;
