import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CoursePage, EditPage, LandingPage, MyPage } from "./pages";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/course" element={<CoursePage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/edit" element={<EditPage />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
