import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import axios from "../api/axios";
import RegisterModelDialog from "../components/dialogs/RegisterModelDialog";
import ContestantModelsListLayout from "./ContestantModelsListLayout";
import ModalSpinner from "../components/main/ModalSpinner";
import ConfirmationDialog from "../components/dialogs/ConfirmationDialog";
import { IsRegisterTermAvailable } from "../components/main/Common";

function ListRegisteredModels(props) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [models, setModels] = useState({
    models: [],
    loading: false,
  });

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const [openRegisterDialog, setOpenRegisterDialog] = useState({
    model: [],
    opening: false,
    title: "Dodaj model",
    button: "Dodaj model",
    isInsert: true,
  });
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState({
    model: [],
    opening: false,
  });

  const handleOpenRegisterDialog = () => {
    if (!IsRegisterTermAvailable() && props.isadmin != 1) return null;
    setOpenRegisterDialog({
      model: [],
      opening: true,
      title: `Dodaj model dla: ` + props.user,
      button: "Dodaj model",
      isInsert: true,
    });
  };

  const handleOpenModyfiDialog = (model) => {
    if (!IsRegisterTermAvailable() && props.isadmin != 1) return null;
    setOpenRegisterDialog({
      model: model,
      opening: true,
      title: `Zmień model dla: ` + props.user,
      button: "Zmień model",
      isInsert: false,
    });
  };

  const handleDisagreeConfirmationDialog = () => {
    setOpenConfirmationDialog({ model: [], opening: false });
  };

  const handleAgreeConfirmationDialog = async () => {
    const modelId = openConfirmationDialog.model.id;
    setOpenConfirmationDialog({
      model: [],
      opening: false,
    });
    setLoading(true);
    try {
      await csrf();
      await axios.delete("/api/delete_model/" + modelId);
      await getModels();
    } catch (e) {
      if (e.response.status != 204) {
        setErrors(e.response.data.errors);
      }
    }
    setLoading(false);
  };

  const handleDelete = (model) => {
    if (!IsRegisterTermAvailable() && props.isadmin != 1) return null;
    setOpenConfirmationDialog({ model: model, opening: true });
  };

  const getModels = async () => {
    setErrors([]);
    try {
      const data = await axios.get(`api/models/${props.idContestant}`);
      setModels({ models: data.data.models, loading: false });
    } catch (e) {
      if (e.response.status != 204) {
        setErrors(e.response.data.errors);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getModels();
  }, [props.idContestant]);

  const handleClose = () => {
    setOpenRegisterDialog({ model: [], opening: false });
  };

  return (
    <>
      <ModalSpinner visibled={loading} />
      <div
        className={`xl:flex xl:flex-col w-[100%] xl:w-[100%] md:w-[100%]
      mr-0 xl:mr-0 md:mr-0 justify-center px-8 py-6
      ${props.background} gap-y-4 gap-x-8>`}
      >
        <button
          className="max-w-36 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={handleOpenRegisterDialog}
        >
          Dodaj model
        </button>
        <div className="flex item-left">
          <ContestantModelsListLayout
            models={models.models}
            handleOpenModyfiDialog={handleOpenModyfiDialog}
            handleDelete={handleDelete}
            isadmin={props.isadmin}
          />
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openRegisterDialog.opening || openConfirmationDialog.opening}
      >
        <RegisterModelDialog
          open={openRegisterDialog.opening || openConfirmationDialog.opening}
          handleClose={handleClose}
          categories={props.categories}
          idContestant={props.idContestant}
          getModels={getModels}
          {...openRegisterDialog}
        ></RegisterModelDialog>
        <ConfirmationDialog
          title={"Usuwanie modelu"}
          description={`Czy chesz usunąć model: `}
          deleteName={`${openConfirmationDialog.model.nazwa}`}
          open={openConfirmationDialog.opening}
          handleDisagree={handleDisagreeConfirmationDialog}
          handleAgree={handleAgreeConfirmationDialog}
          buttonCancel="Anulij"
          buttonOK="Usuń"
        ></ConfirmationDialog>
      </Backdrop>
    </>
  );
}

export default ListRegisteredModels;
