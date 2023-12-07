import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Divider, Typography } from "antd";
import { useGetSavedCourses } from "../../hooks";
import { Block } from "../LandingPage/styles";
import { CardContainer, CardLabel, CardTitle, ContentBox } from "./styles";

export default function Mypage() {
  const { Title } = Typography;
  const { Meta } = Card;
  const { data, isLoading } = useGetSavedCourses();
  const userId = localStorage.getItem("user_id");
  return (
    <Block>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <ContentBox>
          <UserOutlined style={{ fontSize: "40px" }} />
          <Title level={4}>{userId}님의 마이페이지</Title>
          <CardContainer>
            <Divider />
            {data?.map((item) => {
              return (
                <Card
                  hoverable
                  style={{ width: 210 }}
                  cover={
                    <img
                      alt="example"
                      style={{ height: "114px" }}
                      src="/src/img/destination_1.jpg"
                    />
                  }
                >
                  <Meta
                    title={
                      <CardTitle>
                        <span>{item.title}</span>
                        <EditOutlined
                          style={{ fontSize: "12px", color: "#8c8c8c" }}
                        />
                        <CardLabel>D-DAY</CardLabel>
                      </CardTitle>
                    }
                    description="2023-12-06 ~ 2023-12-08"
                  />
                </Card>
              );
            })}
          </CardContainer>
        </ContentBox>
      )}
    </Block>
  );
}
