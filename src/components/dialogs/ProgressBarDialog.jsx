import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";

function ProgressBarDialog(props) {
  //const [position, setPosition] = useState(0);

  useEffect(() => {
    console.log("effect");
  }, []);

  return (
    <>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.positionProgress}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={props.handleDisagree}
          >
            Anuluj
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            onClick={props.handleAgree}
            autoFocus
          >
            Zamknij
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProgressBarDialog;
