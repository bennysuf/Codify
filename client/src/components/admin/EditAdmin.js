import { useState, useContext } from "react";
import { UserContext } from "../App";

export default function EditAdmin() {
  const { admin, navigate, setAdmin } = useContext(UserContext);

  const { about, social_links, resume } = admin.profile;

  //TODO: edit public profile/admin in general, how to have two fetches? use same update value? or create new one fetch and update value? or create new component?


  const [aboutPage, setAboutPage] = useState(about);
  const [resumeUrl, setResumeUrl] = useState(resume);
  const [socialLinks, setSocialLinks] = useState(social_links);
 
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
    fetch(`/profiles/${admin.id}`, {
      method: "PATCH",
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

  //TODO: make value ternary if value exists

  return (
    <>
      <h1>Edit admin</h1>
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
