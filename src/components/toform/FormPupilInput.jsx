import { useState } from "react";
import useAuthContext from "../../context/AuthContext";
import { RegisterPupilDialog } from "../dialogs/RegisterPupilDialog";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const FormPupilInputs = (props) => {
  const { add_pupil } = useAuthContext();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAddPupil = async (event) => {
    event.preventDefault();
    //setLoadaing(true);
    //await add_pupil({ props });
  };

  return (
    <>
      <div className="flex justify-left px-8 py-6 bg-white rounded-lg shadow-md shadow-gray-200  gap-y-4 gap-x-8">
        <div className="flex item-left">
          <button
            data-modal-target="default-modal"
            className="max-w-36 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={handleOpen}
          >
            Dodaj ucznia
          </button>
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <RegisterPupilDialog
          title={`Dodaj ucznia dla: ` + props.teacher}
          idopiekuna={props.idopiekuna}
          open={open}
          handleClose={handleClose}
        ></RegisterPupilDialog>
      </Backdrop>
    </>
  );
};
