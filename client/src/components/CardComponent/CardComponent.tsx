import { Card } from "antd";

interface CardComponentType {
  title: string;
  src: string;
}
const { Meta } = Card;
export default function CardComponent({ title, src }: CardComponentType) {
  return (
    <Card
      hoverable
      style={{ width: 200 }}
      cover={<img style={{ height: 114 }} alt="example" src={src} />}
    >
      <Meta title={title} />
    </Card>
  );
}
