import { useState } from "react";
import ClassRadioButton from "../components/toform/ClassRadioButton";
import axios from "../api/axios";
import { appParameters, getTensColor } from "../components/main/Common";
import { useEffect } from "react";
import ModalSpinner from "../components/main/ModalSpinner";
import useAuthContext from "../context/AuthContext";
import ProgressBarDialog from "../components/dialogs/ProgressBarDialog";
import { json } from "react-router-dom";

function Jury() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState({
    categories: [],
    loading: true,
  });
  const [classModelValue, setClassModelValue] = useState("K");
  const [valueCategoryId, setValueCategoryId] = useState(4);
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const [models, setModels] = useState([]);
  const [totalPointsInCategory, setTotalPointsInCategory] = useState(6);
  const [sendResults, setSendResults] = useState(false);
  const [positionProgress, setPositionProgress] = useState(0);

  const { user } = useAuthContext();
  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getCategories = async () => {
    await csrf();
    const { data } = await axios.get(`/api/categories/${appParameters.year}`);
    if (data.status === 200)
      setCategories({ categories: data.categories, loading: false });
    setLoading(false);
  };

  const getModels4Classes = async () => {
    //await csrf();
    try {
      const { data } = await axios.get(`/api/list2points/${valueCategoryId}/0`);
      {
        setModels(data.models);
        let points = 6;
        data.models.map((item) => {
          if (item.points != null) points = points - parseInt(item.points);
        });
        setTotalPointsInCategory(points);
        console.log("Total:" + points);
      }
      //console.log(models);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (isFirstOpen) {
      getCategories();
      setIsFirstOpen(false);
    } else {
      getModels4Classes();
    }
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

  const sendItemToApi = async (item) => {
    console.log("Item" + JSON.stringify(item));
    await axios.post(`/api/set_points/${user.id}`, JSON.stringify(item));
  };

  const handleSaveResults = async () => {
    setPositionProgress(0);
    setSendResults(true);
    await Promise.all(
      models.map(async (model) => {
        await sendItemToApi(model);
        setPositionProgress((prev) => (prev = prev + 1));
      })
    );
    setSendResults(false);
  };

  const handleCloseProgress = () => {
    setSendResults(false);
  };

  return (
    <>
      <ModalSpinner visibled={loading} />
      <div className="grid divide-y xl:m-5 md:m-5 sm:m-0 justify-items-center">
        <div className="max-w-2xl justify-items-center p-5">
          <ClassRadioButton
            OnClickClassModel={setClassModelValue}
            categoriesFiltr={classModelValue}
            setValueCategoryId={setValueCategoryId}
            categories={categories}
            valueCategoryId={valueCategoryId}
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
                  className="px-1 py-2 w-[10%] text-left before:content-['P'] md:before:content-['Punkty'] xl:before:content-['Punkty'] "
                ></th>
                {user.admin == 1 && (
                  <th
                    scope="col"
                    className="px-1 py-2 w-[10%] sm:w-[3%] text-left before:content-['S'] md:before:content-['Suma'] xl:before:content-['Suma'] "
                  ></th>
                )}
                <th className="hidden xl:block md:block px-1 py-2 w-[10%] sm:w-[5%] text-right"></th>
                <th
                  scope="col"
                  className="px-1 py-2 w-[10%] sm:w-[5%] text-right"
                >
                  Total: {totalPointsInCategory}
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
                        className={`${
                          index % 2 ? "bg-white" : "bg-stone-200"
                        } bg-opacity-50 `}
                      >
                        <td className="px-1 py-2">{model.konkurs}</td>
                        <td className="px-1 py-2">
                          <p className={`px-1 py-2 ${bc} ${fc}`}>
                            {model.atelier}
                          </p>
                        </td>
                        <td className="px-1 py-2">{model.nazwa}</td>
                        <td className="px-1 py-2">{model.points}</td>
                        {user.admin == 1 && (
                          <td className="px-1 py-2">{model.total}</td>
                        )}
                        <td className="px-1 py-2">
                          <button
                            onClick={() => handleAddPoint(model)}
                            className="max-w-36 flex justify-end xl:mt-auto ml-2 xl:ml-0 mr-2 xl:mr-1 md:mr-auto mb-2 xl:mb-0 bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold py-2 px-4 border border-gray-600 rounded shadow"
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
                        <td className="hidden xl:flex md:flex px-1 py-2">
                          <button
                            onClick={() => handleReducePoint(model)}
                            className="max-w-36 flex justify-end xl:mt-[0px] ml-2 xl:ml-0 mr-2 xl:mr-1 md:mr-auto mb-2 xl:mb-0 bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold py-2 px-4 border border-gray-600 rounded shadow"
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
        <div className="max-w-2xl grid justify-items-center p-5">
          <button
            className="w-max bg-indigo-500 hover:bg-indigo-300 text-zinc-50 font-semibold py-2 px-4 border border-indigo-500 hover:border-indigo-300 hover:text-zinc-200 rounded shadow"
            onClick={handleSaveResults}
          >
            Zapisz
          </button>
        </div>
      </div>
      <ProgressBarDialog
        open={sendResults}
        handleAgree={handleCloseProgress}
        positionProgress={positionProgress}
      />
    </>
  );
}

export default Jury;
