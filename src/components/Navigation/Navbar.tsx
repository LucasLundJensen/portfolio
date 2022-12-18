import clsx from "clsx";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LangDropdown from "../Dropdown/LangDropdown";
import ThemeToggle from "../Toggle/ThemeToggle";
import NavbarLink from "./NavbarLink";

interface Props {}

const Navbar = (props: Props) => {
	const { locale, locales, defaultLocale, asPath } = useRouter();
	const { t } = useTranslation("navbar");

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
		<nav
			className={clsx(
				"h-16 sticky top-0 z-50 flex bg-transparent dark:bg-transparent backdrop-blur transition-colors duration-500 flex-row items-center border-gray-200 drop-shadow-sm border-solid border-b text-black py-3 px-32 dark:border-gray-900/[0.7] dark:text-white",
				hasScrolled && "bg-white/95 dark:bg-dark-gray/75"
			)}
		>
			<Link href="/">
				<a className="font-medium">Lucas Lund Jensen</a>
			</Link>
			<div className="flex flex-row items-center ml-auto">
				<NavbarLink href="/#about" text={t("about")} />
				<NavbarLink href="/#projects" text={t("projects")} />
				{/* <NavbarLink href="/jobs" text="Arbeidserfaring" /> */}
				{/* <NavbarLink href="/contact" text="Kontakt" /> */}
			</div>
			<LangDropdown languages={locales || []} />
			<ThemeToggle className="ml-2" />
		</nav>
	);
};

export default Navbar;
