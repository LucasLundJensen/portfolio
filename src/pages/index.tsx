import type { NextPage, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../core/apollo/apollo";
import userPicture from "../../public/profile.webp";
import GithubIcon from "../components/Icons/GithubIcon";
import LinkedInIcon from "../components/Icons/LinkedInIcon";
import Highlight from "../components/Text/Highlight";
import { ProjectCard } from "../core/types/project.types";
import BlobIcon from "../components/Icons/BlobIcon";
import EmailIcon from "../components/Icons/EmailIcon";

interface Props {
	projects: ProjectCard[];
}

const Home: NextPage<Props> = (props) => {
	const { t } = useTranslation("home");
	return (
		<>
			<Head>
				<title>Portfolio</title>
			</Head>
			<div
				id="about"
				className="grid grid-cols-5 lg:grid-cols-6 min-h-[calc(100vh-4rem)] gap-10 items-center border-b border-solid border-emerald-500 dark:border-gray-900 overflow-y-clip"
			>
				<div className="flex flex-col col-span-3">
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
					<div className="flex flex-row mt-2">
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
				<div className="flex flex-col col-span-2 lg:col-span-3 relative max-h-[calc(100vh-5rem)] self-end ">
					<BlobIcon className="left-1/2 transform -translate-x-1/2 rotate-180 w-full h-auto max-w-[30rem] absolute text-emerald-400 dark:text-orange-600 blur-xl z-0" />
					<BlobIcon className="left-1/2 transform -translate-x-1/2 rotate-180 w-full h-auto max-w-[30rem] text-emerald-400 absolute dark:text-orange-600 z-10" />
					<BlobIcon className="left-1/2 transform -translate-x-1/2 top-1/4 rotate-90 w-full h-auto max-w-[30rem] absolute text-emerald-400 dark:text-orange-600 blur-xl z-0" />
					<BlobIcon className="left-1/2 transform -translate-x-1/2 top-1/4 rotate-90 w-full h-auto max-w-[30rem] absolute text-emerald-400 dark:text-orange-600 z-10" />
					<BlobIcon className="left-1/2 transform -translate-x-1/2 top-2/4 rotate-12 w-full h-auto max-w-[30rem] absolute text-emerald-400 dark:text-orange-600 blur-xl z-0" />
					<BlobIcon className="left-1/2 transform -translate-x-1/2 top-2/4 rotate-12 w-full h-auto max-w-[30rem] absolute text-emerald-400 dark:text-orange-600 z-10" />
					<img className="w-full h-full z-20 overflow-hidden object-contain" src={userPicture.src}></img>
				</div>
			</div>
			<div id="projects" className="flex flex-col my-8">
				<h2 className="text-2xl font-bold mb-4">{t("projects")}</h2>
				<div className="grid grid-cols-12 gap-4">
					{props.projects.map((project) => (
						<Link key={project.id} href={`project/${project.id}`} legacyBehavior>
							<a className="flex flex-col col-span-6 2xl:col-span-4 p-2 rounded bg-gray-100 dark:bg-transparent border border-solid border-transparent hover:border-gray-300 dark:hover:border-transparent dark:hover:bg-gray-700 transition">
								<div className="rounded-md overflow-hidden max-h-56">
									<img className="w-full" src={project.thumbnail.url}></img>
								</div>
								<hr className="my-2 dark:border-gray-500 rounded-full" />
								<h3 className="text-xl font-bold">{project.title}</h3>
								<p className="text-sm">{project.description}</p>
							</a>
						</Link>
					))}
				</div>
			</div>
		</>
	);
};

export async function getStaticProps(context: GetStaticPropsContext) {
	/**
	 * Query CMS for projects
	 */
	let projects: any;

	try {
		const { data } = await client.query({
			query: gql`
				query GetAllProjects {
					projects(orderBy: position_ASC) {
						locale
						createdAt
						description
						id
						publishedAt
						title
						updatedAt
						thumbnail {
							id
							url
							height
							width
						}
						localizations {
							locale
							description
						}
					}
				}
			`,
		});

		projects = data.projects;
	} catch (error) {}

	// Return props to page.
	return {
		props: {
			projects: projects || [],
			...(await serverSideTranslations(context.locale!, ["home", "navbar"])),
		},
		// revalidate: 1000, // Regenerate the page on new request if it hasn't been updated X amount of seconds.
	};
}

export default Home;
