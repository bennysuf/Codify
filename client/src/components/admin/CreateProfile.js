import { useState, useContext } from "react";
import { UserContext } from "../App";

export default function EditAdmin() {
  const { navigate, setAdmin } = useContext(UserContext);

  const [aboutPage, setAboutPage] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [socialLinks, setSocialLinks] = useState("");
 
  function handleAboutChange(e) {
    e.preventDefault();
    setAboutPage(e.target.value);
  }
  function handleResumeChange(e) {
    e.preventDefault();
    setResumeUrl(e.target.value);
  }
  function handleSocialChange(e) {
    e.preventDefault();
    setSocialLinks(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const update = {
      about: aboutPage,
      social_links: socialLinks,
      resume: resumeUrl,
    };
    fetch("/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    }).then((r) => {
      if (r.ok) {
        r.json().then((d) => {
          setAdmin(d);
          navigate("/admin");
        });
      }
    });
  }

  return (
    <>
      <h1>Create admin</h1>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <input
            placeholder="Resume link"
            value={resumeUrl}
            onChange={handleResumeChange}
          />
          <input
            placeholder="social"
            value={socialLinks}
            onChange={handleSocialChange}
          />
          <textarea
            placeholder="About page"
            value={aboutPage}
            onChange={handleAboutChange}
            style={{ height: "100px" }}
          />
        </div>
        <button type="submit" className="button">
          Submit
        </button>
        <br />
      </form>
    </>
  );
}
