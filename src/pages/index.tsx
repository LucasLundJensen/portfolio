import type { NextPage, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../core/apollo/apollo";
import { ProjectCard } from "../core/types/project.types";
import Image from "next/image";
import Introduction from "../components/Introduction";

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
			<Introduction />
			<div id="projects" className="flex flex-col my-8">
				<h2 className="text-2xl font-bold mb-4">{t("projects")}</h2>
				<div className="grid grid-cols-12 gap-4">
					{props.projects.map((project) => (
						<Link key={project.id} href={`project/${project.id}`} legacyBehavior>
							<a className="flex flex-col col-span-12 lg:col-span-6 2xl:col-span-4 rounded bg-gray-200 dark:bg-dark-lightgray border border-solid border-transparent hover:border-gray-300 dark:hover:border-transparent dark:hover:bg-gray-700 transition">
								<div className="rounded-t-md overflow-hidden max-h-56">
									<Image
										className="w-full"
										src={project.thumbnail.url}
										alt="Projekt Thumbnail"
										width={project.thumbnail.width}
										height={project.thumbnail.height}
									/>
								</div>
								<div className="p-2">
									<h3 className="text-xl font-bold">{project.title}</h3>
									<p className="text-sm">{project.description}</p>
								</div>
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
			...(await serverSideTranslations(context.locale!, ["common", "home", "navbar"])),
		},
		revalidate: 1000,
	};
}

export default Home;
