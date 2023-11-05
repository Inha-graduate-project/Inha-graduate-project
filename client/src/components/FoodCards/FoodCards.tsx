import { NoMarginTitle } from "../DestinationPicker/styles";
import { CardComponent } from "../CardComponent";
import { Block } from "../DestinationCards/styles";
export default function FoodCards() {
  const accommodation = [
    "한식",
    "중식",
    "일식",
    "양식",
    "고기/구이",
    "패스트푸드",
  ];
  return (
    <Block>
      <NoMarginTitle>선호하는 음식메뉴를 선택해 주세요.</NoMarginTitle>
      {accommodation.map((item, idx) => (
        <CardComponent title={item} src={`/src/img/food_${idx}.jpg`} />
      ))}
    </Block>
  );
}
