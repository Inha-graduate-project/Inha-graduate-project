import { UserOutlined } from "@ant-design/icons";
import { Card, Divider, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardEditComponent } from "../../components";
import { useGetSavedCourses } from "../../hooks";
import { Block } from "../LandingPage/styles";
import { CardContainer, ContentBox } from "./styles";

export default function Mypage() {
  const { Title } = Typography;
  const { data, isLoading } = useGetSavedCourses();
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const handleNavigate = (
    courseId: number,
    title: string,
    startDay: string,
    finishDay: string
  ) => {
    navigate("/edit", {
      state: {
        courseId: courseId,
        title: title,
        startDay: startDay,
        finishDay: finishDay,
      },
    });
  };
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <Block>
          <ContentBox>
            <UserOutlined style={{ fontSize: "40px" }} />
            <Title level={4}>{userId}님의 마이페이지</Title>
            <CardContainer>
              <Divider />
              {data?.map((item) => {
                return (
                  <Card
                    onClick={() => {
                      if (!isEdit) {
                        handleNavigate(
                          item.course_id,
                          item.title,
                          item.start_day,
                          item.finish_day
                        );
                      }
                    }}
                    hoverable
                    style={{ width: 210 }}
                    cover={
                      <img
                        alt="example"
                        style={{ height: "114px" }}
                        src={item.data[1].image_url}
                      />
                    }
                  >
                    <CardEditComponent
                      isEdit={isEdit}
                      setIsEdit={setIsEdit}
                      id={item.course_id}
                      title={item.title}
                      startDay={item.start_day}
                      finishDay={item.finish_day}
                    />
                  </Card>
                );
              })}
            </CardContainer>
          </ContentBox>
        </Block>
      )}
    </>
  );
}
