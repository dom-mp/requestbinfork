import { Link } from "react-router";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Drawer,
  Stack,
} from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";

interface BasketsProps {
  baskets: Array<string>;
  drawerState: boolean;
  setDrawerState: React.Dispatch<React.SetStateAction<boolean>>;
  snackbarMessage: boolean;
}

const Baskets = ({
  baskets,
  drawerState,
  setDrawerState,
  snackbarMessage,
}: BasketsProps) => {
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
      <Stack
        direction="column"
        sx={{
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h6">My Baskets</Typography>

        <List dense={true} onClick={() => setDrawerState(false)}>
          {baskets.toReversed().map((basketName) => (
            <ListItem
              key={basketName}
              component={Link}
              to={`/baskets/${basketName}`}
              divider={true}
              sx={{
                color: "primary.main",
                "&:hover": {
                  color: "secondary.main",
                  textDecoration: "underline",
                },
              }}
            >
              <ListItemIcon>
                <ArchiveIcon sx={{ color: "primary.main" }} />
              </ListItemIcon>
              <ListItemText>/{basketName}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Drawer>
  );
};

export default Baskets;
