import { useEffect, useState } from "react";
import { RegisterPupilDialog } from "../dialogs/RegisterPupilDialog";

import Backdrop from "@mui/material/Backdrop";
import axios from "../../api/axios";
import ModalSpinner from "../main/ModalSpinner";

export const FormPupilInputs = (props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoadaing] = useState(false);
  const [values, setValues] = useState({
    pupils: [],
    loading: true,
  });

  const getPupils = async () => {
    if (props.idopiekuna) {
      setLoadaing(true);
      const { data } = await axios.get("/api/pupils/" + props.idopiekuna);
      if (data.status === 200)
        setValues({ pupils: data.pupils, loading: false });
      setLoadaing(false);
    }
  };

  useEffect(() => {
    getPupils();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    getPupils();
  };

  return (
    <>
      <ModalSpinner visibled={loading} />
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
        {values.pupils.map((pupil) => (
          <div key={pupil.id}>
            <p>
              {pupil.imie} {pupil.nazwisko}
            </p>
          </div>
        ))}
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
