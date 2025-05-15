import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import Slide from "@mui/material/Slide";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

interface MyBasketsFabProps {
  setDrawerState: React.Dispatch<React.SetStateAction<boolean>>;
  drawerState: boolean;
  isMobile: boolean;
}

const MyBasketsFab = ({
  drawerState,
  setDrawerState,
  isMobile,
}: MyBasketsFabProps) => {
  return (
    <Slide direction="left" in={!drawerState} mountOnEnter unmountOnExit>
      <Tooltip arrow title="My Baskets" placement="left">
        <Fab
          color="secondary"
          onClick={() => setDrawerState((state) => !state)}
          sx={{
            position: "fixed",
            zIndex: 3,
            ...(isMobile ? { bottom: 30 } : { top: 30 }),
            right: 30,
          }}
          aria-label="basket"
        >
          <ShoppingBasketIcon />
        </Fab>
      </Tooltip>
    </Slide>
  );
};

export default MyBasketsFab;
