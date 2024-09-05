import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import axios from "../api/axios";
import ModalSpinner from "../components/main/ModalSpinner";
import ConfirmationDialog from "../components/dialogs/ConfirmationDialog";
import { RegisterLearnerDialog } from "../components/dialogs/RegisterLearnerDialog";
import ListRegisteredModels from "./ListRegisteredModels";
import { IsRegisterTermAvailable } from "../components/main/Common";

export const LearnersLayouts = (props) => {
  const [openRegisterDialog, setOpenRegisterDialog] = useState({
    learner: [],
    opening: false,
    title: "Dodaj ucznia",
    button: "Dodaj ucznia",
    isInsert: true,
  });
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState({
    learner: [],
    opening: false,
  });
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    learners: [],
    loading: true,
  });
  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const handleDisagreeConfirmationDialog = () => {
    setOpenConfirmationDialog({ learner: [], opening: false });
  };

  const handleAgreeConfirmationDialog = async () => {
    const learnerId = openConfirmationDialog.learner.id;
    setOpenConfirmationDialog({ learner: [], opening: false });
    setLoading(true);
    await csrf();
    await axios.delete("/api/delete_learner/" + learnerId);
    getLearners();
  };

  const getLearners = async () => {
    if (props.idopiekuna) {
      setLoading(true);
      const { data } = await axios.get("/api/learners/" + props.idopiekuna);
      if (data.status === 200)
        setValues({ learners: data.learners, loading: false });
      setLoading(false);
    }
  };

  useEffect(() => {
    getLearners();
  }, [props.idopiekuna]);

  const handleOpenRegisterDialog = () => {
    if (!IsRegisterTermAvailable()) return null;
    setOpenRegisterDialog({
      learner: [],
      opening: true,
      title: `Dodaj ucznia dla: ` + props.teacher,
      button: "Dodaj ucznia",
      isInsert: true,
    });
  };
  const handleClose = () => {
    setOpenRegisterDialog({ learner: [], opening: false });
  };

  const handleDelete = (learner) => {
    setOpenConfirmationDialog({ learner: learner, opening: true });
  };

  const handleUpdate = (learner) => {
    setOpenRegisterDialog({
      learner: learner,
      opening: true,
      title: `Modyfikuj ucznia dla: ` + props.teacher,
      button: "Zapisz",
      isInsert: false,
    });
  };

  return (
    props.showLearner && (
      <>
        <ModalSpinner visibled={loading} />
        <div className="grid xl:flex w-[100%] xl:w-[100%] md:w-[100%] justify-left px-6 py-6 bg-white bg-opacity-30  rounded-lg shadow-md shadow-gray-200  gap-y-4 gap-x-8">
          <div className="mb-2 xl:mb-auto">
            <button
              data-modal-target="default-modal"
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={handleOpenRegisterDialog}
            >
              Dodaj ucznia
            </button>
          </div>
          <div className="w-[100%] xl:w-[100%] md:w-[100%]">
            {values.learners.map((learner, index) => (
              <>
                <div
                  className={`${
                    index % 2 ? "bg-white" : "bg-stone-200"
                  } bg-opacity-40 `}
                >
                  <div className="xl:grid xl:grid-flow-col">
                    <div className="col-span-10 md:col-span-1 text-lg font-bold">
                      <table className="xl:flex md:grid ">
                        <tr className="xl:flex grid md:flex">
                          <td className="px-1 py-2">
                            {learner.imie} {learner.nazwisko}
                          </td>
                          <td className="px-1 py-2 font-normal">
                            {learner.rokur}
                          </td>
                          <td className="px-1 py-2 font-normal">
                            {`${learner.status != 2 ? learner.email : ""}`}
                          </td>
                          <td className="px-1 py-2 font-normal">
                            {learner.miasto}
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div className="xl:flex col-span-1 justify-end mr-2 pt-4">
                      <button
                        onClick={() => handleUpdate(learner)}
                        className="max-w-36 flex justify-end xl:mt-auto ml-2 xl:ml-0 mr-2 xl:mr-1 md:mr-auto mb-2 xl:mb-0 bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold py-2 px-4 border border-gray-600 rounded shadow"
                      >
                        Zmień
                      </button>
                      <button
                        onClick={() => handleDelete(learner)}
                        className="max-w-36 flex justify-end xl:mt-auto ml-2 xl:ml-0 mr-2 xl:mr-1 md:mr-auto mb-2 xl:mb-0 bg-red-400 text-gray-800 hover:bg-red-600 hover:text-gray-50 font-semibold py-2 px-4 border border-red-600 rounded shadow"
                      >
                        Usuń ucznia
                      </button>
                    </div>
                  </div>

                  <div className="col-span-10 my-4">
                    <ListRegisteredModels
                      background={`${
                        index % 2 ? "bg-white" : "bg-stone-200"
                      } bg-opacity-40`}
                      idContestant={learner.id}
                      user={`${learner.imie} ${learner.nazwisko}`}
                      categories={props.categories}
                      isadmin={props.isadmin}
                    />
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openRegisterDialog.opening || openConfirmationDialog.opening}
        >
          <RegisterLearnerDialog
            {...openRegisterDialog}
            idopiekuna={props.idopiekuna}
            teacherEmail={props.teacherEmail}
            handleClose={handleClose}
            getLearners={getLearners}
          ></RegisterLearnerDialog>
          <ConfirmationDialog
            title={"Usuwanie ucznia"}
            description={`Czy chesz usunąć ucznia: `}
            deleteName={`${openConfirmationDialog.learner.imie} ${openConfirmationDialog.learner.nazwisko}`}
            open={openConfirmationDialog.opening}
            handleDisagree={handleDisagreeConfirmationDialog}
            handleAgree={handleAgreeConfirmationDialog}
            buttonCancel="Anulij"
            buttonOK="Usuń"
          ></ConfirmationDialog>
        </Backdrop>
      </>
    )
  );
};
