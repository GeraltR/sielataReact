import { useEffect, useState } from "react";
import axios from "../api/axios";
import ModalSpinner from "../components/main/ModalSpinner";
import CheckboxLink from "../components/main/CheckboxLink";
import { useNavigate } from "react-router-dom";
import NumberInput from "../components/toform/NumberInput";
import ScrollToTopButton from "../components/main/ScrollToTopButton";
import Statistics from "./special/Statistics";

function ListResults() {
  const [loading, setLoading] = useState(false);
  const [listModels, setListModels] = useState([]);
  const filters = [
    {
      id: 0,
      name: "karton",
      description: "Karton",
      value: true,
    },
    {
      id: 1,
      name: "plastik",
      description: "Plastik",
      value: true,
    },
    {
      id: 2,
      name: "mlodzik",
      description: "Młodzik",
      value: true,
    },
    {
      id: 3,
      name: "junior",
      description: "Junior",
      value: true,
    },
    {
      id: 4,
      name: "senior",
      description: "Senior",
      value: true,
    },
  ];
  const [filterCheck, setFilterCheck] = useState(
    new Array(filters.length).fill(true)
  );
  const [printPageFrom, setPrintPageFrom] = useState(0);
  const [printPageTo, setPrintPageTo] = useState(0);

  const navigateToPrintModelCard = useNavigate();

  function getCheckValue(name) {
    return filterCheck[filters.map((ex) => ex.name).indexOf(name)];
  }

  function getClassFilter() {
    const plastik = getCheckValue("plastik");
    const karton = getCheckValue("karton");
    if ((plastik && karton) || (!plastik && !karton)) return 0;
    else return plastik ? 2 : 1;
  }

  function getAgeFilter() {
    const senior = getCheckValue("senior") ? 4 : 0;
    const junior = getCheckValue("junior") ? 2 : 0;
    const mlodzik = getCheckValue("mlodzik") ? 1 : 0;
    return mlodzik + junior + senior;
  }

  const getListModels = async () => {
    //await csrf();
    const { data } = await axios.get(
      `/api/listModels/classfilter/${getClassFilter()}/category/0/age/${getAgeFilter()}/name/&`
    );
    if (data.status === 200) {
      setListModels(data.models);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getListModels();
  }, [filterCheck]);

  const handlekartonChecked = (e) => {
    const updatedCheckedState = filterCheck.map((item, index) =>
      index === e ? !item : item
    );
    setFilterCheck(updatedCheckedState);
  };

  const handleModelCard = (model) => {
    navigateToPrintModelCard(`/printmodelcard?model=${model.id}`);
  };

  const getIdModelFromList = (find) => {
    let modelid = 0;
    listModels.map((item, index) => {
      if (index <= find) modelid = item.id;
    });
    return modelid;
  };

  const handlePrintModelCard = () => {
    navigateToPrintModelCard(
      `/printmodelcard?model=${getIdModelFromList(
        printPageFrom - 1
      )}-${getIdModelFromList(
        (printPageTo <= 0 ? printPageFrom : printPageTo) - 1
      )}klasa=${getClassFilter()}`
    );
  };

  return (
    <>
      <ModalSpinner visibled={loading} />
      <ScrollToTopButton />
      <div className="print:hidden mt-2 mx-4 mb-4 xl:mb-4 bg-white rounded-lg shadow-md shadow-gray-200">
        <Statistics />
        <div className="px-6 py-4">
          <h3 className="text-2xl font-medium text-gray-800 mb-2">Filtruj</h3>
          <div className="w-full grid grid-flow-dense grid-cols-1 md:grid-cols-3 xl:grid-cols-5
          gap-1 auto-cols-max m-auto mb-2">
            {filters.map((name, index) => (
              <div key={name.id} className="items-center">
                <CheckboxLink
                  name={name.name}
                  description={name.description}
                  linkText=""
                  linkAddress={null}
                  errorText=""
                  isError={false}
                  checked={filterCheck[index]}
                  value={name.value}
                  onChange={() => handlekartonChecked(index)}
                  disabled={loading}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-4">
          <div className="w-full grid grid-flow-dense grid-cols-1 md:grid-cols-3 xl:grid-flow-col gap-4 auto-cols-max">
            <div className="m-auto mt-5 mb-0">
              <NumberInput
                text="od LP"
                name="fromPage"
                minValue={1}
                maxValue={printPageTo}
                value={printPageFrom}
                onChange={setPrintPageFrom}
              />
            </div>
            <div className="m-auto">
              <NumberInput
                text="do LP"
                name="toPage"
                minValue={printPageFrom}
                maxValue={5000}
                value={printPageTo > printPageFrom ? printPageTo : printPageFrom}
                onChange={setPrintPageTo}
              />
            </div>
            <div className="ml-[40%] md:ml-0">
              <button
                onClick={handlePrintModelCard}
                className="max-w-64 flex justify-items-end bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold
                mt-2 py-2 px-4 border border-gray-600 rounded shadow"
              >
                Drukuj
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 xl:m-4 py-4 bg-white bg-opacity-30 rounded-lg shadow-md shadow-gray-200">
        {/* Mobile card layout */}
        <div className="md:hidden space-y-2 px-3">
          {listModels.map((model, index) => (
            <div
              key={index}
              className={`rounded-lg p-3 ${index % 2 ? "bg-white" : "bg-stone-200"} bg-opacity-60`}
            >
              <div className="flex justify-between items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold">
                    {parseInt(index) + 1}. {model.nazwa}
                  </div>
                  <div className="text-sm text-gray-700 mt-0.5">
                    {model.imie} {model.nazwisko}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`${
                        model.klasa === "K" ? "bg-lime-600" : "bg-amber-800"
                      } text-white font-bold text-xs px-1`}
                    >
                      &nbsp;{model.klasa}&nbsp;
                    </span>
                    <span className="text-xs text-gray-600">
                      {model.symbol} {model.categoryName}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Nr startowy: {model.konkurs}
                  </div>
                </div>
                <button
                  onClick={() => handleModelCard(model)}
                  className="shrink-0 bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold py-2 px-3 border border-gray-600 rounded shadow text-sm"
                >
                  Karta
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto px-6 py-4">
          <table className="table-auto">
            <thead>
              <tr className=" bg-orange-300">
                <th className="w-[3%]">LP</th>
                <th className="hidden xl:table-cell w-[3%]">Nr</th>
                <th className="w-[3%] before:content-['Nr'] xl:before:content-['Nr\00a0karty']"></th>
                <th
                  scope="col"
                  className="px-1 py-2 text-left before:content-['Nazwa\00a0modelu'] xl:before:content-['Nazwa\00a0modelu']"
                ></th>
                <th
                  scope="col"
                  className="px-1 py-2 w-[35%] text-left before:content-['Zawodnik'] xl:before:content-['Imie\00a0i\00a0nazwisko\00a0zawodnika']"
                ></th>
                <th
                  scope="col"
                  className="px-1 py-2 w-[20%] text-left before:content-['Klasa'] xl:before:content-['Kategoria\00a0i\00a0klasa']"
                ></th>
                <th
                  scope="col"
                  className="hidden xl:table-cell px-1 py-2 w-[10%] text-left"
                >
                  Miasto
                </th>
                <th
                  scope="col"
                  className="hidden xl:table-cell px-1 py-2 w-[10%] text-left"
                >
                  Kategoria wiekowa
                </th>
                <th className="hidden md:table-cell"></th>
              </tr>
            </thead>
            <tbody>
              {listModels.map((model, index) => {
                return (
                  <tr
                    key={index}
                    className={`${
                      index % 2 ? "bg-white" : "bg-stone-200"
                    } bg-opacity-30`}
                  >
                    <td className="px-1 py-2">{parseInt(index) + 1}</td>
                    <td className="hidden xl:table-cell px-1 py-2">{model.id}</td>
                    <td className="px-1 py-2">{model.konkurs}</td>
                    <td className="px-1 py-2">{model.nazwa}</td>
                    <td className="px-1 py-2">
                      {model.imie} {model.nazwisko}
                    </td>
                    <td className="px-1 py-2">
                      <span
                        className={`${
                          model.klasa === "K" ? "bg-lime-600" : "bg-amber-800"
                        } text-white font-bold`}
                      >
                        &nbsp;{model.klasa}&nbsp;
                      </span>{" "}
                      <span className="hidden xl:table-cell">
                        {model.symbol} {model.categoryName}
                      </span>
                    </td>
                    <td className="hidden xl:table-cell px-1 py-2">
                      {model.miasto}
                    </td>
                    <td className="hidden xl:table-cell px-1 py-2">
                      {model.kategoriaWiek}
                    </td>
                    <td className="hidden md:table-cell px-1 py-4 align-middle">
                      <button
                        onClick={() => handleModelCard(model)}
                        className="shrink-0 bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold py-2 px-4 border border-gray-600 mr-8 rounded shadow"
                      >
                        Karta
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ListResults;
