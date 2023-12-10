import { useGetCourse } from "../../hooks";
import { EditSideBar, MapComponent } from "../../components";
import { Block, Container } from "../CoursePage/styles";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { courseState, CourseTypes, dayState } from "../../state";
import { Course } from "../../types";

export default function EditPage() {
  const location = useLocation();
  const { courseId, title, startDay, finishDay } = location.state;
  const { data, isLoading } = useGetCourse(courseId);
  const setCourse = useSetRecoilState(courseState);
  const setDay = useSetRecoilState(dayState);
  const newCourse: CourseTypes[] = [];
  data?.data.map((item: Course) => {
    if (!item.name.includes("터미널")) {
      newCourse.push({
        children: item.name,
        location: item.location,
        address: item.address,
        type: item.type,
        day: item.day,
        img: item.image_url,
        price: item.price,
        courseId: item.course_id,
        title: title,
        startDay: item.start_day,
        finishDay: item.finish_day,
      });
    }
  });
  setCourse(newCourse);
  setDay(1);
  return (
    <Block>
      <>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <>
            <EditSideBar
              courseId={courseId}
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
