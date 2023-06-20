import { Route, Routes } from "react-router-dom";
import DevNavBar from "./DevNavBar";
import AboutPage from "./AboutPage";
import DevProjectPage from "./DevProjectPage";

export default function DevPage() {

  return (
    <div style={{marginTop: "3px"}} >
      <DevNavBar />
      <Routes>
        <Route path="about" element={<AboutPage />} />
        <Route path="projects" element={<DevProjectPage />} />
      </Routes>
    </div>
  );
}
