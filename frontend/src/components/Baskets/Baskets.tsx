import { Link } from "react-router";
import {
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Drawer,
  Box,
} from "@mui/material";
import { Archive } from "@mui/icons-material";

interface BasketsProps {
  baskets: Array<string>;
  drawerState: boolean;
  setDrawerState: (boolean: boolean) => void;
  isMobile: boolean;
}

const Baskets = ({
  baskets,
  drawerState,
  setDrawerState,
  isMobile,
}: BasketsProps) => {
  return (
    <Drawer
      anchor={isMobile ? "top" : "left"}
      open={drawerState}
      onClose={() => setDrawerState(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: isMobile ? "100%" : 200,
          paddingTop: 3,
          paddingBottom: isMobile ? 5 : 0,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h6">My Baskets</Typography>

        <List dense={true}>
          {baskets.map((basketName) => (
            <ListItem
              key={basketName}
              component={Link}
              to={`/baskets/${basketName}`}
              sx={{
                color: "primary.main",
                "&:hover": {
                  color: "secondary.main",
                  textDecoration: "underline",
                },
              }}
            >
              <ListItemIcon>
                <Archive sx={{ color: "primary.main" }} />
              </ListItemIcon>
              {basketName}
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Baskets;
