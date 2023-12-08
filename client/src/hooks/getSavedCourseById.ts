import axios from 'axios';
import { useQuery } from 'react-query';
import { Travel } from '../types';

const getSavedCourseById = async (location: string): Promise<Travel[]> => {
	const response = await axios.get(
		`/api/readEdit/${location}`
	);
	return response.data;
};
export function useGetSavedCourseById(location: string) {
	return useQuery("get-saved-course-by-id", () => getSavedCourseById(location));
}