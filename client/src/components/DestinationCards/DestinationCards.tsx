import { Block } from "./styles";
import { NoMarginTitle } from "../DestinationPicker/styles";
import { CardComponent } from "../CardComponent";
import { useRef, useState } from "react";
type DestinationCardsType = {
  themeRef: React.MutableRefObject<number[]>;
};
export default function DestinationCards({ themeRef }: DestinationCardsType) {
  const destination = [
    "산",
    "바다",
    "역사/문화",
    "체험",
    "건축/조형물",
    "카페",
  ];
  const [, setSelected] = useState([0, 0, 0, 0, 0, 0]);
  const count = useRef(1);
  return (
    <Block>
      <NoMarginTitle>선호하는 여행테마를 선택해 주세요.</NoMarginTitle>
      {destination.map((item, idx) => (
        <CardComponent
          title={item}
          src={`/src/img/destination_${idx}.jpg`}
          setSelected={setSelected}
          idx={idx}
          selectedRef={themeRef}
          count={count}
        />
      ))}
    </Block>
  );
}
