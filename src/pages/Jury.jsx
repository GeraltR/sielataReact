import { useState, useEffect } from "react";
import axios from "../api/axios";
import ClassRadioButton from "../components/toform/ClassRadioButton";
import { getTensColor } from "../components/main/Common";
import ModalSpinner from "../components/main/ModalSpinner";
import useAuthContext from "../context/AuthContext";
import ProgressBarDialog from "../components/dialogs/ProgressBarDialog";
import ScrollToTopButton from "../components/main/ScrollToTopButton";

function Jury() {
  const [loading, setLoading] = useState(false);
  const [classModelValue, setClassModelValue] = useState("K");
  const [valueCategoryId, setValueCategoryId] = useState(4);
  const [models, setModels] = useState([]);
  const [totalPointsInCategory, setTotalPointsInCategory] = useState(6);
  const [sendResults, setSendResults] = useState(false);
  const [positionProgress, setPositionProgress] = useState(0);
  const [konkursToProgress, setKonkursToProgress] = useState(0);

  const { user, categories } = useAuthContext();

  const getModels4Classes = async () => {
    try {
      const { data } = await axios.get(`/api/list2points/${valueCategoryId}/0`);
      {
        setModels(data.models);
        let points = 6;
        data.models.map((item) => {
          if (item.points != null) points = points - parseInt(item.points);
        });
        setTotalPointsInCategory(points);
      }
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getModels4Classes();
  }, [valueCategoryId]);

  function changeStateForModels(model) {
    setModels((prevModels) => {
      return prevModels.map((item) => {
        return item.id === model.id ? { ...item, points: model.points } : item;
      });
    });
  }

  const handleAddPoint = (model) => {
    model.flaga = 0;
    if (model.points < 6 && totalPointsInCategory > 0) {
      model.points++;
      model.total++;
      setTotalPointsInCategory(totalPointsInCategory - 1);
    } else {
      const prevPoints = model.points;
      model.points = 0;
      model.total = model.total - prevPoints;
      setTotalPointsInCategory(totalPointsInCategory + prevPoints);
    }
    changeStateForModels(model);
  };

  const handleReducePoint = (model) => {
    model.flaga = 0;
    if (model.points > 0 && totalPointsInCategory < 6) {
      model.points--;
      model.total--;
      setTotalPointsInCategory(totalPointsInCategory + 1);
    } else {
      model.points = totalPointsInCategory;
      model.total = model.total + totalPointsInCategory;
      setTotalPointsInCategory(0);
    }
    changeStateForModels(model);
  };

  const handleAnotherPrix = (model) => {
    const prevPoints = model.points;
    model.flaga = !model.flaga;
    model.points = 0;
    model.total = model.total - prevPoints;
    setTotalPointsInCategory(totalPointsInCategory + prevPoints);
    changeStateForModels(model);
  };

  const handleSaveResults = async () => {
    setPositionProgress(0);
    setKonkursToProgress(0);
    const step = Math.floor(100 / Object(models).length);
    setSendResults(true);
    for (let item of models) {
      let result = {
        id: item.id,
        id_jury: user.id,
        model_id: item.id,
        user_id: item.user_id,
        points: item.points == null ? 0 : item.points,
        flaga: item.flaga == null ? 0 : item.flaga,
      };
      await axios.post(`/api/set_points/${user.id}`, JSON.stringify(result));
      setPositionProgress((prev) => (prev = prev + step));
      setKonkursToProgress(item.konkurs);
    }
    setSendResults(false);
  };

  return (
    <>
      <ModalSpinner visibled={loading} />
      <ScrollToTopButton />
      <div className="grid divide-y xl:m-5 md:m-5 sm:m-0 justify-items-center">
        <div className="max-w-2xl justify-items-center p-5">
          <ClassRadioButton
            OnClickClassModel={setClassModelValue}
            categoriesFiltr={classModelValue}
            setValueCategoryId={setValueCategoryId}
            categories={categories}
            valueCategoryId={valueCategoryId}
            plastikName="1"
            kartonName="1"
          />
        </div>
        <div className="max-w-2xl justify-items-center sm:p-5 md:p-5 sm:p-0">
          <table className="table-auto w-full">
            <thead>
              <tr className=" bg-orange-300">
                <th
                  scope="col"
                  className="px-1 py-2 text-left w-[25%] before:content-['Nr'] md:before:content-['Numer'] xl:before:content-['Numer']"
                ></th>
                <th
                  scope="col"
                  className="px-1 py-2 text-left w-[5%] before:content-['A'] md:before:content-['Atelier'] xl:before:content-['Atelier'] "
                ></th>
                <th
                  scope="col"
                  className="px-1 py-2 text-left w-[75%] text-left"
                >
                  Nazwa
                </th>
                <th
                  scope="col"
                  className="px-1 py-2 w-[10%] text-left before:content-['P'] md:before:content-['Punkty'] xl:before:content-['Punkty']"
                ></th>
                {user.admin == 1 && (
                  <th
                    scope="col"
                    className="px-1 py-2 w-[10%] sm:w-[3%] text-left before:content-['S'] md:before:content-['Suma'] xl:before:content-['Suma']"
                  ></th>
                )}
                <th className="hidden xl:inline md:inline px-1 py-2 w-[10%] sm:w-[5%] text-right"></th>
                <th
                  scope="col"
                  className="px-1 py-2 w-[10%] sm:w-[5%] text-right before:content-['T:'] md:before:content-['Total:'] xl:before:content-['Total:']"
                >
                  &nbsp;{totalPointsInCategory}
                </th>
                <th scope="col" className="px-1 py-2 w-[15%] sm:w-[3%]">
                  W
                </th>
              </tr>
            </thead>
            <tbody>
              <>
                {models.map((model, index) => {
                  let bc = getTensColor(parseInt(model.atelier) - 1, "bg");
                  let fc = getTensColor(parseInt(model.atelier) - 1, "fg");
                  return (
                    <>
                      <tr
                        key={index}
                        className={`leading-3 ${
                          index % 2 ? "bg-white" : "bg-stone-200"
                        } bg-opacity-50 `}
                      >
                        <td className="px-1 py-1 text-center">
                          {model.konkurs}
                        </td>
                        <td className="px-1 py-1">
                          <p
                            className={`leading-5 text-center px-1 py-2 ${bc} ${fc}`}
                          >
                            {model.atelier}
                          </p>
                        </td>
                        <td className="leading-5 px-1 py-1">{model.nazwa}</td>
                        <td className="px-1 py-1">{model.points}</td>
                        {user.admin == 1 && (
                          <td className="px-1 py-1">{model.total}</td>
                        )}
                        <td className="px-1 py-1">
                          <button
                            onClick={() => handleAddPoint(model)}
                            className="max-w-36 flex justify-end bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold py-2 px-4 border border-gray-600 rounded shadow"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 15l7-7 7 7"
                              />
                            </svg>
                          </button>
                        </td>
                        <td className="hidden xl:inline md:inline px-1 py-1">
                          <button
                            onClick={() => handleReducePoint(model)}
                            className="hidden xl:block md:block max-w-36 flex justify-end bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold py-2 px-4 border border-gray-600 rounded shadow"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                        </td>
                        <td className="px-1 py-2">
                          <input
                            id={`checkBox${index}`}
                            type="checkbox"
                            checked={model.flaga}
                            onChange={() => handleAnotherPrix(model)}
                            value=""
                            className="w-6 h-6 mt-0 xl:mt-2 bg-gray-100 border-navy-300 rounded focus:ring-navy-500 focus:ring-2"
                          />
                        </td>
                      </tr>
                    </>
                  );
                })}
              </>
            </tbody>
          </table>
        </div>
        {Object(models).length > 0 && (
          <div className="max-w-2xl grid justify-items-center p-5">
            <button
              className="w-max bg-indigo-500 hover:bg-indigo-300 text-zinc-50 font-semibold py-2 px-4 border border-indigo-500 hover:border-indigo-300 hover:text-zinc-200 rounded shadow"
              onClick={handleSaveResults}
            >
              Zapisz
            </button>
          </div>
        )}
      </div>
      <ProgressBarDialog
        open={sendResults}
        positionProgress={positionProgress}
        konkurs={konkursToProgress}
      />
    </>
  );
}

export default Jury;
