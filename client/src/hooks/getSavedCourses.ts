import axios from 'axios';
import { useQuery } from 'react-query';
import { Course } from '../types';

const getSavedCourses = async (): Promise<{course_id: string, data: Course[], title: string}[]> => {
	const userId = Number(JSON.parse(window.localStorage.getItem("user_id") as string));
	const response = await axios.get(
		`/api/readRoute/${userId}`
	);
	return response.data;
};
export function useGetSavedCourses() {
	return useQuery("get-saved-courses", () => getSavedCourses());
}