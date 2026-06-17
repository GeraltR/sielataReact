import { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuthContext from "../context/AuthContext";
import ModalSpinner from "../components/main/ModalSpinner";
import ClassRadioButton from "../components/toform/ClassRadioButton";
import ProgressBarDialog from "../components/dialogs/ProgressBarDialog";

function Qualification() {
  const [loading, setLoading] = useState(false);
  const [classModelValue, setClassModelValue] = useState("K");
  const [valueCategoryId, setValueCategoryId] = useState(0);
  const [models, setModels] = useState([]);
  const [sendResults, setSendResults] = useState(false);
  const [positionProgress, setPositionProgress] = useState(0);
  const [konkursToProgress, setKonkursToProgress] = useState(0);

  const placeColors = [
    "bg-neutral-100",
    "bg-yellow-500",
    "bg-cyan-300",
    "bg-amber-700",
    "bg-red-500",
  ];

  const { categories } = useAuthContext();

  const getModels4Classes = async () => {
    try {
      const { data } = await axios.get(`/api/ratingmodels/${valueCategoryId}`);
      setModels(data.models);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getModels4Classes();
  }, [valueCategoryId]);

  const handleSaveCategoryResult = async () => {
    setPositionProgress(0);
    setKonkursToProgress(0);
    const step = Math.floor(100 / Object(models).length);
    setSendResults(true);
    for (let item of models) {
      let result = {
        id: item.id,
        model_id: item.id,
        wynik: item.wynik == null ? 0 : item.wynik,
      };
      await axios.post(`/api/saverating`, JSON.stringify(result));
      setPositionProgress((prev) => (prev = prev + step));
      setKonkursToProgress(item.konkurs);
    }
    setSendResults(false);
    console.log("Wyniki");
  };

  const handleChangePlaces = (model, e) => {
    model.wynik = parseInt(e.target.value);
    setModels((prevModels) => {
      return prevModels.map((item) => {
        return item.id === model.id ? { ...item, wynik: model.wynik } : item;
      });
    });
  };

  return (
    <>
      <ModalSpinner visibled={loading} />
      <section className="block xl:grid xl:col-span-2 md:grid md:col-span-1 gap-8 p-1 h-max">
        <div className="xl:flex md:grid w-[100%] xl:w-[100%] md:w-[100%] bg-white bg-opacity-30 rounded-lg shadow-md shadow-gray-200">
          <div className="grid divide-y xl:m-5 md:m-5 sm:m-0 justify-items-center">
            <h3 className="text-2xl font-medium text-gray-800">
              Określanie wyników
            </h3>
            <div className="max-w-2xl justify-items-center p-5">
              <span className="text-lg font-bold">Pokaż modele z klasy:</span>
              <ClassRadioButton
                OnClickClassModel={setClassModelValue}
                categoriesFiltr={classModelValue}
                setValueCategoryId={setValueCategoryId}
                categories={categories}
                valueCategoryId={valueCategoryId}
                kartonName="place"
                plastikName="place"
              />
            </div>

            <div className="w-full px-2 md:p-5 mt-4 mb-2 overflow-x-auto">
              <table className="table-auto w-fit text-xs md:text-base">
                <thead>
                  <tr className=" bg-orange-300 leading-8">
                    <th
                      scope="col"
                      className="px-1 py-2 text-center w-[10%] before:content-['Nr'] md:before:content-['Numer'] xl:before:content-['Numer']"
                    ></th>
                    <th
                      scope="col"
                      className="px-1 py-2 text-center w-[25%] before:content-['Kto'] md:before:content-['Zawodnik'] xl:before:content-['Zawodnik'] "
                    ></th>
                    <th
                      scope="col"
                      className="px-1 py-2 text-center w-[55%] text-left"
                    >
                      Model
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-2 w-[5%] text-center before:content-['P'] md:before:content-['Punkty'] xl:before:content-['Punkty']"
                    ></th>
                    <th
                      scope="col"
                      className="px-1 py-2 w-[5%] sm:w-[3%] text-center before:content-['W'] md:before:content-['Wyróżnienie'] xl:before:content-['Wyróżnienie']"
                    ></th>
                    <th
                      scope="col"
                      className="px-1 py-2 w-[5%] sm:w-[3%] text-center before:content-['A'] md:before:content-['Propozycja'] xl:before:content-['Propozycja']"
                    ></th>
                    <th
                      scope="col"
                      className="px-2 py-2 w-[5%] sm:w-[5%] text-right before:content-['M'] md:before:content-['Miejsce'] xl:before:content-['Miejsce']"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {models.map((model, index) => {
                      return (
                        <>
                          <tr
                            key={index}
                            className={`leading-3 ${
                              model.wynik != 0
                                ? placeColors[model.wynik]
                                : index % 2
                                ? "bg-white"
                                : "bg-stone-200"
                            } bg-opacity-50
                            ${model.wynik < 3 ? "text-black" : "text-white"}
                            ${model.wynik != 0 ? "font-bold" : "font-normal"}
                            `}
                          >
                            <td className="px-1 py-1 text-center">
                              {model.konkurs}
                            </td>
                            <td className="leading-5 px-1 py-1">
                              {model.imie} {model.nazwisko}
                            </td>
                            <td className="leading-5 px-1 py-1">
                              {model.nazwa}
                            </td>
                            <td className="px-1 py-1 text-center">
                              {model.total_points}
                            </td>
                            <td
                              className={`${
                                model.flaga >= 1
                                  ? "before:content-['W'] md:before:content-['Wyróżnienie'] xl:before:content-['Wyróżnienie']"
                                  : "''"
                              }
                                px-1 py-1 text-center`}
                            ></td>
                            <td className="px-1 py-1 text-center">
                              {model.place < 4
                                ? model.place != 0 &&
                                  model.total_points != null &&
                                  model.total_points != 0
                                  ? model.place
                                  : ""
                                : ""}
                            </td>
                            <td className="px-1 py-1">
                              <div className="relative w-20 md:w-max xl:w-max">
                              <select
                                key={`sel${index}`}
                                value={model.wynik}
                                className={`appearance-none ${
                                  placeColors[model.wynik]
                                } text-xs md:text-base xl:text-base w-full pr-7`}
                                onChange={(e) => handleChangePlaces(model, e)}
                              >
                                <option
                                  value="0"
                                  title="-- brak klasyfikacji --"
                                  className={`${placeColors[0]}`}
                                >
                                  -- brak klasyfikacji --
                                </option>
                                <option
                                  value="1"
                                  title="Pierwsze"
                                  className={`${placeColors[1]}`}
                                >
                                  Pierwsze
                                </option>
                                <option
                                  value="2"
                                  title="Drugie"
                                  className={`${placeColors[2]}`}
                                >
                                  Drugie
                                </option>
                                <option
                                  value="3"
                                  title="Trzecie"
                                  className={`${placeColors[3]} "text-slate-50"`}
                                >
                                  Trzecie
                                </option>
                                <option
                                  value="4"
                                  title="Wyróżnienie"
                                  className={`${placeColors[4]}`}
                                >
                                  Wyróżnienie
                                </option>
                              </select>
                              <div className={`pointer-events-none absolute inset-y-0 right-0 w-7 flex items-center justify-center border-l border-gray-400 ${placeColors[model.wynik]}`}>
                                <svg className="w-3 h-3 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                              </div>
                              </div>
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
                  onClick={handleSaveCategoryResult}
                >
                  Zapisz
                </button>
              </div>
            )}
          </div>
        </div>
        <ProgressBarDialog
          open={sendResults}
          positionProgress={positionProgress}
          konkurs={konkursToProgress}
        />
      </section>
    </>
  );
}

export default Qualification;
