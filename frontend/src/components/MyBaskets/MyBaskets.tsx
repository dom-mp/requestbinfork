import { NavLink } from "react-router";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import ArchiveIcon from "@mui/icons-material/Archive";

interface BasketsProps {
  baskets: Array<string>;
  drawerState: boolean;
  setDrawerState: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyBaskets = ({ baskets, drawerState, setDrawerState }: BasketsProps) => {
  return (
    <Drawer
      anchor="right"
      open={drawerState}
      onClose={() => setDrawerState(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: 200,
          paddingTop: 3,
        },
      }}
    >
      <MenuList dense={false} onClick={() => setDrawerState(false)}>
        <ListSubheader>My Baskets</ListSubheader>
        <Divider />

        {baskets.map((basketName) => (
          <MenuItem
            key={basketName}
            component={NavLink}
            to={`/baskets/${basketName}`}
            sx={{
              "& .MuiListItemIcon-root": {
                color: "text.secondary",
              },
              "&:hover": {
                color: "secondary.contrastText",
                backgroundColor: "secondary.main",

                "& .MuiListItemIcon-root": {
                  color: "secondary.contrastText",
                },
              },

              "&.active": {
                color: "primary.contrastText",
                backgroundColor: "primary.main",

                "& .MuiListItemIcon-root": {
                  color: "primary.contrastText",
                },

                "&:hover": {
                  color: "text.primary",
                  backgroundColor: "primary.dark",

                  "& .MuiListItemIcon-root": {
                    color: "text.primary",
                  },
                },
              },
            }}
          >
            <ListItemIcon>
              <ArchiveIcon fontSize="small" />
            </ListItemIcon>

            <Typography
              variant="inherit"
              noWrap
              sx={{
                fontFamily: "monospace",
              }}
            >
              /{basketName}
            </Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Drawer>
  );
};

export default MyBaskets;
