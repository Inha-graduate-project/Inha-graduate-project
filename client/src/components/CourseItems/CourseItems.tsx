import { Block, Content, StyledTitle } from "./styles";
import { EnvironmentOutlined } from "@ant-design/icons";

interface CourseItems {
  title: string;
  address: string;
  type: string;
  img?: string;
}
export default function CourseItems({
  title,
  address,
  type,
  img,
}: CourseItems) {
  return (
    <Block>
      <img src={img} style={{ width: "160px" }} />
      <Content>
        <span>{type}</span>
        <StyledTitle level={4}>{title}</StyledTitle>
        <div>
          <EnvironmentOutlined />
          <span>{address}</span>
        </div>
      </Content>
    </Block>
  );
}
