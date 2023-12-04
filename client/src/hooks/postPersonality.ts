import axios from 'axios';
import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { courseState, priceState } from '../state';
import { Course, Personality } from '../types';

const postPersonality = async (personality: Personality): Promise<Course[]> => {
	const response = await axios.post(
		'/api/recommend', personality
	);
	return response.data.data;
};
export function usePostPersonality(personality: Personality) {
    const setCourse = useSetRecoilState(courseState);
    const setPrice = useSetRecoilState(priceState);
    return useMutation(() => postPersonality(personality), {
        onSuccess: (response) => {
        const newCourses: {
            items: {
                children: string;
                location: {
                    lat: number;
                    lng: number;
                },
                address: string;
                type: string;
                day: number;
                price: number;
                img: string;
            }[],
        } = {
            items: []
        };
        const newPrices: {
            title: string;
            price: number;
        }[] = [];
        response.map((item, idx) => {
            if(idx !== 0) {
                newCourses.items.push({
                    children: item.name,
                    location: {
                        lat: item.location.latitude,
                        lng: item.location.longitude,
                    },
                    address: item.address,
                    type: item.type,
                    day: item.day,
                    price: item.price,
                    img: item.image_url,
                });
                if(item.type === '음식점' || item.type === '숙소') {
                    newPrices.push({
                        title: item.name,
                        price: item.price,
                    });
                }
            }
        })
        setPrice(newPrices);
        console.log(newCourses);
        setCourse(newCourses);
    }});
}