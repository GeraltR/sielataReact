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
      <Statistics />
      <div className="print:hidden md:grid md:col-span-1 w-auto mb-4 xl:mb-0 md:mb-0 mx-4
           items-center px-6 py-0 bg-white bg-opacity-30 rounded-lg shadow-md shadow-gray-200 h-13">
        <h3 className="text-2xl font-medium text-gray-800 mr-3 py-0">Filtruj</h3>
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
      <div className="print:hidden md:grid md:col-span-1 w-auto mb-4 xl:mb-0 md:mb-0 mx-4  items-center px-6 py-8 bg-white bg-opacity-30 rounded-lg shadow-md shadow-gray-200 h-auto">
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
      <div className="grid m-0 xl:m-4 items-center px-6 py-8 bg-white bg-opacity-30 rounded-lg shadow-md shadow-gray-200 h-13">
        <table className="table-auto">
          <thead>
            <tr className=" bg-orange-300">
              <th className="w-[3%]">LP</th>
              <th className="hidden xl:table-cell w-[3%]">Nr</th>
              <th className="w-[3%] before:content-['Nr'] md:before:content-['Nr'] xl:before:content-['Nr\00a0karty']"></th>
              <th
                scope="col"
                className="px-1 py-2 text-left before:content-['Model'] md:before:content-['Nazwa\00a0modelu'] xl:before:content-['Nazwa\00a0modelu']"
              ></th>
              <th
                scope="col"
                className="px-1 py-2 w-[35%] text-left before:content-['Kto'] md:before:content-['Zawodnik'] xl:before:content-['Imie\00a0i\00a0nazwisko\00a0zawodnika']"
              ></th>
              <th
                scope="col"
                className="px-1 py-2 w-[20%] text-left before:content-['K'] md:before:content-['Klasa'] xl:before:content-['Kategoria\00a0i\00a0klasa']"
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
              <th className="hidden xl:table-cell"></th>
              <th className="hidden xl:table-cell"></th>
            </tr>
          </thead>
          <tbody>
            {listModels.map((model, index) => {
              return (
                <tr
                  key={index}
                  className={`${
                    index % 2 ? "bg-white" : "bg-stone-200"
                  } bg-opacity-30 `}
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
                  <td className="hidden xl:table-cell">
                    <button
                      onClick={() => handleModelCard(model)}
                      className="max-w-36 flex justify-end xl:mt-auto ml-2 xl:ml-0 mr-2 xl:mr-1 md:mr-auto mb-2 xl:mb-0 bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold py-2 px-4 border border-gray-600 rounded shadow"
                    >
                      Karta
                    </button>
                  </td>
                  <td className="hidden xl:table-cell">
                    <button
                      onClick={() => handleUpdate(model)}
                      className="max-w-36 flex justify-end xl:mt-auto ml-2 xl:ml-0 mr-2 xl:mr-1 md:mr-auto mb-2 xl:mb-0 bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold py-2 px-4 border border-gray-600 rounded shadow"
                    >
                      Dyplom
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListResults;
