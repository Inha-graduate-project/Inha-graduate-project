import { Modal } from "antd";
import axios from "axios"
import { useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom";
import { CourseTypes } from "../state";

const putModifyRoute = async (course: CourseTypes[]): Promise<string> => {
    const userId = Number(JSON.parse(window.localStorage.getItem("user_id") as string));
    const response = await axios.put(
        `/api/modifyRoute/${userId}`, course)
    return response.data;
}

export function usePutModifyRoute() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { confirm } = Modal;
    const showConfirm = () => {
        confirm({
          title: "저장이 완료되었습니다.",
          content: "마이페이지로 이동하시겠습니까?",
          onOk() {
            navigate("/mypage");
          },
          onCancel() {
            console.log("Cancel");
          },
        });
      };
    return useMutation((course: CourseTypes[]) => putModifyRoute(course), {
       onSuccess: () => {
        queryClient.invalidateQueries("get-course");
        showConfirm();
       },
       onError: (error) => {
           console.log(error);
       }
    })
}