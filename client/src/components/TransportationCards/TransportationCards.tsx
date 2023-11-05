import { NoMarginTitle } from "../DestinationPicker/styles";
import { CardComponent } from "../CardComponent";
import { Block } from "../DestinationCards/styles";
export default function TransportationCards() {
  const transportation = ["자가용", "택시", "버스/지하철"];
  return (
    <Block>
      <NoMarginTitle>선호하는 교통수단을 선택해 주세요.</NoMarginTitle>
      {transportation.map((item, idx) => (
        <CardComponent
          title={item}
          src={`/src/img/transportation_${idx}.jpg`}
        />
      ))}
    </Block>
  );
}
