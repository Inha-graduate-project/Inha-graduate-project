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
import { message } from "antd";
import { CourseTypes } from "../../state";

interface CourseItems {
  id?: number;
  editCourse?: CourseTypes[];
  setEditCourse?: React.Dispatch<React.SetStateAction<CourseTypes[]>>;
  isRate?: boolean;
  rate?: number;
  button?: string;
  name: string;
  address: string;
  type: string;
  day: number;
  location: {
    latitude: number;
    longitude: number;
  };
  courseId?: number;
  img?: string;
  title?: string;
  startDay?: number;
  finishDay?: number;
}
export default function CourseItems({
  id,
  editCourse,
  setEditCourse,
  isRate,
  rate,
  button,
  name,
  address,
  day,
  courseId,
  location,
  type,
  img,
  title,
  startDay,
  finishDay,
}: CourseItems) {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "성공적으로 추가되었습니다.",
    });
  };
  const handleDelete = (id: number) => {
    if (editCourse && setEditCourse) {
      const newCourse = [...editCourse];
      newCourse.splice(id, 1);
      setEditCourse(newCourse);
    }
  };
  const handleItemUp = (id: number) => {
    if (editCourse && setEditCourse) {
      const newCourse = [...editCourse];
      if (id > 0) {
        const temp = newCourse[id];
        newCourse[id] = newCourse[id - 1];
        newCourse[id - 1] = temp;
      }
      setEditCourse(newCourse);
    }
  };
  const handleItemDown = (id: number) => {
    if (editCourse && setEditCourse) {
      const newCourse = [...editCourse];
      if (id < newCourse.length - 1) {
        const temp = newCourse[id + 1];
        newCourse[id + 1] = newCourse[id];
        newCourse[id] = temp;
      }
      setEditCourse(newCourse);
    }
  };
  const handleItemPush = () => {
    if (editCourse && setEditCourse) {
      const newCourse = [...editCourse];
      newCourse.push({
        children: name,
        location: location,
        courseId: courseId,
        title: title,
        startDay: startDay,
        finishDay: finishDay,
        address: address,
        type: type,
        day: day,
        img: img as string,
        price: 0,
      });
      setEditCourse(newCourse);
      success();
    }
  };
  return (
    <>
      {contextHolder}
      <Block
        button={button as string}
        onClick={() => {
          button === "drawer" && handleItemPush();
        }}
      >
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
                <MinusSquareOutlined onClick={() => handleDelete(Number(id))} />
                <UpSquareOutlined onClick={() => handleItemUp(Number(id))} />
                <DownSquareOutlined
                  onClick={() => handleItemDown(Number(id))}
                />
              </ButtonContainer>
            ) : null}
            {isRate ? <StyledRate allowHalf disabled value={rate} /> : null}
          </ButtonSection>
          <StyledTitle level={4}>{name}</StyledTitle>
          <div>
            <EnvironmentOutlined />
            <span>{address}</span>
          </div>
        </Content>
      </Block>
    </>
  );
}
