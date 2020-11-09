export interface CurriculumProps {
	curriculums: {
		id: string;
		title: string;
		content: string;
		students?: { id: string; name: string }[];
		teacher: { id: string; name: string }[];
	}[];
}

export interface ProfileProps {
	user: UserState[] | UserState;
}

export type UserState = {
	id?: string;
	name?: string;
	avatar: string;
	nickname?: string;
	email?: string;
};
