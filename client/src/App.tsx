import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CoursePage, EditPage, LandingPage, MyPage } from "./pages";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/edit" element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
