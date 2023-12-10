import axios from "axios"
import { useMutation, useQueryClient } from "react-query"
import { CourseTypes } from "../state";

const putModifyRoute = async (course: CourseTypes[]): Promise<string> => {
    const userId = Number(JSON.parse(window.localStorage.getItem("user_id") as string));
    const response = await axios.put(
        `/api/modifyRoute/${userId}`, course)
    return response.data;
}

export function usePutModifyRoute() {
    const queryClient = useQueryClient();
    return useMutation((course: CourseTypes[]) => putModifyRoute(course), {
       onSuccess: () => {
        queryClient.invalidateQueries("get-course");
       },
       onError: (error) => {
           console.log(error);
       }
    })
}