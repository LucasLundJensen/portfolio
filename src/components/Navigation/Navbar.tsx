import clsx from "clsx";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import LangDropdown from "../Dropdown/LangDropdown";
import BarsIcon from "../Icons/BarsIcon";
import ThemeToggle from "../Toggle/ThemeToggle";
import NavbarLink from "./NavbarLink";

interface Props {}

const Navbar = (props: Props) => {
	const { locale, locales, defaultLocale, asPath } = useRouter();
	const { t } = useTranslation("navbar");
	const [dropdownVisible, setDropdownVisible] = useState<boolean>(false); // Used purely on mobile for hamburger menu.

	const [hasScrolled, setHasScrolled] = useState<boolean>(false);

	useEffect(() => {
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, [onScroll]);

	function onScroll() {
		if (window.scrollY > 0) {
			if (!hasScrolled) {
				setHasScrolled(true);
			}
		} else {
			setHasScrolled(false);
		}
	}

	return (
		<>
			<nav
				className={clsx(
					"h-16 sticky top-0 z-50 flex bg-transparent dark:bg-transparent backdrop-blur transition-colors duration-500 flex-row items-center border-gray-200 drop-shadow-sm border-solid border-b text-black py-3 px-4 lg:px-32 dark:border-gray-900/[0.7] dark:text-white",
					hasScrolled && "bg-gray-100/75 dark:bg-dark-gray/75"
				)}
			>
				<Link href="/">Lucas Lund Jensen</Link>
				<div className="flex flex-row items-center ml-auto lg:hidden">
					<ThemeToggle className="mr-2" />
					<button onClick={() => setDropdownVisible(!dropdownVisible)} className="p-2 rounded-md bg-gray-700">
						<BarsIcon className="w-5 h-5 text-white" />
					</button>
				</div>
				<div className="hidden lg:flex flex-row items-center lg:ml-auto">
					<NavbarLink href="/#about" text={t("about")} />
					<NavbarLink href="/#projects" text={t("projects")} />
					{/* <NavbarLink href="/jobs" text={t("experience")} /> */}
					<LangDropdown languages={locales || []} />
					<ThemeToggle className="ml-2" />
				</div>
			</nav>

			{/* Burger menu for mobile */}

			<div
				className={clsx(
					!dropdownVisible && "hidden",
					hasScrolled && "bg-gray-100/90 dark:bg-dark-gray/90",
					"sticky lg:hidden top-16 bg-transparent dark:bg-transparent backdrop-blur transition-colors duration-500 border-b border-solid  dark:border-gray-900/[0.7] mb-2"
				)}
			>
				<NavbarLink onClick={() => setDropdownVisible(!dropdownVisible)} href="/#about" text={t("about")} />
				<NavbarLink
					onClick={() => setDropdownVisible(!dropdownVisible)}
					href="/#projects"
					text={t("projects")}
				/>
				<NavbarLink onClick={() => setDropdownVisible(!dropdownVisible)} href="/jobs" text={t("experience")} />
			</div>
		</>
	);
};

export default Navbar;
