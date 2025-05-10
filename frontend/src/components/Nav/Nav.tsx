import "./Nav.css";
import { Link } from "react-router";

const Nav = () => {
  return (
    <nav>
      <menu>
        <li>
          <Link to={"/"}>RequestBin</Link>
        </li>
        <li>
          <a href="https://github.com/dom-and-the-night-owls/requestbin">
            github
          </a>
        </li>
        <li>
          <a href="https://github.com/dom-and-the-night-owls/requestbin/wiki">
            documentation
          </a>
        </li>
      </menu>
    </nav>
  );
};

export default Nav;
