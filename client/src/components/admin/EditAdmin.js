import { useState, useContext } from "react";
import { UserContext } from "../App";

export default function EditAdmin() {
  const { admin, navigate, setAdmin, devs, setDevs } = useContext(UserContext);

  const { username, public_profile, resume, about, social_link } = admin;

  const [aboutPage, setAboutPage] = useState(about);
  const [resumeUrl, setResumeUrl] = useState(resume);
  const [socialLinks, setSocialLinks] = useState(social_link);
  const [selectedKey, setSelectedKey] = useState("");
  const [newUsername, setNewUsername] = useState(username);
  const [publicProfile, setPublicProfile] = useState(public_profile);
  const [confirmation, setConfirmation] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSocialLinks((prevSocialMedia) => ({
      ...prevSocialMedia,
      [name]: value,
    }));
  };

  const handleDropdownChange = (event) => {
    setSelectedKey(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    setErrors([]);

    const update = {
      about: aboutPage,
      resume: resumeUrl,
      username: newUsername,
      public_profile: publicProfile,
      social_links: socialLinks,
    };

    fetch(`/developers/${admin.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    }).then((r) => {
      if (r.ok) {
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
          const arr = [];
          if (err.error) {
            arr.push(`${err.error}`);
          } else {
            for (const key in err.errors) {
              arr.push(`${key}: ${err.errors[key]}`);
            }
          }
          setErrors(arr);
          window.scrollTo(0, 0);
        });
      }
    });
  }

  function handleDeleteConfirmation() {
    setConfirmation(true);
    window.scrollTo(0, 0);
  }

  function handleDelete() {
    fetch(`/developers/${admin.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => navigate("/"));
  }

  return (
    <>
      {confirmation ? (
        <dialog open>
          <article>
            <h3>Confirm your action!</h3>
            <p>
              By clicking Confirm you will permanently be deleting your account.
            </p>
            <footer>
              <a
                href="#cancel"
                role="button"
                class="secondary"
                onClick={() => setConfirmation(false)}
              >
                Cancel
              </a>
              <a href="#confirm" role="button" onClick={handleDelete}>
                Confirm
              </a>
            </footer>
          </article>
        </dialog>
      ) : (
        ""
      )}
      <div className="input">
        <br />
        {errors.map((err) => (
          <h3 key={err}>{err}</h3>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        {/* <div class="grid"> */}
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
          <label>
            Username
            <input
              placeholder="username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </label>
          <label>
            Resume URL
            <input
              placeholder="Resume link"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
            />
          </label>
          <label>
            Social links
            <select value={selectedKey} onChange={handleDropdownChange}>
              <option value="">Select a social media</option>
              {Object.keys(socialLinks).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
            {selectedKey && (
              <input
                placeholder={selectedKey}
                name={selectedKey}
                value={socialLinks[selectedKey]}
                onChange={handleChange}
              />
            )}
          </label>
          <label>
            About page
            <textarea
              placeholder="About page"
              value={aboutPage}
              onChange={(e) => setAboutPage(e.target.value)}
              style={{ height: "500px" }}
            />
          </label>
        </div>
        <button type="submit" className="button">
          Submit
        </button>
        <br />
      </form>
      <button
        type="button"
        className="button"
        onClick={handleDeleteConfirmation}
      >
        Delete Account
      </button>
    </>
  );
}
