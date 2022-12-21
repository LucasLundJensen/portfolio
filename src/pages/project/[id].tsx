import { GetStaticPropsContext, NextPage } from "next";
import { gql } from "@apollo/client";
import client from "../../core/apollo/apollo";
import { LocalizedProject } from "../../core/types/project.types";
import Markdown from "markdown-to-jsx";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { withTranslation } from "react-i18next";

interface Props {
	project: LocalizedProject;
}

const ProjectPage: NextPage<Props> = (props) => {
	const [localizedContent, setLocalizedContent] = useState<string>();
	const [localizationFailed, setLocalizationFailed] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		findLocalizedContent();
	}, [localizedContent, router.locale]);

	function findLocalizedContent() {
		const locale = router.locale;
		let found = false;
		props.project.localizations.forEach((localization) => {
			if (found) return;

			if (localization.locale === locale) {
				setLocalizedContent(localization.content);
				setLocalizationFailed(false);
				found = true;
			}
		});

		if (!found) {
			if (props.project.locale !== locale) {
				setLocalizationFailed(true);
			}
			setLocalizedContent(props.project.content);
		}
	}

	return (
		<div>
			{localizationFailed && (
				<div className="text-center mt-4 bg-red-700 py-2 opacity-70 text-white">
					<p>This post has not yet been translated to your current selected language.</p>
				</div>
			)}
			<Markdown
				options={{ forceBlock: true }}
				className="pb-20 prose max-w-none prose-p:my-1 prose-gray prose-h5:text-xl prose-h5:font-bold dark:prose-invert"
			>
				{localizedContent || "No content found for post"}
			</Markdown>
		</div>
	);
};

export async function getStaticProps(context: GetStaticPropsContext) {
	const { data } = await client.query({
		query: gql`
	        query GetProjectById($id: ID = "${context.params?.id}") {
	            project(where: {id: $id}) {
					locale
					createdAt
					description
					id
					content
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
					  content
					}
				  }
	        }
	    `,
	});

	return {
		props: {
			project: data.project,
			...(await serverSideTranslations(context.locale!, ["navbar"])),
		},
		revalidate: 1000,
	};
}

export async function getStaticPaths() {
	const { data } = await client.query({
		query: gql`
			query GetProjectPaths {
				projects {
					id
				}
			}
		`,
	});

	const englishPaths = data.projects.map((project: any) => {
		return {
			params: {
				id: project.id,
			},
			locale: "en_US",
		};
	});

	const norwegianPaths = data.projects.map((project: any) => {
		return {
			params: {
				id: project.id,
			},
			locale: "no_NO",
		};
	});

	return {
		paths: [...englishPaths, ...norwegianPaths],
		fallback: false,
	};
}

export default withTranslation("common")(ProjectPage);
