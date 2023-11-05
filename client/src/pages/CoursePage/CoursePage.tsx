import { CourseSideBar, MapComponent } from "../../components";
import { Block, Container } from "./styles";

export default function CoursePage() {
  return (
    <Block>
      <CourseSideBar />
      <Container>
        <MapComponent />
      </Container>
    </Block>
  );
}
