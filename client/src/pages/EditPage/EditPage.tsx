import { useEffect } from "react";
import { useGetSavedCourseById } from "../../hooks";
import { EditSideBar, MapComponent } from "../../components";

import { Block, Container } from "../CoursePage/styles";

export default function EditPage() {
  const { data, isLoading } = useGetSavedCourseById("부산");
  return (
    <Block>
      <>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <>
            <EditSideBar />
            <Container>
              <MapComponent />
            </Container>
          </>
        )}
      </>
    </Block>
  );
}
