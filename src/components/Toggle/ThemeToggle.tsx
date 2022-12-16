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
        if (theme === 'dark') setChecked(true);
        else setChecked(false);
    }, [theme]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) setTheme('dark');
        else setTheme('light');
    }

    return (
        <label className={clsx(
            "relative cursor-pointer bg-slate-400 dark:bg-gray-700 w-16 h-8 rounded-full",
            props.className
        )} htmlFor="checkbox">
            <SunIcon className="absolute top-1.5 left-1 w-5 h-5 text-yellow-400" />
            <MoonIcon className="absolute top-1.5 left-[2.3rem] w-5 h-5 text-white" />
            <input className="opacity-0 w-0 h-0" onChange={handleInputChange} id="checkbox" type="checkbox" />
            <span className={clsx(
                "absolute top-1 left-1 w-6 h-6 bg-slate-500 dark:bg-gray-600 rounded-full transition",
                checked && "translate-x-8"
            )}></span>
        </label>
    )
}

export default ThemeToggle;