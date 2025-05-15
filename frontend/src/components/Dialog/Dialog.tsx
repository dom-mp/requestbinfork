import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface DialogComponentProps {
  prompt: string;
  dialogState: boolean;
  setDialogState: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirm: () => void;
}

const DialogComponent = ({
  prompt,
  dialogState,
  setDialogState,
  handleConfirm,
}: DialogComponentProps) => {
  return (
    <Dialog
      open={dialogState}
      onClose={() => setDialogState(false)}
      aria-labelledby="confirmation-dialog"
    >
      <DialogTitle>{prompt}</DialogTitle>
      <DialogContent>
        <DialogContentText>This is an irreversible action.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogState(false)} autoFocus>
          Cancel
        </Button>
        <Button
          color="error"
          onClick={() => {
            setDialogState(false);
            handleConfirm();
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
