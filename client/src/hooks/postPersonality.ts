import axios from 'axios';
import { useMutation } from 'react-query';
import { Personality } from '../types';

const postPersonality = async (personality: Personality): Promise<Personality> => {
	const response = await axios.post(
		'/api/savePersonality', personality
	);
	return response.data;
};
export function usePostPersonality(personality: Personality) {
    const storage = window.localStorage;
    return useMutation(() => postPersonality(personality), {
        onSuccess: (response) => {
        storage.setItem("userId", response.user_id.toString());
    }});
}