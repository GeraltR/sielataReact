import { useState } from "react";
import ClassRadioButton from "../components/toform/ClassRadioButton";
import axios from "../api/axios";
import { appParameters, getTensColor } from "../components/main/Common";
import { useEffect } from "react";
import ModalSpinner from "../components/main/ModalSpinner";

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
      setModels(data.models);
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
      //console.log("aaa");
      //models.models.map((model) => console.log(model));
    }
  }, [valueCategoryId]);

  return (
    <>
      <ModalSpinner visibled={loading} />
      <div className="grid divide-y m-5 justify-items-center">
        <div className="max-w-2xl justify-items-center p-5">
          <ClassRadioButton
            OnClickClassModel={setClassModelValue}
            categoriesFiltr={classModelValue}
            setValueCategoryId={setValueCategoryId}
            categories={categories}
            valueCategoryId={valueCategoryId}
          />
        </div>
        <div className="max-w-2xl justify-items-center p-5">
          <table className="table-auto w-full">
            <thead>
              <tr className=" bg-orange-300">
                <th scope="col" className="px-1 py-2 text-left w-[3%]">
                  Numer
                </th>
                <th scope="col" className="px-1 py-2 text-left w-[5%]">
                  Atelier
                </th>
                <th
                  scope="col"
                  className="px-1 py-2 text-left w-[75%] text-left"
                >
                  Nazwa
                </th>
                <th scope="col" className="px-1 py-2 w-[10%] text-left">
                  Punkty
                </th>
                <th scope="col" className="px-1 py-2 w-[10%] text-left">
                  Suma
                </th>
                <th scope="col" className="px-1 py-2 w-[15%] text-left"></th>
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
                        <td className="px-1 py-2">{model.total}</td>
                        <td className="px-1 py-2">
                          <button
                            onClick={() => handleAddPoint(model)}
                            className="max-w-36 flex justify-end xl:mt-auto ml-2 xl:ml-0 mr-2 xl:mr-1 md:mr-auto mb-2 xl:mb-0 bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold py-2 px-4 border border-gray-600 rounded shadow"
                          >
                            Dodaj
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Jury;
