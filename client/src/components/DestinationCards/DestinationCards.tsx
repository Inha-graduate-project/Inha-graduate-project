import { Block } from "./styles";
import { NoMarginTitle } from "../DestinationPicker/styles";
import { CardComponent } from "../CardComponent";
export default function DestinationCards() {
  const destination = [
    "산",
    "바다",
    "역사/문화",
    "체험",
    "건축/조형물",
    "카페",
  ];
  return (
    <Block>
      <NoMarginTitle>선호하는 여행테마를 선택해 주세요.</NoMarginTitle>
      {destination.map((item, idx) => (
        <CardComponent title={item} src={`/src/img/destination_${idx}.jpg`} />
      ))}
    </Block>
  );
}
