import clsx from "clsx";
import { useRouter } from "next/router";
import { useState } from "react";
import ChevronDownIcon from "../Icons/ChevronDownIcon";

interface Props {
	languages: string[];
}

function translateLanguage(language: string) {
	switch (language) {
		case "dk_DK":
			return "Dansk";
		case "no_NO":
			return "Norsk";
		case "en_US":
			return "English";
		default:
			return "English";
	}
}

const LangDropdown = (props: Props) => {
	const [visible, setVisible] = useState<boolean>(false);
	const router = useRouter();

	function setLocale(language: string) {
		router.push(router.asPath, router.asPath, { locale: language });
		setVisible(false);
	}

	return (
		<div className="relative ml-2">
			<button
				className="flex flex-row items-center bg-slate-400 dark:bg-gray-700 p-2 rounded-md"
				onClick={() => setVisible(!visible)}
			>
				{translateLanguage(router.locale || "no-NO")}
				<ChevronDownIcon className="ml-2 w-4 h-4" />
			</button>
			<div
				className={clsx(
					visible && "flex",
					!visible && "hidden",
					"absolute flex-col items-center bg-white border border-solid border-gray-700 dark:bg-dark-gray mx-auto mt-2 rounded-md left-0 right-0"
				)}
			>
				{props.languages.map((lang) => (
					<button
						className="py-1 w-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
						onClick={() => setLocale(lang)}
						key={lang}
					>
						{translateLanguage(lang)}
					</button>
				))}
			</div>
		</div>
	);
};

export default LangDropdown;