import { useState, useContext } from "react";
import { UserContext } from "../App";

export default function EditAdmin() {
  const { admin, navigate, setAdmin, devs, setDevs } = useContext(UserContext);

  const { username, public_profile, resume, about, social_links } = admin;

  // start social_links column with empty object, then frontend will "map" through it.
  // TODO: change default value of social_link to an empty array

  const [aboutPage, setAboutPage] = useState(about);
  const [resumeUrl, setResumeUrl] = useState(resume);
  const [socialLinks, setSocialLinks] = useState(social_links);
  const [newUsername, setNewUsername] = useState(username);
  const [publicProfile, setPublicProfile] = useState(public_profile);
  const [errors, setErrors] = useState("");

  function handleAboutChange(e) {
    e.preventDefault();
    setAboutPage(e.target.value);
  }
  function handleResumeChange(e) {
    e.preventDefault();
    setResumeUrl(e.target.value);
  }
  function handleUsernameChange(e) {
    e.preventDefault();
    setNewUsername(e.target.value);
  }

  const update = {
    about: aboutPage,
    social_links: socialLinks,
    resume: resumeUrl,
    username: newUsername,
    public_profile: publicProfile,
  };

  function handleSubmit(e) {
    setErrors("");
    e.preventDefault();

    fetch(`/developers/${admin.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    }).then((r) => {
      if (r.ok) {
        // r.json().then((d) => console.log("edit data", d));
        r.json().then((d) => {
          setAdmin(d);
          setDevs(
            devs.map((dev) => {
              return dev.id !== d.id ? dev : d;
            })
          );
        });
        navigate("/admin");
      } else {
        r.json().then((err) => {
          setErrors(err.error);
          window.scrollTo(0, 0);
        });
      }
    });
  }

  function handleChangeWebsite(index, newWebsite) {
    setSocialLinks((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = {
        ...updatedValues[index],
        website: newWebsite,
      };
      return updatedValues;
    });
  }

  function handleChangeUrl(index, newUrl) {
    setSocialLinks((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = {
        ...updatedValues[index],
        url: newUrl,
      };
      return updatedValues;
    });
  }

  function handleAddInputPair(e) {
    e.preventDefault();
    setSocialLinks((prevValues) => [...prevValues, { website: "", url: "" }]);
  }

  function handleRemoveEmptyInputPairs(e) {
    e.preventDefault();
    setSocialLinks((prevValues) =>
      prevValues.filter((item) => item.website !== "" && item.url !== "")
    );
  }

  const urlData = socialLinks.map((item, index) => (
    <div key={index}>
      <input
        placeholder="Website"
        value={item.website}
        onChange={(e) => handleChangeWebsite(index, e.target.value)}
      />
      <input
        placeholder="URL"
        value={item.url}
        onChange={(e) => handleChangeUrl(index, e.target.value)}
      />
    </div>
  ));

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <br />
          <label style={{ marginLeft: "3%", width: "fit-content" }}>
            {/* //TODO: how to have the onChange effect only the checkbox? */}
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={publicProfile}
              value={publicProfile.toString()}
              onChange={() => setPublicProfile(!publicProfile)}
            />
            Public profile {publicProfile ? "ON" : "OFF"}
          </label>
          <br />
          <h3 style={{ marginLeft: "3%" }}>{errors}</h3>
          <label>
            Username
            <input
              placeholder="username"
              value={newUsername}
              onChange={handleUsernameChange}
            />
          </label>
          <label>
            Resume URL
            <input
              placeholder="Resume link"
              value={resumeUrl}
              onChange={handleResumeChange}
            />
          </label>
          <label>
            Social links
            {urlData}
          </label>
          <button onClick={handleAddInputPair}>+</button>
          <button onClick={handleRemoveEmptyInputPairs}>-</button>
          <label>
            About page
            <textarea
              placeholder="About page"
              value={aboutPage}
              onChange={handleAboutChange}
              style={{ height: "500px" }}
            />
          </label>
        </div>
        <button type="submit" className="button">
          Submit
        </button>
        <br />
      </form>
    </>
  );
}
