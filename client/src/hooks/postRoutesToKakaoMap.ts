import axios from 'axios';
import { useMutation } from 'react-query';
import { Coordinate, Routes } from '../types';

const postRoutesToKaKaoMap = async (origin: Coordinate | undefined, destination: Coordinate | undefined, waypoint: (Coordinate | undefined)[]): Promise<Routes> => {
	const response = await axios.post(
		'https://apis-navi.kakaomobility.com/v1/waypoints/directions', {
            origin: origin,
            destination: destination,
            waypoint: waypoint,
        }, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
        }});
	return response.data;
};
export function usePostRoutesToKaKaoMap(origin: Coordinate | undefined, destination: Coordinate | undefined, waypoint: (Coordinate | undefined)[]) {
    return useMutation(() => postRoutesToKaKaoMap(origin, destination, waypoint), {
        onSuccess: (response) => {
        console.log(response);
    }});
}