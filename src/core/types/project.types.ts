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
export type LocalizedProject = Project & {
	localizations: Localization[];
};

export type Localization = {
	locale: string;
	description: string;
	content: string;
};

/**
 * Project that has localizations.
 */
export type ProjectWithLocales = Project & {
	localizations: Project[];
};
