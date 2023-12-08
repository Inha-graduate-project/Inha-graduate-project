import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Divider, Input, Typography } from "antd";
import { useState } from "react";
import { CardEditComponent } from "../../components";
import { useGetSavedCourses } from "../../hooks";
import { Block } from "../LandingPage/styles";
import { CardContainer, ContentBox } from "./styles";

export default function Mypage() {
  const { Title } = Typography;
  const { Meta } = Card;
  const { data, isLoading } = useGetSavedCourses();
  const userId = localStorage.getItem("user_id");
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
                    hoverable
                    style={{ width: 210 }}
                    cover={
                      <img
                        alt="example"
                        style={{ height: "114px" }}
                        src={item.data[1].route_imageUrl}
                      />
                    }
                  >
                    <CardEditComponent
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
