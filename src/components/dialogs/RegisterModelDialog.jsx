import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FormUserinput from "../toform/FormUserInput";
import ClassRadioButton from "../toform/ClassRadioButton";
import SpinnerButton from "../main/SpinnerButton";
import { ModelFields } from "../main/Common";
import axios from "../../api/axios";

function RegisterModelDialog(props) {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [classModelValue, setClassModelValue] = useState("K");
  const [valueCategoryId, setValueCategoryId] = useState(4);
  const [valuesModel, setValuesModel] = useState({
    id: 0,
    users_id: props.idContestant,
    categories_id: valueCategoryId,
    nazwa: "",
    producent: "",
    skala: "",
    styl: 0,
  });
  const cClassRadioButton = "cClassRadioButton"; //to show on error for empty selection

  useEffect(() => {
    valuesModel.users_id = props.idContestant;
    if (props.opening && props.model.klasa) {
      setValuesModel({ ...props.model });
      setClassModelValue(props.model.klasa);
      setValueCategoryId(props.model.categories_id);
    } else {
      setValuesModel([]);
      setClassModelValue("K");
      setValueCategoryId(1);
    }
  }, [props.opening]);

  function CheckValueCategory() {
    return (
      valuesModel.categories_id != props.appParameters.emptyCartonClass &&
      valuesModel.categories_id != props.appParameters.emptyPlasticClass
    );
  }

  const changeModel = async ({ ...data }) => {
    setErrors([]);
    try {
      if (!CheckValueCategory()) {
        setLoading(false);
        throw new Error("Należy wybrać klasę modelu");
      }
      try {
        if (props.isInsert) await axios.post(`/api/add_model`, data);
        else await axios.post(`/api/update_model/${data.id}`, data);
        await props.getModels();
        props.handleClose();
        setLoading(false);
      } catch (e) {
        console.log(e.response.data);
        if (e.response.status != 204) {
          setLoading(false);
          setErrors(e.response.data.errors);
        }
      }
    } catch (e) {
      setLoading(false);
      setErrors({ cClassRadioButton: [e.message] });
    }
  };

  const handleAddModel = async (event) => {
    event.preventDefault();
    valuesModel.users_id = props.idContestant;
    valuesModel.categories_id = valueCategoryId;
    setValuesModel(valuesModel);
    setLoading(true);
    await changeModel({ ...valuesModel });
  };

  const inputs = JSON.parse(JSON.stringify(ModelFields));

  const onChange = (e) => {
    setValuesModel({ ...valuesModel, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Dialog
        open={props.opening}
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
          <ClassRadioButton
            OnClickClassModel={setClassModelValue}
            categoriesFiltr={classModelValue}
            setValueCategoryId={setValueCategoryId}
            categories={props.categories}
            valueCategoryId={valueCategoryId}
            error={errors[cClassRadioButton]}
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
