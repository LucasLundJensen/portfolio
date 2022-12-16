import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
	href: string;
	text: string;
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
		<Link href={props.href}>
			<a
				className={clsx(
					"mr-2 last:mr-0  hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-200 p-2 rounded-md transition-[background]",
					activePath && "bg-gray-700"
				)}
			>
				{props.text}
			</a>
		</Link>
	);
};

export default NavbarLink;
