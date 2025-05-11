import { Link } from "react-router";
import { Paper, List, ListItem, ListItemIcon, Typography } from "@mui/material";
import { Archive } from "@mui/icons-material";


interface BasketsProps {
  baskets: Array<string>;
}

const Baskets = ({ baskets }: BasketsProps) => {
  return (
    // Paper element creates a new "elevation layer",
    // which automatically applies box shadow.
    // AppBar default elevation is 4.
    <Paper
      elevation={4}
      sx={{
        padding: 2,
        width: 200,
        color: "primary.contrastText",
        boxSizing: "border-box",
        borderRadius: 1,
        backgroundColor: "primary.main",
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
              color: "primary.contrastText",
              "&:hover": {
                color: "secondary.main",
                textDecoration: "underline",
              },
            }}
          >
            <ListItemIcon>
              <Archive sx={{ color: "primary.contrastText" }} />
            </ListItemIcon>
            {basketName}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Baskets;
