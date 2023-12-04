import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      <div>
        <Link to="/">Main</Link>
      </div>
      <div>
        <Link to="/control-form">Contol Form</Link>
      </div>
      <div>
        <Link to="/uncontrol-form">Uncontol Form</Link>
      </div>
    </header>
  );
};

export default Header;
