import axios from "axios"
import { useMutation, useQueryClient } from "react-query"

const putModifyTitle = async (courseId: string, newTitle: string): Promise<string> => {
    const response = await axios.put(
        `/api/modifyTitle/${courseId}`, {
            newTitle: newTitle,
        })
    return response.data;
}

export function usePutModifyTitle(courseId: string, newTitle: string) {
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