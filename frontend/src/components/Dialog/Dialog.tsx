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
  handleConfirm: () => void;
}

const DialogComponent = ({
  dialogState,
  setDialogState,
  handleConfirm,
}: DialogComponentProps) => {
  return (
    <Dialog
      open={dialogState}
      onClose={() => setDialogState(false)}
      aria-labelledby="delete-basket"
    >
      <DialogTitle id="delete-basket">
        Are you sure you want to delete this Basket?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>This is an irreversible action</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogState(false)} autoFocus>
          Cancel
        </Button>
        <Button
          onClick={() => {
            setDialogState(false);
            handleConfirm();
          }}
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
