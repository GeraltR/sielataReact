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
    id: 0,
    imie: "",
    nazwisko: "",
    email: "",
    rokur: "",
    miasto: "",
    klub: "",
    idopiekuna: props.idopiekuna,
  });

  let isntEmail = false;

  if (values.id != props.id && !props.isInsert) {
    values.id = props.id;
    values.imie = props.imie;
    values.nazwisko = props.nazwisko;
    values.email = props.email;
    values.rokur = props.rokur;
    values.miasto = props.miasto;
    values.klub = props.klub;
    setValues({ ...values });
  }

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

  const update_pupill = async ({ ...data }) => {
    await csrf;
    setErrors([]);
    try {
      console.log(data);
      await axios.post("/api/update_pupill/" + data.id, data);
      props.handleClose();
      props.getPupills();
    } catch (e) {
      if (e.response.status != 204) {
        setErrors(e.response.data.errors);
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
    if (props.isInsert) await add_pupill({ ...values });
    else await update_pupill({ ...values });
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
          <SpinnerButton disabled={loading} text={props.button} type="submit" />
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RegisterPupillDialog;
