import { useEffect, useState } from "react";
import ClassRadioButton from "../components/toform/ClassRadioButton";
import useAuthContext from "../context/AuthContext";
import ModalSpinner from "../components/main/ModalSpinner";

function Prixes() {
  const [loading, setLoading] = useState(true);
  const [classModelValue, setClassModelValue] = useState("K");
  const [valueCategoryIdOd, setValueCategoryIdOd] = useState(4);
  const [valueCategoryIdDo, setValueCategoryIdDo] = useState(4);

  const { categories } = useAuthContext();

  const handleMoveModelFromCategory = () => {
    console.log(`Od: ${valueCategoryIdOd} ... do ${valueCategoryIdDo}`);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <ModalSpinner visibled={loading} />
      <section className="block xl:grid xl:col-span-2 md:grid md:col-span-1 gap-8 p-1 h-max">
        <div className="xl:flex md:grid w-[100%] xl:w-[100%] md:w-[100%] bg-white bg-opacity-30 rounded-lg shadow-md shadow-gray-200">
          <div className="grid divide-y xl:m-5 md:m-5 sm:m-0 justify-items-center">
            <h3 className="text-2xl font-medium text-gray-800">
              Łączenie kategorii
            </h3>
            <div className="max-w-2xl justify-items-center p-5">
              <span className="text-lg font-bold">Zawodników z klasy:</span>
              <ClassRadioButton
                OnClickClassModel={setClassModelValue}
                categoriesFiltr={classModelValue}
                setValueCategoryId={setValueCategoryIdOd}
                categories={categories}
                valueCategoryId={valueCategoryIdOd}
                Od
                kartonName="od"
                plastikName="od"
              />
            </div>
            <div className="max-w-2xl justify-items-center p-5">
              <span className="text-lg font-bold">przenieś do klasy:</span>
              <ClassRadioButton
                OnClickClassModel={setClassModelValue}
                categoriesFiltr={classModelValue}
                setValueCategoryId={setValueCategoryIdDo}
                categories={categories}
                valueCategoryId={valueCategoryIdDo}
                kartonName="do"
                plastikName="do"
              />
            </div>
            <div className="max-w-2xl grid justify-items-center p-5">
              <button
                className="w-max bg-indigo-500 hover:bg-indigo-300 text-zinc-50 font-semibold py-2 px-4 border border-indigo-500 hover:border-indigo-300 hover:text-zinc-200 rounded shadow"
                onClick={handleMoveModelFromCategory}
              >
                Przenieś
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Prixes;
