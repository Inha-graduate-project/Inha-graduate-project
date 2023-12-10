import {
  Button,
  Divider,
  Modal,
  Popover,
  Tabs,
  Timeline,
  Typography,
} from "antd";
import { useState } from "react";
import {
  ExclamationCircleOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  courseState,
  dayState,
  priceState,
  travelState,
  userState,
} from "../../state";
import { CourseItems } from "../CourseItems";
import {
  Container,
  DrawerContainer,
  PriceContainer,
  StyledButton,
  StyledDrawer,
  TitleContainer,
} from "./styles";
import { useNavigate } from "react-router-dom";

export default function CourseSideBar() {
  const { Title } = Typography;
  const course = useRecoilValue(courseState);
  const travel = useRecoilValue(travelState);
  const price = useRecoilValue(priceState);
  const user = useRecoilValue(userState);
  const setDay = useSetRecoilState(dayState);
  const day = useRecoilValue(dayState);
  const travelDay = user.travel_day;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const { confirm } = Modal;
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
  const filteredCourse = course.filter((item) => {
    return item.day === day;
  });
  const filteredPrice = price.items.filter((item) => {
    return item.day === day;
  });
  const totalPrice = filteredPrice.reduce((acc, cur) => acc + cur.price, 0);
  const popover =
    "가장 상위에 검색된 메뉴/객실의 가격을 바탕으로 계산되었으며, 정확한 수치가 아닐 수 있으니 참고용으로 이용 바랍니다.";
  return (
    <>
      <Container width={400}>
        <TitleContainer>
          <Title level={4}>{travel}의 추천 여행 코스입니다. </Title>
          <Button
            type="primary"
            onClick={showConfirm}
            style={{ marginTop: "1rem" }}
          >
            저장하기
          </Button>
        </TitleContainer>
        <Tabs
          defaultActiveKey="1"
          centered
          onChange={(activeKey) => setDay(Number(activeKey))}
          items={new Array(travelDay).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
              label: `Day ${id}`,
              key: id,
              children: <Timeline items={filteredCourse} mode="alternate" />,
            };
          })}
        />
        <Divider style={{ marginTop: "-30px" }} />
        <PriceContainer>
          <strong>예상 경비</strong>
          <Popover content={popover} trigger="hover">
            <ExclamationCircleOutlined />
          </Popover>
        </PriceContainer>
        <PriceContainer>
          <ul style={{ paddingLeft: "24px" }}>
            <li>
              택시 요금 포함 : {(totalPrice + price.taxi).toLocaleString()}원
            </li>
            <li>택시 요금 미포함 : {totalPrice.toLocaleString()}원</li>
          </ul>
          <StyledButton type="primary" onClick={showDrawer}>
            상세보기
          </StyledButton>
        </PriceContainer>
        <>
          {filteredCourse.map((item) => {
            return (
              <CourseItems
                name={item.children}
                address={item.address}
                type={item.type}
                img={item.img}
                day={item.day}
                location={item.location}
              />
            );
          })}
        </>
      </Container>

      <StyledDrawer
        title="예상 경비 상세"
        placement="left"
        onClose={onClose}
        open={open}
        width={400}
      >
        <Title level={5} style={{ marginTop: "0px" }}>
          택시
        </Title>
        <div style={{ marginBottom: "8px" }}>
          총 이동 거리 : {(price.distance / 1000).toFixed(2)}km
        </div>
        <div>요금 : {price.taxi.toLocaleString()}원</div>
        {filteredPrice.map((item) => {
          return (
            <DrawerContainer>
              <Title level={5}>{item.title}</Title>
              <img
                src={item.img}
                style={{ width: "300px", height: "300px", objectFit: "cover" }}
              ></img>
              {item.type === "음식점" && <span>메뉴명 : {item.foodName}</span>}
              <span>가격 : {item.price.toLocaleString()}원</span>
            </DrawerContainer>
          );
        })}
      </StyledDrawer>
    </>
  );
}
