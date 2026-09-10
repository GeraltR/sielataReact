import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import ModalSpinner from "../components/main/ModalSpinner";
import CheckboxLink from "../components/main/CheckboxLink";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import NumberInput from "../components/toform/NumberInput";
import ScrollToTopButton from "../components/main/ScrollToTopButton";
import Statistics from "./special/Statistics";
import useAuthContext from "../context/AuthContext";
import festiwalLogo from "../assets/images/logofestiwal_git.png";
import GroupsIcon from "@mui/icons-material/Groups";
import FlightIcon from "@mui/icons-material/Flight";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import SettingsIcon from "@mui/icons-material/Settings";
import SchoolIcon from "@mui/icons-material/School";
import ChildCareIcon from "@mui/icons-material/ChildCare";

function MustacheIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}>
      <path d="M12,14.2c-1-2.3-3-3.6-5.6-3.1C3.8,11.6,2,13.5,2,16c1.1-1.3,2.6-1.9,4.3-1.5c1.8,0.4,3,1.7,3.5,3.1 c0.4-1.5,1.2-2.5,2.2-2.6c1,0.1,1.8,1.1,2.2,2.6c0.5-1.4,1.7-2.7,3.5-3.1c1.7-0.4,3.2,0.2,4.3,1.5c0-2.5-1.8-4.4-4.4-4.9 C15,10.6,13,11.9,12,14.2z" />
    </svg>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div
      className="grid items-center gap-4 rounded-2xl bg-white shadow-sm border border-gray-100 px-5 py-4 overflow-hidden"
      style={{ gridTemplateColumns: "3rem 1px 1fr auto" }}
    >
      <div className="w-12 h-12 rounded-full bg-green-50 text-green-700 flex items-center justify-center">
        {icon}
      </div>
      <div className="self-stretch bg-gray-200" />
      <div className="min-w-0 break-words text-sm font-printMedium text-gray-600 leading-tight">
        {label}
      </div>
      <div className="whitespace-nowrap text-right font-printBold text-2xl text-green-700">
        {value ?? "-"}
      </div>
    </div>
  );
}

function PrintStatistics({ festival }) {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [statistcs, setStatistics] = useState({});

  useEffect(() => {
    axios
      .get(`/api/statistics`)
      .then(({ data }) => setStatistics(data.statistics ?? {}))
      .catch((error) => console.log(error));
  }, []);

  const mainStats = [
    { label: "Modelarzy z modelami", value: statistcs.sumAllContestant, icon: <GroupsIcon fontSize="medium" /> },
    { label: "Zarejestrowanych modeli", value: statistcs.sumAllModels, icon: <FlightIcon fontSize="medium" /> },
    { label: "Modeli w klasie karton", value: statistcs.sumCarton, icon: <Inventory2Icon fontSize="medium" /> },
    { label: "Modeli w klasie plastik", value: statistcs.sumPlastic, icon: <SettingsIcon fontSize="medium" /> },
  ];

  const ageStats = [
    { label: "Młodzików", value: statistcs.sumYoung, icon: <ChildCareIcon fontSize="small" /> },
    { label: "Juniorów", value: statistcs.sumJunior, icon: <SchoolIcon fontSize="small" /> },
    { label: "Seniorów", value: statistcs.sumSenior, icon: <MustacheIcon width={20} height={20} /> },
  ];

  return (
    <>
      <button
        onClick={reactToPrintFn}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-2"
      >
        <span>🖨</span> Drukuj statystyki
      </button>
      <div
        ref={contentRef}
        className="hidden print:block relative overflow-hidden"
        style={{
          padding: "20mm",
          paddingBottom: "78mm",
          minHeight: "287mm",
          boxSizing: "border-box",
        }}
      >
        <div className="flex flex-col items-center text-center">
          <img
            src={festiwalLogo}
            alt="Logo festiwalu"
            style={{ width: "160px" }}
            className="mb-6"
          />
          <div className="flex items-center gap-4 w-full max-w-xl">
            <span className="h-px flex-1 bg-green-600" />
            <h1 className="shrink-0 text-3xl font-printBold uppercase tracking-wide text-green-700">
              {festival?.edition} Festiwal Modelarski
            </h1>
            <span className="h-px flex-1 bg-green-600" />
          </div>
          <p className="text-xl font-printMedium text-gray-600 mt-2">
            {festival?.city}
            {festival?.year ? `, ${festival.year}` : ""}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mt-10">
          {mainStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 max-w-2xl mx-auto mt-6 rounded-2xl bg-white shadow-sm border border-gray-100 px-6 py-4">
          {ageStats.map((stat, index) => (
            <div key={stat.label} className="flex items-center gap-6 shrink-0">
              {index > 0 && <span className="w-px h-8 bg-gray-200 shrink-0" />}
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-7 h-7 shrink-0 rounded-full bg-green-50 text-green-700 flex items-center justify-center">
                  {stat.icon}
                </span>
                <span className="font-printMedium text-gray-600 whitespace-nowrap">
                  {stat.label}
                </span>
                <span className="font-printBold text-2xl text-green-700 whitespace-nowrap">
                  {stat.value ?? "-"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <img
          src="/horizont.png"
          alt=""
          className="absolute bottom-0 left-0 w-full"
          style={{ display: "block" }}
        />
      </div>
    </>
  );
}

function ListResults() {
  const { festival } = useAuthContext();
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

  const handlePrintFilteredModelCard = () => {
    navigateToPrintModelCard(
      `/printmodelcard?classfilter=${getClassFilter()}&age=${getAgeFilter()}`
    );
  };

  return (
    <>
      <ModalSpinner visibled={loading} />
      <ScrollToTopButton />
      <div className="print:hidden mt-2 mx-4 mb-4 xl:mb-4 bg-white rounded-lg shadow-md shadow-gray-200">
        <Statistics />
        <div className="px-6 pb-4 flex justify-center">
          <PrintStatistics festival={festival} />
        </div>
        <div className="px-6 py-4">
          <h3 className="text-2xl font-medium text-gray-800 mb-2">Filtruj</h3>
          <div className="flex flex-col xl:flex-row xl:items-center gap-4">
            <div className="w-full grid grid-flow-dense grid-cols-1 md:grid-cols-3 xl:grid-cols-5
            gap-1 auto-cols-max m-auto mb-2 xl:mb-0">
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
            <button
              onClick={handlePrintFilteredModelCard}
              disabled={loading}
              className="shrink-0 max-w-64 bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold
              py-2 px-4 border border-gray-600 rounded shadow"
            >
              Drukuj wg filtra
            </button>
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
                  className="px-1 py-2 w-[20%] text-left before:content-['Zawodnik'] xl:before:content-['Imie\00a0i\00a0nazwisko\00a0zawodnika']"
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
