import { useGetCourse } from "../../hooks";
import { EditSideBar, MapComponent } from "../../components";
import { Block, Container } from "../CoursePage/styles";
import { useLocation } from "react-router-dom";

export default function EditPage() {
  const location = useLocation();
  const { courseId, title, startDay, finishDay } = location.state;
  const { data, isLoading } = useGetCourse(courseId);

  return (
    <Block>
      <>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <>
            <EditSideBar
              city={data?.city as string}
              title={title}
              startDay={startDay}
              finishDay={finishDay}
            />
            <Container>
              <MapComponent />
            </Container>
          </>
        )}
      </>
    </Block>
  );
}
