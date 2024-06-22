import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmationDialog(props) {
  return (
    <>
      <Button variant="outlined" onClick={props.handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`${props.description} ${props.pupill}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={props.handleDisagree}
          >
            {props.buttonCancel}
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            onClick={props.handleAgree}
            autoFocus
          >
            {props.buttonOK}
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
