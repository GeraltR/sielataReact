import { useState } from "react";
import axios from "../../api/axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FormUserinput from "../toform/FormUserInput";
import useAuthContext from "../../context/AuthContext";
import SpinnerButton from "../main/SpinnerButton";
import ModalSpinner from "../main/ModalSpinner";
import { PersonFields, generateUID } from "../main/Common";

export function RegisterPupillDialog(props) {
  const { csrf } = useAuthContext();
  const [errors, setErrors] = useState([]);
  const [loading, setLoadaing] = useState(false);
  const [values, setValues] = useState({
    imie: "",
    nazwisko: "",
    email: "",
    rokur: "",
    miasto: "",
    idopiekuna: props.idopiekuna,
  });

  let isntEmail = false;

  const add_pupill = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    try {
      await axios.post("/api/add_pupill/" + data.idopiekuna, data);
      props.handleClose();
      props.getPupills();
    } catch (e) {
      if (e.response.status != 204) {
        setErrors(e.response.data.errors);
      }
      if (isntEmail) {
        values.email = "";
        setValues({ ...values });
      }
    }
    setLoadaing(false);
  };

  const inputs = JSON.parse(JSON.stringify(PersonFields));

  const getEmail = async () => {
    if (!values.email) {
      const rndEmail = `${generateUID(5)}${props.teacherEmail}`;
      values.email = rndEmail;
      setValues({ ...values });
      isntEmail = true;
    } else isntEmail = false;
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    setLoadaing(true);
    await getEmail();
    await add_pupill({ ...values });
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

export default RegisterPupillDialog;
