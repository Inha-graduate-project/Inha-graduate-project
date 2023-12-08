import { EditOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Meta from "antd/es/card/Meta";
import { useState } from "react";
import { usePutModifyTitle } from "../../hooks";
import { CardTitle, CardLabel } from "./styles";

interface CardEditComponentProps {
  id: string;
  title: string;
  startDay: string;
  finishDay: string;
}

export default function CardEditComponent({
  id,
  title,
  startDay,
  finishDay,
}: CardEditComponentProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const { mutate } = usePutModifyTitle(id, newTitle);
  const targetDate = new Date(
    parseInt(startDay.substring(0, 4)),
    parseInt(startDay.substring(4, 6)) - 1, // Months are zero-based
    parseInt(startDay.substring(6, 8))
  );
  const currentDate = new Date();
  const timeDifference = Math.floor(
    (targetDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24) + 1
  );

  const handleSubmit = (value: string) => {
    setIsEdit(false);
    if (value !== "") mutate();
  };
  return (
    <Meta
      title={
        <CardTitle>
          {isEdit ? (
            <Input
              style={{ padding: "0px" }}
              onBlur={(e) => handleSubmit(e.target.value)}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          ) : (
            <>
              <span>{title}</span>
              <EditOutlined
                onClick={() => setIsEdit(true)}
                style={{ fontSize: "12px", color: "#8c8c8c" }}
              />
            </>
          )}

          <CardLabel>
            D{timeDifference >= 0 ? "-" : "+"}
            {timeDifference === 0 ? "DAY" : Math.abs(timeDifference)}
          </CardLabel>
        </CardTitle>
      }
      description={`${startDay.replace(
        /^(\d{4})(\d{2})(\d{2})$/,
        "$1-$2-$3"
      )} ~ ${finishDay.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")}`}
    />
  );
}
