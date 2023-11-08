import React, { ButtonHTMLAttributes } from "react";
import { classNames } from "shared/lib/classNames/className";
import cls from "./Button.module.scss";

export enum ButtonTheme {
  CLEAR = "clear",
	OUTLINE = "outline"
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
}

const Button = (props: ButtonProps) => {
	const {
		className,
		children,
		theme = "",
		...otherProps
	} = props;

	return (
		<button 
			className={classNames(cls.Button, {}, [className, cls[theme]])}
			{...otherProps}
		>
			{children}
		</button>
	);
};

export default Button;