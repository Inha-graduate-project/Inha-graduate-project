import axios from "axios"
import { useMutation, useQueryClient } from "react-query"

const putModifyTitle = async (courseId: number, newTitle: string): Promise<string> => {
    const response = await axios.put(
        `/api/modifyTitle/${courseId}`, {
            newTitle: newTitle,
        })
    return response.data;
}

export function usePutModifyTitle(courseId: number, newTitle: string) {
    const queryClient = useQueryClient();
    return useMutation(() => putModifyTitle(courseId, newTitle), {
       onSuccess: () => {
        queryClient.invalidateQueries("get-saved-courses");
       },
       onError: (error) => {
           console.log(error);
       }
    })
}