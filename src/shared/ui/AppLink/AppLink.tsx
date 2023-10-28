import React from "react";
import cls from "./AppLink.module.scss";
import { LinkProps, Link } from "react-router-dom";
import { classNames } from "shared/lib/classNames";

export enum AppLinkTheme {
  PRIMARY = "primary",
  SECONDARY = "secondary"
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme
}

export const AppLink: React.FC<AppLinkProps> = (props) => {
	const {
		className,
		children,
		to,
		theme = AppLinkTheme.PRIMARY,
		...otherProps
	} = props;

	return (
		<Link to={to} className={classNames(cls.AppLink, {}, [className, cls[theme]])} {...otherProps}>
			{children}
		</Link>
	);
};