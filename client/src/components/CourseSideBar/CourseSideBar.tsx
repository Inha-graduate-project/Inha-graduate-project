import { Button, Divider, Tabs, Timeline, Typography } from "antd";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { courseState, priceState, travelState, userState } from "../../state";
import { CourseItems } from "../CourseItems";
import { Container, StyledDrawer } from "./styles";

export default function CourseSideBar() {
  const { Title } = Typography;
  const course = useRecoilValue(courseState).items;
  const travel = useRecoilValue(travelState);
  const price = useRecoilValue(priceState);
  const user = useRecoilValue(userState);
  const day = user.travel_day;
  const totalPrice = price.reduce((acc, cur) => acc + cur.price, 0);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Container width={400}>
        <Title level={4}>{travel}의 추천 여행 코스입니다.</Title>
        <Tabs
          defaultActiveKey="1"
          centered
          items={new Array(day).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
              label: `Day ${id}`,
              key: id,
              children: <Timeline items={course} mode="alternate" />,
            };
          })}
        />
        <Divider style={{ marginTop: "-30px" }} />
        <span>예상 경비 : {totalPrice}원</span>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
        <>
          {course.map((item) => {
            return (
              <CourseItems
                title={item.children}
                address={item.address}
                type={item.type}
                img={
                  "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20150831_76%2F1441025139566jlxeJ_JPEG%2F126362588156648_0.jpg"
                }
              />
            );
          })}
        </>
      </Container>

      <StyledDrawer
        title="Basic Drawer"
        placement="left"
        onClose={onClose}
        open={open}
        width={400}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </StyledDrawer>
    </>
  );
}
