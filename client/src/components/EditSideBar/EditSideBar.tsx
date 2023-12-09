import { Button, Modal, Tabs, Typography } from "antd";
import { useState } from "react";
import { ExclamationCircleFilled, PlusCircleOutlined } from "@ant-design/icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { courseState, dayState, userState } from "../../state";
import { CourseItems } from "../CourseItems";
import { useNavigate } from "react-router-dom";
import {
  Container,
  StyledDrawer,
  TitleContainer,
} from "../CourseSideBar/styles";
import { StyledButton } from "./styles";
import { useGetSavedCourseById } from "../../hooks";

interface CourseSideBarProps {
  city: string;
  title: string;
  startDay: number;
  finishDay: number;
}
export default function CourseSideBar({
  city,
  title,
  startDay,
  finishDay,
}: CourseSideBarProps) {
  const { Title } = Typography;
  const course = useRecoilValue(courseState);
  const user = useRecoilValue(userState);
  const setDay = useSetRecoilState(dayState);
  const day = useRecoilValue(dayState);
  const travelDay = user.travel_day;
  const { confirm } = Modal;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetSavedCourseById(city);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const tabItems = ["여행지", "음식점", "숙소"];
  const [tab, setTab] = useState("여행지");
  const showConfirm = () => {
    confirm({
      title: "저장이 완료되었습니다.",
      icon: <ExclamationCircleFilled />,
      content: "마이페이지로 이동하시겠습니까?",
      onOk() {
        navigate("/mypage");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const [editCourse, setEditCourse] = useState(
    course.filter((item) => {
      return item.day === day;
    })
  );
  const filteredData = data?.filter((item) => {
    return item.type === tab;
  });
  return (
    <>
      <Container width={400}>
        <TitleContainer>
          <div>
            <Title level={4} style={{ margin: "0px" }}>
              {title}
            </Title>
            <span>
              {String(startDay).replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")}{" "}
              ~{" "}
              {String(finishDay).replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")}
            </span>
          </div>
          <Button type="primary" onClick={showConfirm}>
            저장하기
          </Button>
        </TitleContainer>
        <Tabs
          defaultActiveKey="1"
          centered
          onChange={(activeKey) => {
            setDay(Number(activeKey));
            setEditCourse(
              course.filter((item) => {
                return item.day === Number(activeKey);
              })
            );
          }}
          items={new Array(travelDay).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
              label: `Day ${id}`,
              key: id,
              children: (
                <StyledButton onClick={showDrawer}>
                  <PlusCircleOutlined />
                  새로운 장소
                </StyledButton>
              ),
            };
          })}
        />
        {editCourse.map((item, idx) => {
          return (
            <CourseItems
              id={idx}
              editCourse={editCourse}
              setEditCourse={setEditCourse}
              button="edit"
              title={item.children}
              address={item.address}
              type={item.type}
              day={day}
              location={item.location}
              img={item.img}
            />
          );
        })}
      </Container>
      <StyledDrawer
        title="새로운 장소 추가"
        placement="left"
        onClose={onClose}
        open={open}
        width={400}
      >
        <Tabs
          defaultActiveKey="1"
          centered
          onChange={(activeKey) => {
            setTab(activeKey);
          }}
          items={tabItems.map((item) => {
            return {
              label: item,
              key: item,
            };
          })}
        />
        {isLoading ? (
          <>Loading...</>
        ) : (
          filteredData?.map((item) => {
            return (
              <CourseItems
                editCourse={editCourse}
                setEditCourse={setEditCourse}
                button="rate"
                isRate={true}
                rate={item.rating}
                title={item.name}
                address={item.address}
                type={item.type}
                day={day}
                location={item.location}
                img={item.image_url}
              />
            );
          })
        )}
      </StyledDrawer>
    </>
  );
}
