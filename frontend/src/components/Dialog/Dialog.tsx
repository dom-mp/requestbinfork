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
}

const DialogComponent = ({
  dialogState,
  setDialogState,
}: DialogComponentProps) => {
  return (
    <Dialog
      // fullScreen={fullScreen}
      open={!dialogState}
      onClose={() => setDialogState(dialogState)}
      // aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Are you sure you want to delete this Basket?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Deleting this is permanent.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogState(!dialogState)} autoFocus>
          Disagree
        </Button>
        <Button onClick={() => setDialogState(dialogState)} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
