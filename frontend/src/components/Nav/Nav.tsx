import { Link } from "react-router";
import { AppBar, Toolbar, Button } from "@mui/material";
import LogoIcon from "../LogoIcon";

const Nav = () => {
  return (
    <AppBar
      position="static"
      sx={{
        borderRadius: 1,
        minWidth: "400px",
      }}
    >
      <Toolbar>
        <Button color="inherit" component={Link} to={"/"}>
          <LogoIcon sx={{ marginRight: 1 }} /> RequestBin
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
