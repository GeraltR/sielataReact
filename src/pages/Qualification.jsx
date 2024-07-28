import { useEffect, useState } from "react";
import axios from "../api/axios";
import useAuthContext from "../context/AuthContext";
import ModalSpinner from "../components/main/ModalSpinner";
import ClassRadioButton from "../components/toform/ClassRadioButton";

function Qualification() {
  const [loading, setLoading] = useState(false);
  const [classModelValue, setClassModelValue] = useState("K");
  const [valueCategoryId, setValueCategoryId] = useState(4);
  const [models, setModels] = useState([]);

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
      {
        setModels(data.models);
      }
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getModels4Classes();
  }, [valueCategoryId]);

  const handleSaveCategoryResult = () => {
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

            <div className="max-w-2xl justify-items-center sm:p-5 md:p-5 sm:p-0 mb-2">
              <table className="table-auto w-full">
                <thead>
                  <tr className=" bg-orange-300">
                    <th
                      scope="col"
                      className="px-1 py-2 text-left w-[25%] before:content-['Nr'] md:before:content-['Numer'] xl:before:content-['Numer']"
                    ></th>
                    <th
                      scope="col"
                      className="px-1 py-2 text-left w-[5%] before:content-['Kto'] md:before:content-['Zawodnik'] xl:before:content-['Zawodnik'] "
                    ></th>
                    <th
                      scope="col"
                      className="px-1 py-2 text-left w-[75%] text-left"
                    >
                      Model
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-2 w-[10%] text-left before:content-['P'] md:before:content-['Punkty'] xl:before:content-['Punkty']"
                    ></th>
                    <th
                      scope="col"
                      className="px-1 py-2 w-[15%] sm:w-[3%] before:content-['W'] md:before:content-['Wyróżnienie'] xl:before:content-['Wyróżnienie']"
                    ></th>
                    <th
                      scope="col"
                      className="px-1 py-2 w-[15%] sm:w-[3%] before:content-['A'] md:before:content-['Propozycja'] xl:before:content-['Propozycja']"
                    ></th>
                    <th
                      scope="col"
                      className="px-1 py-2 w-[10%] sm:w-[5%] text-right before:content-['M'] md:before:content-['Miejsce'] xl:before:content-['Miejsce']"
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
                            <td className="px-1 py-1">
                              {model.imie} {model.nazwisko}
                            </td>
                            <td className="leading-5 px-1 py-1">
                              {model.nazwa}
                            </td>
                            <td className="px-1 py-1">{model.total}</td>
                            <td className="px-1 py-1">
                              {model.flaga >= 1 ? "Wyróżninie" : ""}
                            </td>
                            <td className="px-1 py-1 text-align-center">
                              {model.place < 4
                                ? model.place != 0
                                  ? model.place
                                  : ""
                                : ""}
                            </td>
                            <td className="px-1 py-1">
                              <select
                                key={`sel${index}`}
                                value={model.wynik}
                                className={`${placeColors[model.wynik]}`}
                                onChange={(e) => handleChangePlaces(model, e)}
                              >
                                <option
                                  value="0"
                                  className={`${placeColors[0]}`}
                                >
                                  -- brak klasyfikacji --
                                </option>
                                <option
                                  value="1"
                                  className={`${placeColors[1]}`}
                                >
                                  Pierwsze
                                </option>
                                <option
                                  value="2"
                                  className={`${placeColors[2]}`}
                                >
                                  Drugie
                                </option>
                                <option
                                  value="3"
                                  className={`${placeColors[3]} "text-slate-50"`}
                                >
                                  Trzecie
                                </option>
                                <option
                                  value="4"
                                  className={`${placeColors[4]}`}
                                >
                                  Wyróżnienie
                                </option>
                              </select>
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
      </section>
    </>
  );
}

export default Qualification;
