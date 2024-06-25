import { useEffect, useState } from "react";
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

export function RegisterLearnerDialog(props) {
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
    status: 0,
  });

  let isntEmail = false;

  useEffect(() => {
    if (values.id != props.id && !props.isInsert) {
      values.id = props.id;
      values.imie = props.imie;
      values.nazwisko = props.nazwisko;
      if (props.status != 2) {
        values.email = props.email;
      } else {
        values.email = "";
      }
      values.rokur = props.rokur;
      values.miasto = props.miasto;
      values.klub = props.klub;
      values.status = props.status;
      setValues({ ...values });
    }
  }, [props.id]);

  const add_learner = async ({ ...data }) => {
    await csrf();
    setErrors([]);
    try {
      await axios.post("/api/add_learner/" + data.idopiekuna, data);
      props.handleClose();
      props.getLearners();
    } catch (e) {
      if (e.response.status != 204) {
        setErrors(e.response.data.errors);
      }
      if (isntEmail) {
        values.email = "";
        setValues({ ...values });
      }
    }
    isntEmail = false;
    setLoadaing(false);
  };

  const update_learner = async ({ ...data }) => {
    await csrf;
    setErrors([]);
    try {
      await axios.post("/api/update_learner/" + data.id, data);
      props.handleClose();
      props.getLearners();
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
      values.status = 2;
      isntEmail = true;
    } else {
      isntEmail = false;
      values.status = 0;
    }
    setValues({ ...values });
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    setLoadaing(true);
    await getEmail();
    if (props.isInsert) await add_learner({ ...values });
    else await update_learner({ ...values });
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

export default RegisterLearnerDialog;
