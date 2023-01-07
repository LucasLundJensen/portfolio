import clsx from "clsx";
import { useTheme } from "next-themes";
import { ChangeEvent, useEffect, useState } from "react";
import MoonIcon from "../Icons/MoonIcon";
import SunIcon from "../Icons/SunIcon";

interface Props {
	className?: string;
}

const ThemeToggle = (props: Props) => {
	const { theme, setTheme } = useTheme();
	const [checked, setChecked] = useState<boolean>(false);

	useEffect(() => {
		if (theme === "dark") setChecked(true);
		else setChecked(false);
	}, [theme]);

	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		if (event.target.checked) {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	}

	function handleMobileThemeSwitch() {
		if (checked) {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	}

	return (
		<>
			<label
				className={clsx(
					"hidden relative cursor-pointer bg-gray-300 dark:bg-gray-700 w-16 h-8 rounded-full lg:block",
					props.className
				)}
				htmlFor="checkbox"
			>
				<SunIcon className="absolute top-1.5 left-1 w-5 h-5 text-yellow-400" />
				<MoonIcon className="absolute top-1.5 left-[2.3rem] w-5 h-5 text-white" />
				<input
					className="opacity-0 w-0 h-0"
					checked={checked}
					onChange={handleInputChange}
					id="checkbox"
					type="checkbox"
				/>
				<span
					className={clsx(
						"absolute top-1 left-1 w-6 h-6 bg-gray-400 dark:bg-gray-600 rounded-full transition",
						checked && "translate-x-8"
					)}
				></span>
			</label>

			{/* Mobile Version */}

			<button
				className={clsx(
					props.className,
					"p-2 w-full flex flex-row items-center bg-gray-700 rounded-md lg:hidden"
				)}
				onClick={() => handleMobileThemeSwitch()}
			>
				<SunIcon className={clsx(!checked && "hidden", "w-5 h-5 text-yellow-400")} />
				<MoonIcon className={clsx(checked && "hidden", "w-5 h-5 text-white")} />
			</button>
		</>
	);
};

export default ThemeToggle;
