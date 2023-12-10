import axios from 'axios';
import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { courseState, CourseTypes, priceState } from '../state';
import { Course, Personality } from '../types';

const postPersonality = async (personality: Personality): Promise<{data: Course[], user_id: number}> => {
    const userId = Number(JSON.parse(window.localStorage.getItem("user_id") as string));
    let url = '';
    if(userId) {
        url = `/api/reRecommend/${Number(userId)}`;
    }
    else {
        url = '/api/firstRecommend';
    }
	const response = await axios.post(
		url, personality
	);
	return response.data;
};
export function usePostPersonality(personality: Personality) {
    const setCourse = useSetRecoilState(courseState);
    const setPrice = useSetRecoilState(priceState);
    const storage = window.localStorage;
    return useMutation(() => postPersonality(personality), {
        onSuccess: (response) => {
        const newCourses: CourseTypes[] = [];
        const newPrices: {
            items: {
                title: string;
                price: number;
                img: string;
                day: number;
                type: string;
                foodName: string;
            }[];
        } = {
            items: []
        };
        storage.setItem("user_id", JSON.stringify(response.user_id));
        response.data.map((item, idx) => {
            if(idx !== 0) {
                newCourses.push({
                    children: item.name,
                    location: item.location,
                    address: item.address,
                    type: item.type,
                    day: item.day,
                    price: item.price,
                    img: item.image_url,
                });
                if(item.type === '음식점' || item.type === '숙소') {
                    newPrices.items.push({
                        foodName: item.food_name ?? '알수없음',
                        title: item.name,
                        price: item.price ?? 12000,
                        day: item.day,
                        type: item.type,
                        img: item.food_imageUrl ?? item.image_url,
                    });
                }
            }
        })
        setCourse(newCourses);
        setPrice({...newPrices, taxi: 0, distance: 0,});
    }});
}