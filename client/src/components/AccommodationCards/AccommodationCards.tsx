import { NoMarginTitle } from "../DestinationPicker/styles";
import { CardComponent } from "../CardComponent";
import { Block } from "../DestinationCards/styles";
import { useRef, useState } from "react";
type AccommodationCardsType = {
  accommodationRef: React.MutableRefObject<number[]>;
};
export default function AccommodationCards({
  accommodationRef,
}: AccommodationCardsType) {
  const accommodation = ["호텔", "펜션", "모텔"];
  const [, setSelected] = useState([0, 0, 0]);
  const count = useRef(1);
  return (
    <Block>
      <NoMarginTitle>선호하는 숙박시설을 선택해 주세요.</NoMarginTitle>
      {accommodation.map((item, idx) => (
        <CardComponent
          title={item}
          src={`/src/img/accommodation_${idx}.jpg`}
          setSelected={setSelected}
          idx={idx}
          selectedRef={accommodationRef}
          count={count}
        />
      ))}
    </Block>
  );
}
