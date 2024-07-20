import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function ProgressBarDialog(props) {
  return (
    <>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="w-[12rem] md:w-[30rem] xl:w-[30rem]"
          >
            <div className="grid justify-center">
              Numer startowy:&nbsp;{props.konkurs}
            </div>
            <div className="grid justify-center">{props.positionProgress}%</div>
            <progress
              className="h-1.5 w-[12rem] md:w-[30rem] xl:w-[30rem] rounded-full"
              value={props.positionProgress}
              max={100}
            >
              {props.positionProgress}
            </progress>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProgressBarDialog;
