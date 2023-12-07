import {
  Block,
  ButtonContainer,
  ButtonSection,
  Content,
  ImageContainer,
  StyledRate,
  StyledTitle,
} from "./styles";
import {
  DownSquareOutlined,
  EnvironmentOutlined,
  FileImageOutlined,
  MinusSquareOutlined,
  UpSquareOutlined,
} from "@ant-design/icons";

interface CourseItems {
  isRate?: boolean;
  rate?: number;
  button?: string;
  title: string;
  address: string;
  type: string;
  img?: string;
}
export default function CourseItems({
  isRate,
  rate,
  button,
  title,
  address,
  type,
  img,
}: CourseItems) {
  return (
    <Block>
      <ImageContainer>
        {img ? (
          <img
            src={img}
            style={{ width: "160px", height: "100px", objectFit: "cover" }}
          />
        ) : (
          <FileImageOutlined width={24} />
        )}
      </ImageContainer>
      <Content>
        <ButtonSection button={button as string}>
          <span>{type}</span>
          {button === "edit" ? (
            <ButtonContainer>
              <MinusSquareOutlined />
              <UpSquareOutlined />
              <DownSquareOutlined />
            </ButtonContainer>
          ) : null}
          {isRate ? <StyledRate allowHalf disabled value={rate} /> : null}
        </ButtonSection>
        <StyledTitle level={4}>{title}</StyledTitle>
        <div>
          <EnvironmentOutlined />
          <span>{address}</span>
        </div>
      </Content>
    </Block>
  );
}
