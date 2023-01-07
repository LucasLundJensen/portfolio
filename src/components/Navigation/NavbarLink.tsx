import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
	href: string;
	text: string;
	onClick?: () => void;
}

const NavbarLink = (props: Props) => {
	const router = useRouter();
	const [activePath, setActivePath] = useState<boolean>(false);

	useEffect(() => {
		if (router.pathname.includes(props.href)) {
			setActivePath(true);
		} else {
			setActivePath(false);
		}
	}, [router, props.href]);

	return (
		<Link href={props.href} legacyBehavior>
			<div
				className={clsx(
					"mr-2 last:mr-0 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-200 p-2 rounded-md transition-[background]",
					activePath && "bg-gray-700"
				)}
				onClick={props.onClick}
			>
				{props.text}
			</div>
		</Link>
	);
};

export default NavbarLink;
