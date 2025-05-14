import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface DialogComponentProps {
  dialogState: boolean;
  setDialogState: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteBasketButtonClick: () => void;
}

const DialogComponent = ({
  dialogState,
  setDialogState,
  handleDeleteBasketButtonClick,
}: DialogComponentProps) => {
  return (
    <Dialog
      // fullScreen={fullScreen}
      open={dialogState}
      onClose={() => setDialogState(false)}
      aria-labelledby="delete-basket"
    >
      <DialogTitle id="delete-basket">
        Are you sure you want to delete this Basket?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Deleting this is permanent.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogState(false)} autoFocus>
          Disagree
        </Button>
        <Button
          onClick={() => {
            setDialogState(false);
            handleDeleteBasketButtonClick();
          }}
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
