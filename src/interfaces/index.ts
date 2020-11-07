export interface CurriculumProps {
	curriculums: {
		id: string;
		title: string;
    content: string;
    students?: {id: string; name: string}[];
		teacher: { id: string; name: string }[];
	}[];
}