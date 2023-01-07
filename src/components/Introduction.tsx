import Image from "next/image";
import BlobIcon from "./Icons/BlobIcon";
import userPicture from "../../public/profile.webp";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import EmailIcon from "./Icons/EmailIcon";
import GithubIcon from "./Icons/GithubIcon";
import LinkedInIcon from "./Icons/LinkedInIcon";
import Highlight from "./Text/Highlight";
import { useTranslation } from "next-i18next";

const Introduction = () => {
	const { t } = useTranslation("home");
	const [textVisible, setTextVisible] = useState<boolean>(false);

	const imageContainer = useRef<HTMLDivElement>(null);
	const textContainer = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const imageHidden = window.innerWidth < 1024;

		if (imageHidden) {
			if (!textContainer || !textContainer.current) {
				return;
			}
			setTextVisible(true);
			textContainer.current.style.opacity = "1";
			textContainer.current.style.height = "100%";
		} else {
			setTimeout(() => {
				setTextVisible(true);

				setTimeout(() => {
					if (!textContainer || !textContainer.current) return;
					textContainer.current.style.opacity = "1";
					textContainer.current.style.height = "100%";
				}, 1000);
			}, 1000);
		}
	}, []);

	return (
		<div className="flex flex-row justify-center min-h-[calc(100vh-4rem)] items-center tall:min-h-[1300px] tall:max-h-[1300px] tall:mt-4 border-b border-solid border-emerald-500 dark:border-gray-900">
			<div
				id="about"
				ref={textContainer}
				className={clsx(
					!textVisible && "invisible w-0",
					textVisible && "visible w-full lg:w-1/2",
					"flex flex-col lg:transition-introduction lg:duration-500 opacity-0 h-0"
				)}
			>
				<h1 className="text-2xl font-bold">{t("introduction-title")}</h1>
				<br />
				<p className="text-sm leading-relaxed">
					{t("introduction-text-1")}
					<Highlight>{t("introduction-highlight-1")}</Highlight>
					<br />
					<br />
					{t("introduction-text-2")}
					{t("introduction-text-3")}
					{t("introduction-text-4")}
					<Highlight>{t("introduction-highlight-2")}</Highlight>
					{t("introduction-text-5")}
					{t("introduction-text-6")}
					<strong> {t("introduction-text-callcard")}</strong>
				</p>
				<div className="hidden lg:flex flex-row mt-2">
					<Link target={"_blank"} href="https://www.linkedin.com/in/lucas-l-886352138/" legacyBehavior>
						<div className="flex flex-row items-center px-3 py-2 bg-black text-white mr-2 rounded-md dark:bg-gray-700 dark:hover:bg-gray-800 hover:bg-gray-600 transition">
							<LinkedInIcon className="w-6 h-6" />
							<p className="ml-1.5">LinkedIn</p>
						</div>
					</Link>
					<Link target={"_blank"} href="https://github.com/lucaslundjensen" legacyBehavior>
						<div className="flex flex-row items-center px-3 py-2 bg-black text-white mr-2 rounded-md dark:bg-gray-700 dark:hover:bg-gray-800 hover:bg-gray-600 transition">
							<GithubIcon className="w-6 h-6" />
							<p className="ml-1.5">GitHub</p>
						</div>
					</Link>
					<a
						href="mailto:lucas.lund@live.dk"
						className="flex flex-row items-center px-3 py-2 bg-black text-white mr-2 rounded-md dark:bg-gray-700 dark:hover:bg-gray-800 hover:bg-gray-600 transition"
					>
						<EmailIcon className="w-5 h-5" />
						<p className="ml-1.5">E-mail</p>
					</a>
				</div>
			</div>
			<div
				ref={imageContainer}
				className={clsx(
					!textVisible && "w-full",
					textVisible && "w-1/2",
					"hidden lg:flex flex-col relative self-end max-h-[calc(100vh-5rem)] tall:max-h-full"
				)}
			>
				<BlobIcon className="left-1/2 transform -translate-x-1/2 rotate-180 w-full h-auto max-w-[30rem] absolute text-emerald-400 dark:text-orange-600 blur-xl z-0" />
				<BlobIcon className="left-1/2 transform -translate-x-1/2 rotate-180 w-full h-auto max-w-[30rem] text-emerald-400 absolute dark:text-orange-600 z-10" />
				<BlobIcon className="left-1/2 transform -translate-x-1/2 top-1/4 rotate-90 w-full h-auto max-w-[30rem] absolute text-emerald-400 dark:text-orange-600 blur-xl z-0" />
				<BlobIcon className="left-1/2 transform -translate-x-1/2 top-1/4 rotate-90 w-full h-auto max-w-[30rem] absolute text-emerald-400 dark:text-orange-600 z-10" />
				<BlobIcon className="left-1/2 transform -translate-x-1/2 top-2/4 rotate-12 w-full h-auto max-w-[30rem] absolute text-emerald-400 dark:text-orange-600 blur-xl z-0" />
				<BlobIcon className="left-1/2 transform -translate-x-1/2 top-2/4 rotate-12 w-full h-auto max-w-[30rem] absolute text-emerald-400 dark:text-orange-600 z-10" />
				<Image
					className="z-20 object-contain overflow-hidden w-auto h-auto"
					src={userPicture}
					width={969}
					height={2369}
					alt="Picture of Lucas Lund Jensen"
					priority
					quality={100}
				/>
			</div>
		</div>
	);
};

export default Introduction;
