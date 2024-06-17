import React from "react";
import { Theme, useTheme } from "@/app/providers/ThemeProvider";
import SunIcon from "@/shared/assets/icons/sun-fill.svg?react";
import MoonIcon from "@/shared/assets/icons/moon-fill.svg?react";
import { classNames } from "@/shared/lib/classNames/className";
import cls from "./ThemeSwitcher.module.scss";
import Button, { ButtonTheme } from "../Button/Button";

interface ThemeSwitcherProps {
  className?: string
}


const ThemeSwitcher = React.memo((props: ThemeSwitcherProps) => {
	const {
		className
	} = props;
  
	const {theme, toggleTheme} = useTheme();

	return (
		<div className={classNames(cls.ThemeSwticher, {}, [className])}>
			<Button theme={ButtonTheme.CLEAR} onClick={toggleTheme}>
				{theme === Theme.LIGHT ? (
					<SunIcon className={cls.icon} width={"24px"} height={"24px"} />
				) : (
					<MoonIcon className={cls.icon} width={"24px"} height={"24px"} />
				)}
			</Button>
		</div>
	);
});

ThemeSwitcher.displayName = "ThemeSwitcher";


export default ThemeSwitcher;