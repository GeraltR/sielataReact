import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { PersonFields } from "../main/Common";
import FormUserinput from "../toform/FormUserInput";
import useAuthContext from "../../context/AuthContext";
import SpinnerButton from "../main/SpinnerButton";
import { useState } from "react";
import ModalSpinner from "../main/ModalSpinner";

export function RegisterPupilDialog(props) {
  const { errors } = useAuthContext();
  const { add_pupil } = useAuthContext();
  const [loading, setLoadaing] = useState(false);
  const [values, setValues] = useState({
    imie: "",
    nazwisko: "",
    email: "",
    rokur: "",
    miasto: "",
    idopiekuna: props.idopiekuna,
  });

  const inputs = PersonFields;

  const handleAdd = async (event) => {
    event.preventDefault();
    setLoadaing(true);
    await add_pupil({ ...values });
    props.handleClose();
    setLoadaing(false);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ModalSpinner visibled={loading} />
      <Dialog
        open={props.open}
        PaperProps={{
          component: "form",
          onSubmit: handleAdd,
        }}
      >
        <DialogTitle sx={{ m: 5, p: 2, height: 10 }}>{props.title}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={props.handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {inputs.map((input) => (
            <FormUserinput
              error={errors[input.name]}
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
              disabled={loading}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <SpinnerButton disabled={loading} text="Dodaj ucznia" type="submit" />
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RegisterPupilDialog;
