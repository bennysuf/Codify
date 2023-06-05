import { useState, useContext } from "react";
import { UserContext } from "../App";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [message, setMessage] = useState("");

  const { currentDev } = useContext(UserContext);

  const { email, id } = currentDev[0];

  // console.log("email", email)

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      email: emailAddress,
      message,
      recipient: "bennysuf@gmail.com",
      developer_id: id,
      head: "heading",
      //   recipient: email,
      // TODO: fix columns in backend based off of free mailers needs
    };

    fetch("/contact_forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            placeholder="Email"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            required
          ></textarea>
        </div>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
