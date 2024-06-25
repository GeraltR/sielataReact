import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import RegisterModelDialog from "../components/dialogs/RegisterModelDialog";

function ListRegisteredModels(props) {
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
    setOpenRegisterDialog({
      model: [],
      opening: true,
      title: `Dodaj model dla: ` + props.user,
      button: "Dodaj model",
      isInsert: true,
    });
  };
  const handleClose = () => {
    setOpenRegisterDialog({ model: [], opening: false });
  };

  const handleAddNewModel = () => {
    console.log(props.idContestant);
  };

  return (
    <>
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
          <h2 className="font-medium text-gray-700">
            Jeszcze nie zgłoszono modeli
          </h2>
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openRegisterDialog.opening || openConfirmationDialog.opening}
      >
        <RegisterModelDialog
          open={openRegisterDialog.opening || openConfirmationDialog.opening}
          title={openRegisterDialog.title}
          button={openRegisterDialog.button}
          handleClose={handleClose}
        ></RegisterModelDialog>
      </Backdrop>
    </>
  );
}

export default ListRegisteredModels;
