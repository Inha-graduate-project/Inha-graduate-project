import {
  DestinationPicker,
  StepsComponent,
  SchedulePicker,
  DestinationCards,
  AccommodationCards,
  FoodCards,
} from "../../components";
import { Block, ContentBox, NextButton } from "./styles";
import { useRef, useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import { useNavigate } from "react-router-dom";
import { usePostPersonality } from "../../hooks";

export default function LandingPage() {
  const [page, setPage] = useState(0);
  const [steps, setSteps] = useState(0);
  const destinationRef = useRef<string>("");
  const dateRef = useRef<string[]>([]);
  const themeRef = useRef<number[]>([0, 0, 0, 0, 0, 0]);
  const accommodationRef = useRef<number[]>([0, 0, 0]);
  const foodRef = useRef<number[]>([0, 0, 0, 0, 0, 0]);

  const navigate = useNavigate();
  const [start_day, finish_day] = dateRef.current;
  const travel_day = Number(finish_day) - Number(start_day) + 1;
  const [
    rank_mountain,
    rank_sea,
    rank_historicalTheme,
    rank_experienceTheme,
    rank_buildingTheme,
    rank_cafe,
  ] = themeRef.current;

  const [
    rank_koreanfood,
    rank_japanesefood,
    rank_chinesefood,
    rank_westernfood,
    rank_fastfood,
    rank_meat,
  ] = foodRef.current;
  const [rank_hotel, rank_motel, rank_pension] = accommodationRef.current;

  const { mutate, isLoading } = usePostPersonality({
    travel_destination: destinationRef.current,
    start_day,
    finish_day,
    travel_day,
    rank_mountain,
    rank_sea,
    rank_historicalTheme,
    rank_experienceTheme,
    rank_buildingTheme,
    rank_cafe,
    rank_koreanfood,
    rank_japanesefood,
    rank_chinesefood,
    rank_westernfood,
    rank_fastfood,
    rank_meat,
    rank_hotel,
    rank_motel,
    rank_pension,
  });
  const items = [
    () => page === 0 && <DestinationPicker destinationRef={destinationRef} />,
    () => page === 1 && <SchedulePicker dateRef={dateRef} />,
    () => page === 2 && <DestinationCards themeRef={themeRef} />,
    () =>
      page === 3 && <AccommodationCards accommodationRef={accommodationRef} />,
    () => page === 4 && <FoodCards foodRef={foodRef} />,
    () => (
      <NextButton
        onClick={() => {
          setPage((page) => page + 1);
          if (steps === 0 || steps === 1) {
            setSteps((steps) => steps + 1);
          }
          if (page >= 4) {
            mutate();
            if (!isLoading) navigate("/course");
          }
        }}
        type="primary"
      >
        다음
      </NextButton>
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
    <Block>
      <StepsComponent current={steps} />
      <ContentBox>
        {transition((styles, item) => (
          <animated.div style={styles}>{item()}</animated.div>
        ))}
      </ContentBox>
    </Block>
  );
}
