import { Divider, Tabs, Timeline, Typography } from "antd";
import { CourseItems } from "../CourseItems";
import { Container } from "./styles";
export default function CourseSideBar() {
  const { Title } = Typography;
  const course = [
    {
      children: "쇠소깍",
      address: "제주 서귀포시 쇠소깍로 104",
      type: "관광지",
      img: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20150831_76%2F1441025139566jlxeJ_JPEG%2F126362588156648_0.jpg",
    },
    {
      children: "소원김밥",
      color: "green",
      address: "제주 서귀포시 쇠소깍로 160",
      type: "음식점",
      img: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211030_126%2F1635598065959ggueq_JPEG%2FUeGXwY6WAkuszDAMRwbjV0D5.jpg",
    },
    {
      children: "용머리해안",
      address: "제주 서귀포시 안덕면 사계리",
      type: "관광지",
      img: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20150831_76%2F1441025139566jlxeJ_JPEG%2F126362588156648_0.jpg",
    },
    {
      children: "올레마당",
      color: "green",
      address: "제주 서귀포시 안덕면 사계남로 224",
      type: "음식점",
      img: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211030_126%2F1635598065959ggueq_JPEG%2FUeGXwY6WAkuszDAMRwbjV0D5.jpg",
    },
    {
      children: "헬로키티아일랜드",
      address: "제주 서귀포시 안덕면 한창로",
      type: "관광지",
      img: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20150831_76%2F1441025139566jlxeJ_JPEG%2F126362588156648_0.jpg",
    },
    {
      children: "춘심이네 본점",
      color: "green",
      address: "제주 서귀포시 안덕면 창천중앙로",
      type: "음식점",
      img: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211030_126%2F1635598065959ggueq_JPEG%2FUeGXwY6WAkuszDAMRwbjV0D5.jpg",
    },
    {
      children: "금능해수욕장",
      address: "제주 제주시 한림읍 금능리",
      type: "관광지",
      img: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20150831_76%2F1441025139566jlxeJ_JPEG%2F126362588156648_0.jpg",
    },
  ];
  return (
    <Container width={400}>
      <Title level={4}>제주도의 추천 여행 코스입니다.</Title>
      <Tabs
        defaultActiveKey="1"
        centered
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Day ${id}`,
            key: id,
            children: <Timeline items={course} mode="alternate" />,
          };
        })}
      />
      <Divider style={{ marginTop: "-30px" }} />
      <>
        {course.map((item) => {
          return (
            <CourseItems
              title={item.children}
              address={item.address}
              type={item.type}
              img={item.img}
            />
          );
        })}
      </>
    </Container>
  );
}
