import axios from 'axios';
import { useQuery } from 'react-query';
import { Course } from '../types';

const getCourse = async (courseId: number): Promise<{city: string, data: Course[]}> => {
	const response = await axios.get(
		`/api/readCourse/${courseId}`
	);
	return response.data;
};
export function useGetCourse(courseId: number) {
	return useQuery(["get-course", courseId] , ({ queryKey }) => getCourse(queryKey[1] as number));
}