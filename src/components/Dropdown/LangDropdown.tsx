import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import ChevronDownIcon from "../Icons/ChevronDownIcon";

interface Props {
	languages: string[];
}

function translateLanguage(language: string) {
	switch (language) {
		case "dk":
			return "Dansk";
		case "no":
			return "Norsk";
		case "en":
			return "English";
		default:
			return "English";
	}
}

const LangDropdown = (props: Props) => {
	const [visible, setVisible] = useState<boolean>(false);
	const router = useRouter();

	return (
		<div className="relative ml-2">
			<button
				className="flex flex-row items-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 p-2 rounded-md"
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
					<Link
						className="py-2 w-full text-center hover:bg-gray-200 dark:hover:bg-gray-700  border-b border-solid border-black last:border-none first:rounded-t-md last:rounded-b-md"
						key={lang}
						onClick={() => setVisible(!visible)}
						locale={lang}
						href={router.asPath}
					>
						{translateLanguage(lang)}
					</Link>
				))}
			</div>
		</div>
	);
};

export default LangDropdown;
