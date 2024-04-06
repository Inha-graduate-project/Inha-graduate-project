import { NoMarginTitle } from "../DestinationPicker/styles";
import { CardComponent } from "../CardComponent";
import { Block } from "../DestinationCards/styles";
import { useRef, useState } from "react";

interface AccommodationCardsProps {
  isError: React.MutableRefObject<boolean>;
}
export default function AccommodationCards({
  isError,
}: AccommodationCardsProps) {
  const accommodation = ["호텔", "펜션", "모텔"];
  const [selected, setSelected] = useState([0, 0, 0]);
  const count = useRef(1);
  return (
    <>
      <NoMarginTitle>선호하는 숙박시설을 선택해 주세요.</NoMarginTitle>
      <Block>
        {accommodation.map((item, idx) => (
          <CardComponent
            title={item}
            src={`/src/img/accommodation_${idx}.jpg`}
            setSelected={setSelected}
            idx={idx}
            selected={selected}
            count={count}
            type="accommodate"
            isError={isError}
          />
        ))}
      </Block>
    </>
  );
}
