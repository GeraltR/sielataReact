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
import axios from "../../api/axios";

function RegisterModelDialog(props) {
  const { csrf } = useAuthContext();
  const [errors, setErrors] = useState([]);
  const [loading, setLoadaing] = useState(false);
  const [valueCategory, setValueCategory] = useState(4);
  const [valuesModel, setValuesModel] = useState({
    id: 0,
    users_id: props.idContestant,
    categories_id: valueCategory,
    nazwa: "",
    producent: "",
    skala: "",
    styl: 0,
  });

  useEffect(() => {
    valuesModel.users_id = props.idContestant;
  }, []);

  const addNewModel = async ({ ...data }) => {
    //await csrf();
    await axios.post(`/api/add_model`, data);
    props.handleClose();
    setLoadaing(false);
  };

  const handleAddModel = async (event) => {
    event.preventDefault();
    valuesModel.categories_id = valueCategory;
    setValuesModel(valuesModel);
    setLoadaing(true);
    await addNewModel({ ...valuesModel });
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
          <CategorySelection
            categories={props.categories}
            setValueCategory={setValueCategory}
          />
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
