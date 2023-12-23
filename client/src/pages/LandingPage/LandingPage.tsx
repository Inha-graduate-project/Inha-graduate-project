import {
  DestinationPicker,
  StepsComponent,
  SchedulePicker,
  DestinationCards,
  AccommodationCards,
  FoodCards,
} from "../../components";
import { Block, ButtonContainer, ContentBox, StyledButton } from "./styles";
import { useRef, useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export default function LandingPage() {
  const [page, setPage] = useState(0);
  const [steps, setSteps] = useState(0);
  const dayRef = useRef<number>(0);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const error = (content: string) => {
    messageApi.open({
      type: "error",
      content: content,
    });
  };
  const handlePrev = () => {
    setPage((page) => page - 1);
    if (steps === 1 || steps === 2) {
      if (page < 3) setSteps((steps) => steps - 1);
    }
    if (page === 4 && dayRef.current <= 1) {
      setPage((page) => page - 1);
    }
    isError.current = true;
  };
  const handleNext = () => {
    if (isError.current) {
      switch (page) {
        case 0: {
          error("지역을 선택해주세요.");
          break;
        }
        case 1: {
          error("일정을 선택해주세요.");
          break;
        }
        case 2: {
          error("여행테마를 선택해주세요.");
          break;
        }
        case 3: {
          error("숙소를 선택해주세요.");
          break;
        }
        case 4: {
          error("음식메뉴를 선택해주세요.");
          break;
        }
        default: {
          error("잘못된 접근입니다.");
        }
      }
    } else {
      setPage((page) => page + 1);
      isError.current = true;
      if (steps === 0 || steps === 1) {
        setSteps((steps) => steps + 1);
      }
      if (page === 2 && dayRef.current <= 1) {
        setPage((page) => page + 1);
      }
      if (page >= 4) navigate("/course");
    }
  };
  const isError = useRef(true);
  const items = [
    () => page === 0 && <DestinationPicker isError={isError} />,
    () => page === 1 && <SchedulePicker isError={isError} dayRef={dayRef} />,
    () => page === 2 && <DestinationCards isError={isError} />,
    () => page === 3 && <AccommodationCards isError={isError} />,
    () => page === 4 && <FoodCards isError={isError} />,
    () =>
      page === 0 ? (
        <StyledButton
          onClick={handleNext}
          type="primary"
          style={{ margin: "60px auto", marginBottom: "0px" }}
        >
          다음
        </StyledButton>
      ) : (
        <ButtonContainer>
          <StyledButton onClick={handlePrev}>이전</StyledButton>
          <StyledButton onClick={handleNext} type="primary">
            다음
          </StyledButton>
        </ButtonContainer>
      ),
  ];

  const duration = 300;
  const translateY = 4;

  const transition = useTransition(items, {
    from: { opacity: 0, transform: `translateY(${translateY}px)` },
    enter: { opacity: 1, transform: `translateY(0)` },
    config: { duration: duration },
  });

  return (
    <>
      {contextHolder}
      <Block>
        <img
          style={{ width: "200px", margin: "-50px auto" }}
          src="./img/Logo.png"
        ></img>
        <StepsComponent current={steps} />
        <ContentBox>
          {transition((styles, item) => (
            <animated.div style={styles}>{item()}</animated.div>
          ))}
        </ContentBox>
      </Block>
    </>
  );
}
