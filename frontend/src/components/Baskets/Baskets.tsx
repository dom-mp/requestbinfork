import { Link } from "react-router";
import { useMediaQuery, Typography, Box } from "@mui/material";
import theme from "../../theme";

interface BasketsProps {
  baskets: Array<string>;
}

const Baskets = ({ baskets }: BasketsProps) => {
  // Simulates responsive UI by having Baskets disappear if screen too small
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  if (!isLargeScreen) return null;

  return (
    <Box
      sx={{
        width: 200,
        color: "white",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignSelf: "flex-start",
        alignItems: "center",
        padding: 3,
        paddingRight: "6em",
        boxShadow: theme.shadows[5],
        borderRadius: 1,
        backgroundColor: `${theme.palette.primary.main}`,
      }}
    >
      <Typography variant="h6">Baskets</Typography>

      <Box
        component="ul"
        sx={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          paddingTop: "1.5em",
        }}
      >
        {baskets.map((basketName) => (
          <li key={basketName}>
            <Box
              component={Link}
              to={`/baskets/${basketName}`}
              sx={{
                color: "#FFFFFF",
                "&:hover": {
                  color: theme.palette.secondary.main,
                  textDecoration: "underline",
                },
              }}
            >
              {basketName}
            </Box>
          </li>
        ))}
      </Box>
    </Box>
  );
};

export default Baskets;
