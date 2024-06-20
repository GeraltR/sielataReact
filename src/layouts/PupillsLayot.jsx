import { useEffect, useState } from "react";
import { RegisterPupillDialog } from "../components/dialogs/RegisterPupillDialog";

import Backdrop from "@mui/material/Backdrop";
import axios from "../api/axios";
import ModalSpinner from "../components/main/ModalSpinner";

export const PupillsLayouts = (props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoadaing] = useState(false);
  const [values, setValues] = useState({
    pupills: [],
    loading: true,
  });

  const getPupills = async () => {
    if (props.idopiekuna) {
      setLoadaing(true);
      const { data } = await axios.get("/api/pupills/" + props.idopiekuna);
      if (data.status === 200)
        setValues({ pupills: data.pupills, loading: false });
      setLoadaing(false);
    }
  };

  useEffect(() => {
    getPupills();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    getPupills();
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
        {values.pupills.map((pupill) => (
          <div key={pupill.id}>
            <p>
              {pupill.imie} {pupill.nazwisko}
            </p>
          </div>
        ))}
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <RegisterPupillDialog
          title={`Dodaj ucznia dla: ` + props.teacher}
          idopiekuna={props.idopiekuna}
          open={open}
          handleClose={handleClose}
        ></RegisterPupillDialog>
      </Backdrop>
    </>
  );
};
