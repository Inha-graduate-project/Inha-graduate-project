import axios from 'axios';
import { useQuery } from 'react-query';
import { Routes } from '../types';

const getRoutes = async (userId: number): Promise<Routes[]> => {
	const response = await axios.get(
		`/api/readRoute/${userId}`
	);
	return response.data.data;
};
export function useGetRoutes(userId: number) {
	return useQuery("get-routes", () => getRoutes(userId));
}