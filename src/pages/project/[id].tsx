import { GetStaticPropsContext, NextPage } from "next";
import { gql } from "@apollo/client";
import client from "../../core/apollo/apollo";
import { Project } from "../../core/types/project.types";
import Markdown from "markdown-to-jsx";

interface Props {
	project: Project;
}

const ProjectPage: NextPage<Props> = (props) => {
	return (
		<div>
			<Markdown
				options={{ forceBlock: true }}
				className="pb-20 prose max-w-none prose-p:my-1 prose-gray prose-h5:text-xl prose-h5:font-bold dark:prose-invert"
			>
				{props.project.content}
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
		},
		// revalidate: 1,
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

	const paths = data.projects.map((project: any) => {
		return {
			params: {
				id: project.id,
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
}

export default ProjectPage;
