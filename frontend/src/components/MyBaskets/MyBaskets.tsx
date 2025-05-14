import { NavLink } from "react-router";
import {
  MenuList,
  MenuItem,
  ListSubheader,
  ListItemIcon,
  Divider,
  Typography,
  Drawer,
} from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";

interface BasketsProps {
  baskets: Array<string>;
  drawerState: boolean;
  setDrawerState: (boolean: boolean) => void;
  isMobile: boolean;
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
      <MenuList dense={true} onClick={() => setDrawerState(false)}>
        <ListSubheader>My Baskets</ListSubheader>
        <Divider />

        {baskets.toReversed().map((basketName) => (
          <MenuItem
            key={basketName}
            component={NavLink}
            to={`/baskets/${basketName}`}
            sx={{
              "& .MuiListItemIcon-root": {
                color: "text.primary",
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
                  color: "primary.contrastText",
                  backgroundColor: "primary.dark",
                },
              },
            }}
          >
            <ListItemIcon>
              <ArchiveIcon />
            </ListItemIcon>

            <Typography variant="inherit" noWrap>
              /{basketName}
            </Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Drawer>
  );
};

export default MyBaskets;
