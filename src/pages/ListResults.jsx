import { useEffect, useState } from "react";
import axios from "../api/axios";
import ModalSpinner from "../components/main/ModalSpinner";
import CheckboxLink from "../components/main/CheckboxLink";

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
      `/api/listModels/classfilter/${getClassFilter()}/category/0/age/${getAgeFilter()}/name/""`
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

  return (
    <>
      <ModalSpinner visibled={loading} />
      <div className="xl:flex md:grid md:col-span-1 w-[100%] xl:w-[100%] m-3 md:w-[100%] mb-4 xl:mb-0 md:mb-0 mr-0 xl:mr-0 md:mr-0 items-center px-6 py-8 bg-white bg-opacity-30 rounded-lg shadow-md shadow-gray-200 h-13">
        <h3 className="text-2xl font-medium text-gray-800 mr-3">Filtruj</h3>
        <div className="w-[100%] grid grid-cols-4 gap-4 mb-2 m-auto xl:mb-auto">
          {filters.map((name, index) => (
            <div key={name.id} className="flex items-center">
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
          <div className="m-auto">
            <button className="max-w-36 flex justify-end xl:mt-auto ml-2 xl:ml-0 mr-2 xl:mr-1 md:mr-auto mb-2 xl:mb-0 bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold py-2 px-4 border border-gray-600 rounded shadow">
              Filtruj
            </button>
          </div>
        </div>
      </div>
      <div className="xl:flex md:grid md:col-span-1 w-[100%] xl:w-[100%] m-3 md:w-[100%] mb-4 xl:mb-0 md:mb-0 mr-0 xl:mr-0 md:mr-0 items-center px-6 py-8 bg-white bg-opacity-30 rounded-lg shadow-md shadow-gray-200 h-13">
        <table className="table-auto w-full">
          <tr className=" bg-orange-300">
            <th className="w-[3%]">LP</th>
            <th className="w-[3%]">Nr</th>
            <th scope="col" className="px-1 py-2 text-left">
              Nazwa modelu
            </th>
            <th scope="col" className="px-1 py-2 w-[35%] text-left">
              Imie i nazwisko zawodnika
            </th>
            <th scope="col" className="px-1 py-2 w-[20%] text-left">
              kategoria i klasa
            </th>
            <th scope="col" className="px-1 py-2 w-[10%] text-left">
              Miasto
            </th>
            <th scope="col" className="px-1 py-2 w-[10%] text-left">
              Kategoria wiekowa
            </th>
            <th></th>
            <th></th>
          </tr>

          {listModels.map((model, index) => {
            return (
              <tr
                key={index}
                className={`${
                  index % 2 ? "bg-white" : "bg-stone-200"
                } bg-opacity-30 `}
              >
                <td className="px-1 py-2">{parseInt(index) + 1}</td>
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
                  {model.symbol} {model.categoryName}
                </td>
                <td className="px-1 py-2">{model.miasto}</td>
                <td className="px-1 py-2">{model.kategoriaWiek}</td>
                <td>
                  <button
                    onClick={() => handleUpdate(model)}
                    className="max-w-36 flex justify-end xl:mt-auto ml-2 xl:ml-0 mr-2 xl:mr-1 md:mr-auto mb-2 xl:mb-0 bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold py-2 px-4 border border-gray-600 rounded shadow"
                  >
                    Karta
                  </button>
                </td>
                <td>
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
        </table>
      </div>
    </>
  );
}

export default ListResults;
