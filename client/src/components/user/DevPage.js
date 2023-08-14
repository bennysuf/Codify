import { Route, Routes } from "react-router-dom";
import DevNavBar from "./DevNavBar";
import AboutPage from "./AboutPage";
import DevProjectPage from "./DevProjectPage";

export default function DevPage() {

  return (
    <>
      <div style={{ position: "sticky", top: "0" }}>
        <DevNavBar />
      </div>
      <Routes>
        <Route path="about" element={<AboutPage />} />
        <Route path="projects" element={<DevProjectPage />} />
      </Routes>
    </>
  );
}
