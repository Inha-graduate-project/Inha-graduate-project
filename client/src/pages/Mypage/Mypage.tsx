import {
  ArrowLeftOutlined,
  CloseCircleOutlined,
  ExclamationCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Divider, Modal, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardEditComponent } from "../../components";
import { useDeleteRemoveRoute, useGetSavedCourses } from "../../hooks";
import { Block } from "../LandingPage/styles";
import {
  CardContainer,
  ContentBox,
  StyledCard,
  StyledCloseCircleOutlined,
  StyledImg,
} from "./styles";

export default function Mypage() {
  const { Title } = Typography;
  const { data, isLoading } = useGetSavedCourses();
  const { mutate } = useDeleteRemoveRoute();
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const handleNavigate = (
    courseId: number,
    title: string,
    startDay: string,
    finishDay: string
  ) => {
    if (!isEdit && !isConfirm) {
      navigate("/edit", {
        state: {
          courseId: courseId,
          title: title,
          startDay: startDay,
          finishDay: finishDay,
        },
      });
    }
  };
  const { confirm } = Modal;
  const showConfirm = (courseId: number) => {
    confirm({
      title: "해당 코스를 삭제하시겠습니까?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        handleDelete(courseId);
      },
      onCancel() {
        setIsConfirm(false);
        console.log("Cancel");
      },
    });
  };
  const handleDelete = (courseId: number) => {
    mutate(courseId);
  };
  const [isEdit, setIsEdit] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <Block style={{ gap: "8px" }}>
          <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <ArrowLeftOutlined style={{ margin: "8px 4px 0 0" }} />
            <span>처음으로</span>
          </div>
          <ContentBox>
            <UserOutlined style={{ fontSize: "40px" }} />
            <Title level={4}>{userId}님의 마이페이지</Title>
            <CardContainer>
              <Divider />
              {data?.map((item, idx) => {
                return (
                  <StyledCard
                    hoverable
                    style={{ width: 210 }}
                    title={
                      <>
                        <StyledImg
                          alt="example"
                          onClick={() => {
                            handleNavigate(
                              item.course_id,
                              item.title,
                              item.start_day,
                              item.finish_day
                            );
                          }}
                          src={
                            item.data[0].name.includes("터미널")
                              ? item.data[1].image_url
                              : item.data[0].image_url
                          }
                        />
                      </>
                    }
                    extra={[
                      <StyledCloseCircleOutlined
                        onClick={() => {
                          setIsConfirm(true);
                          showConfirm(data[idx].course_id);
                        }}
                      />,
                    ]}
                  >
                    <CardEditComponent
                      isEdit={isEdit}
                      setIsEdit={setIsEdit}
                      id={item.course_id}
                      title={item.title}
                      startDay={item.start_day}
                      finishDay={item.finish_day}
                    />
                  </StyledCard>
                );
              })}
            </CardContainer>
          </ContentBox>
        </Block>
      )}
    </>
  );
}
