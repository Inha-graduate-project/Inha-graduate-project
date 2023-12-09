import axios from 'axios';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { courseState, CourseTypes } from '../state';
import { Course } from '../types';

const getCourse = async (courseId: number): Promise<{city: string, data: Course[]}> => {
	const response = await axios.get(
		`/api/readCourse/${courseId}`
	);
	return response.data;
};
export function useGetCourse(courseId: number) {
	const setCourse = useSetRecoilState(courseState);
	
	return useQuery("get-course", () => getCourse(courseId), {
		onSuccess: (response) => {
			const newCourse: CourseTypes[] = [];
				response.data.map((item: Course, idx: number) => {
					if (idx !== 0) {
					newCourse.push({
						children: item.name,
						location: {
							lat: item.location.latitude,
							lng: item.location.longitude,
						},
						address: item.address,
						type: item.type,
						day: item.day,
						img: item.image_url,
						price: item.price,
					});
				}
			});
			setCourse(newCourse);
		}
	});
}