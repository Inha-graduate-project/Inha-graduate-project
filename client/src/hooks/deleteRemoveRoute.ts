import axios from "axios"
import { useMutation, useQueryClient } from "react-query"

const deleteRemoveRoute = async (courseId: number): Promise<string> => {
    const response = await axios.delete(
        `/api/removeRoute/${courseId}`)
    return response.data;
}

export function useDeleteRemoveRoute() {
    const queryClient = useQueryClient();
    return useMutation((courseId: number) => deleteRemoveRoute(courseId), {
       onSuccess: () => {
        queryClient.invalidateQueries("get-saved-courses");
       },
       onError: (error) => {
           console.log(error);
       }
    })
}