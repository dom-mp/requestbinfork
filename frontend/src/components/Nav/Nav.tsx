import { Link } from "react-router";
import { AppBar, Toolbar, Button } from "@mui/material";

const Nav = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to={"/"}>
          RequestBin
        </Button>
        <Button
          color="inherit"
          href="https://github.com/dom-and-the-night-owls/requestbin"
        >
          github
        </Button>
        <Button
          color="inherit"
          href="https://github.com/dom-and-the-night-owls/requestbin/wiki"
        >
          documentation
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
