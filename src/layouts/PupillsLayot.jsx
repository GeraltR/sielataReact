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

  const handleDelete = (e) => {
    console.log(e);
  };

  return (
    <>
      <ModalSpinner visibled={loading} />
      <div className="xl:flex w-[100%] xl:w-[100%] md:w-[115%] justify-left px-6 py-6 bg-white rounded-lg shadow-md shadow-gray-200  gap-y-4 gap-x-8">
        <div className="mb-2 xl:mb-auto md:mr-auto ">
          <button
            data-modal-target="default-modal"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={handleOpen}
          >
            Dodaj ucznia
          </button>
        </div>
        <div>
          {values.pupills.map((pupill) => (
            <>
              <div
                className={`${
                  Number(pupill.id) % 2 ? "bg-white" : "bg-stone-200"
                }`}
              >
                <div className="xl:grid xl:grid-flow-col">
                  <div className="col-span-10 md:col-span-1 text-lg font-bold">
                    <table className="xl:flex md:grid ">
                      <tr className="xl:flex grid md:flex">
                        <td className="px-1 py-2">
                          {pupill.imie} {pupill.nazwisko}
                        </td>
                        <td className="px-1 py-2 font-normal">
                          {pupill.rokur}
                        </td>
                        <td className="px-1 py-2 font-normal">
                          {pupill.email}
                        </td>
                        <td className="px-1 py-2 font-normal">
                          {pupill.miasto}
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div className="xl:flex col-span-1 justify-end mr-2 pt-4">
                    <button
                      onClick={() => handleDelete(pupill.id)}
                      className="max-w-36 flex justify-end xl:mt-auto ml-2 xl:ml-0 mr-2 xl:mr-1 md:mr-auto mb-2 xl:mb-0 bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold py-2 px-4 border border-gray-600 rounded shadow"
                    >
                      Zmień
                    </button>
                    <button
                      onClick={() => handleDelete(pupill.id)}
                      className="max-w-36 flex justify-end xl:mt-auto ml-2 xl:ml-0 mr-2 xl:mr-1 md:mr-auto mb-2 xl:mb-0 bg-red-400 text-gray-800 hover:bg-red-600 hover:text-gray-50 font-semibold py-2 px-4 border border-red-600 rounded shadow"
                    >
                      Usuń ucznia
                    </button>
                  </div>
                </div>

                <div className="col-span-10 my-4">Modele ucznia</div>
              </div>
            </>
          ))}
        </div>
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
