import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
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
