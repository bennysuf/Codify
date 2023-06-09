import { Route, Routes } from "react-router-dom";
import DevNavBar from "./DevNavBar";
import AboutPage from "./AboutPage";
import DevProjectPage from "./DevProjectPage";

export default function DevPage() {

  return (
    <>
      <DevNavBar />
      <h3>DevPage</h3>
      <Routes>
        <Route path="about" element={<AboutPage />} />
        <Route path="projects" element={<DevProjectPage />} />
      </Routes>
    </>
  );
}
