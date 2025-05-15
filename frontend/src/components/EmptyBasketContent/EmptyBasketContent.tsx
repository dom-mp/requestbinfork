import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface EmptyBasketContentProps {
  originURL: string;
  basketName: string;
}

const EmptyBasketContent = ({
  originURL,
  basketName,
}: EmptyBasketContentProps) => (
  <Box p={3}>
    <Typography variant="h5">Empty Basket!</Typography>
    <Typography variant="body1" sx={{ wordWrap: "break-all" }}>
      This basket is listening for HTTP requests at{" "}
      <code>
        {originURL}/hook/{basketName}
      </code>
      .
    </Typography>
  </Box>
);

export default EmptyBasketContent;
