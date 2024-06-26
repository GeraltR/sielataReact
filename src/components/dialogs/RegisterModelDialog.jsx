import { useEffect, useState } from "react";
import ModalSpinner from "../main/ModalSpinner";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FormUserinput from "../toform/FormUserInput";
import SpinnerButton from "../main/SpinnerButton";
import useAuthContext from "../../context/AuthContext";
import { ModelFields } from "../main/Common";
import CategorySelection from "../toform/CategorySelection";

function RegisterModelDialog(props) {
  const { csrf } = useAuthContext();
  const [errors, setErrors] = useState([]);
  const [loading, setLoadaing] = useState(false);
  const [valuesModel, setValuesModel] = useState({
    id: 0,
    usrers_id: 0,
    categories_id: 0,
    nazwa: "",
    producent: "",
    skala: "",
    styl: 0,
  });

  const handleAddModel = async (event) => {
    event.preventDefault();
    //setLoadaing(true);
    //await csrf();
    console.log("Zapisywanie");
    //setLoadaing(false);
  };

  const inputs = JSON.parse(JSON.stringify(ModelFields));

  const onChange = (e) => {
    setValuesModel({ ...valuesModel, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Dialog
        open={props.open}
        PaperProps={{
          component: "form",
          onSubmit: handleAddModel,
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
          <CategorySelection />
          {inputs.map((input) => (
            <FormUserinput
              error={errors[input.name]}
              key={input.id}
              {...input}
              value={valuesModel[input.name]}
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

export default RegisterModelDialog;
