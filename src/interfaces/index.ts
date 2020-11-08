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
	user: {
		[key: string]: string;
	}
}

export type UserState = {
	id?: string;
	name: string;
	avatar: string;
}

export interface ActionTypes {
  type: string;
  payload?: UserState;
}
