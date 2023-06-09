import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div style={{ textAlign: "center" }}>
      <Link style={{ position: "fixed", bottom: "5%" }} to="/contact">
        Contact
      </Link>
    </div>
  );
}
