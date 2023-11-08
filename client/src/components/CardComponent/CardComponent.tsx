import { Card } from "antd";
import { Dispatch, SetStateAction } from "react";
import { CardCircle } from "./styles";

interface CardComponentType {
  title: string;
  src: string;
  setSelected: Dispatch<SetStateAction<number[]>>;
  idx: number;
  selectedRef: React.MutableRefObject<number[]>;
  count: React.MutableRefObject<number>;
}
const { Meta } = Card;
export default function CardComponent({
  title,
  src,
  setSelected,
  idx,
  selectedRef,
  count,
}: CardComponentType) {
  const HandleSelect = () => {
    if (selectedRef.current[idx] < 1) {
      selectedRef.current[idx] += count.current;
      count.current++;
    } else {
      selectedRef.current.forEach((item, index) => {
        if (item > selectedRef.current[idx]) {
          selectedRef.current[index]--;
        }
      });
      count.current--;
      selectedRef.current[idx] = 0;
    }
    setSelected([...selectedRef.current]);
    console.log(selectedRef.current);
  };
  return (
    <Card
      onClick={() => HandleSelect()}
      hoverable
      style={{
        width: 200,
        outline: selectedRef.current[idx] > 0 ? "3px solid #80b5ff" : "none",
      }}
      cover={
        <>
          <img style={{ height: 114 }} alt="example" src={src} />
          {selectedRef.current[idx] > 0 && (
            <CardCircle>
              <span>{selectedRef.current[idx]}</span>
            </CardCircle>
          )}
        </>
      }
    >
      <Meta title={title} />
    </Card>
  );
}
