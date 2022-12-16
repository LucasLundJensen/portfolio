export type ProjectThumbnail = {
	id: string;
	url: string;
	width: number;
	height: number;
};

/**
 * Base layout for a project, not including potential localizations.
 */
export type Project = {
	content: string;
	createdAt: string;
	description: string;
	id: string;
	publishedAt: string;
	thumbnail: ProjectThumbnail;
	title: string;
	locale: string;
};

export type ProjectCard = {
	id: string;
	locale: string;
	createdAt: string;
	description: string;
	title: string;
	updatedAt: string;
	content: string;
	thumbnail: ProjectThumbnail;
	localizations: LocalizedProject[];
};

/**
 * Structure of a project that has been localized, only contains the fields that are localized.
 */
export type LocalizedProject = {
	content: {
		markdown: string;
	};
	description: string;
	locale: string;
};

/**
 * Project that has localizations.
 */
export type ProjectWithLocales = Project & {
	localizations: Project[];
};
