import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import useAuthContext from "../context/AuthContext";
import ModalSpinner from "../components/main/ModalSpinner";
import AddingPrixe from "./print/AddingPrixe";
import ClassRadioButton from "../components/toform/ClassRadioButton";
import { useReactToPrint } from "react-to-print";
import ScrollToTopButton from "../components/main/ScrollToTopButton";

function PrintBatchYoung({ prix }) {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <>
      <button
        onClick={reactToPrintFn}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-2"
      >
        <span>🖨</span> Drukuj wszystkich młodzików i juniorów
      </button>
      <div ref={contentRef}>
        {prix.map((user, i) => (
          <AddingPrixe key={i} value={user} typeName="WYRÓŻNIENIE" />
        ))}
      </div>
    </>
  );
}

function PrintBatchSeniors({ prix, label }) {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <>
      <button
        onClick={reactToPrintFn}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-2"
      >
        <span>🖨</span> {label}
      </button>
      <div ref={contentRef}>
        {prix.map((user, i) => (
          <AddingPrixe key={i} value={user} />
        ))}
      </div>
    </>
  );
}

function PrintItemDiploma({ prix }) {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <>
      <button
        onClick={reactToPrintFn}
        className="flex justify-center bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold py-2 px-4 border border-gray-600 rounded shadow"
      >
        Drukuj
      </button>
      <div ref={contentRef}>
        <AddingPrixe value={prix} typeName={prix.typeName} />
      </div>
    </>
  );
}

function DiplomasList() {
  const [loading, setLoading] = useState(false);
  const [loadingSeniors, setLoadingSeniors] = useState(false);
  const [classModelValue, setClassModelValue] = useState("K");
  const [valueCategoryId, setValueCategoryId] = useState(0);
  const [prixesYoung, setPrixesYoung] = useState([]);
  const [prixesSeniors, setPrixesSeniors] = useState([]);
  const [prixesSeniorsAll, setPrixesSeniorsAll] = useState([]);
  const [youngOpen, setYoungOpen] = useState(false);
  const [seniorOpen, setSeniorOpen] = useState(false);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  const { categories, emptyCartonClass, emptyPlasticClass, user } = useAuthContext();

  const isSuperAdmin = user?.admin === 15;
  const isPastYear = isSuperAdmin && years.length > 0 && selectedYear !== null && selectedYear !== years[0];

  const getListRegisteredTeenager = async () => {
    try {
      const { data } = await axios.get(`/api/listregisteredteenager`);
      setPrixesYoung(data.users);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getRewardModels = async (category_id = 0) => {
    try {
      const { data } = await axios.get(`/api/rewardmodels/${category_id}`);
      setPrixesSeniors(data.rewards);
      if (category_id === 0) {
        setPrixesSeniorsAll(data.rewards);
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingSeniors(false);
  };

  const getPastSeniors = async (year, category_id = 0) => {
    try {
      const { data } = await axios.get(`/api/pastrewardmodels/${category_id}/${year}`);
      setPrixesSeniors(data?.rewards ?? []);
    } catch (error) {
      console.error("Błąd ładowania nagród:", error);
      setPrixesSeniors([]);
    }
    setLoadingSeniors(false);
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      setLoadingSeniors(true);
      if (isSuperAdmin) {
        try {
          const { data } = await axios.get("/api/years");
          setYears(data.years);
          setSelectedYear(data.years[0]);
        } catch (error) {
          console.log(error);
        }
      }
      getListRegisteredTeenager();
      getRewardModels(0);
    };
    init();
  }, []);

  const getPastRewards = async (year, category_id = 0) => {
    try {
      const { data } = await axios.get(`/api/pastrewardmodels/${category_id}/${year}`);
      setPrixesSeniors(data?.rewards ?? []);
    } catch (error) {
      console.error(error);
    }
    setLoadingSeniors(false);
  };

  const handleShowAll = () => {
    setValueCategoryId(0);
    setClassModelValue("K");
    setLoadingSeniors(true);
    if (isPastYear) {
      getPastSeniors(selectedYear, 0);
    } else {
      getRewardModels(0);
    }
  };

  const handleGetList = () => {
    setLoadingSeniors(true);
    if (isPastYear) {
      getPastRewards(selectedYear, valueCategoryId);
    } else {
      getRewardModels(valueCategoryId);
    }
  };

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
    setValueCategoryId(0);
    setClassModelValue("K");
    if (year === years[0]) {
      setLoading(true);
      setLoadingSeniors(true);
      getListRegisteredTeenager();
      getRewardModels(0);
    } else {
      setLoadingSeniors(true);
      getPastSeniors(year, 0);
    }
  };

  const handleChangeClassModels = (value) => {
    if (value === "K") {
      setClassModelValue("K");
      setValueCategoryId(emptyCartonClass);
    } else {
      setClassModelValue("P");
      setValueCategoryId(emptyPlasticClass);
    }
  };

  return (
    <>
      <ModalSpinner visibled={loading || loadingSeniors} key="modalSpinnerDiplomasList" />
      <ScrollToTopButton />
      <div className="p-4 max-w-5xl mx-auto space-y-6">
        {/* Masowy wydruk */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-2xl font-bold text-gray-800">Dyplomy</p>
            {isSuperAdmin && years.length > 0 && (
              <select
                value={selectedYear ?? ""}
                onChange={handleYearChange}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            )}
          </div>
          {!isPastYear && (
            <div className="flex flex-wrap justify-center gap-3">
              <PrintBatchYoung prix={prixesYoung} />
              <PrintBatchSeniors prix={prixesSeniorsAll} label="Drukuj wszystkich seniorów" />
            </div>
          )}
        </div>

        {/* Młodzicy i Juniorzy */}
        {!isPastYear && (
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="pb-3 border-b border-gray-200">
              <button
                onClick={() => setYoungOpen((o) => !o)}
                className="flex items-center gap-2 text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
              >
                <span className={`transition-transform duration-200 ${youngOpen ? "rotate-90" : ""}`}>▶</span>
                Młodzicy i Juniorzy
                <span className="text-sm font-normal text-gray-400">({prixesYoung.length})</span>
              </button>
            </div>
            {youngOpen && (
              <div className="mt-4">
                {prixesYoung.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4">Brak danych</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
                          <th className="px-3 py-2 text-left w-10">#</th>
                          <th className="px-3 py-2 text-left">Imię</th>
                          <th className="px-3 py-2 text-left">Nazwisko</th>
                          <th className="px-3 py-2 text-center w-20">Drukuj</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {prixesYoung.map((user, i) => (
                          <tr key={i} className="hover:bg-gray-50 transition-colors">
                            <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                            <td className="px-3 py-2 font-medium text-gray-800">{user.imie}</td>
                            <td className="px-3 py-2 text-gray-700">{user.nazwisko}</td>
                            <td className="px-3 py-2 text-center">
                              <PrintItemDiploma prix={{ ...user, typeName: "WYRÓŻNIENIE" }} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Seniorzy */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="pb-3 border-b border-gray-200">
            <button
              onClick={() => setSeniorOpen((o) => !o)}
              className="flex items-center gap-2 text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
            >
              <span className={`transition-transform duration-200 ${seniorOpen ? "rotate-90" : ""}`}>▶</span>
              Seniorzy
              <span className="text-sm font-normal text-gray-400">({prixesSeniors.length})</span>
            </button>
          </div>
          {seniorOpen && (
            <div className="mt-4">
              <div className="p-4 bg-gray-50 rounded-lg mb-4">
                <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Filtruj kategorię</p>
                <ClassRadioButton
                  OnClickClassModel={handleChangeClassModels}
                  categoriesFiltr={classModelValue}
                  setValueCategoryId={setValueCategoryId}
                  categories={categories}
                  valueCategoryId={valueCategoryId}
                  plastikName="seniors"
                  kartonName="seniors"
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  <button
                    onClick={handleGetList}
                    className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors"
                  >
                    Pobierz
                  </button>
                  <button
                    onClick={handleShowAll}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors"
                  >
                    Pokaż wszystko
                  </button>
                  {!isPastYear && (
                    <PrintBatchSeniors prix={prixesSeniors} label="Drukuj wybraną kategorię" />
                  )}
                </div>
              </div>
              {prixesSeniors.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">Brak danych</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
                        <th className="px-3 py-2 text-left w-10">#</th>
                        <th className="px-3 py-2 text-left w-8">Wynik</th>
                        <th className="px-3 py-2 text-left">Imię</th>
                        <th className="px-3 py-2 text-left">Nazwisko</th>
                        <th className="px-3 py-2 text-left">Model</th>
                        <th className="px-3 py-2 text-left">Klasa</th>
                        {!isPastYear && <th className="px-3 py-2 text-center w-20">Drukuj</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {prixesSeniors.map((user, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                          <td className="px-3 py-2 text-gray-700 text-center">{user.wynik}</td>
                          <td className="px-3 py-2 font-medium text-gray-800">{user.imie}</td>
                          <td className="px-3 py-2 text-gray-700">{user.nazwisko}</td>
                          <td className="px-3 py-2 text-gray-600">{user.nazwa}</td>
                          <td className="px-3 py-2 text-gray-600">{user.klasa}&nbsp;{user.symbol}</td>
                          {!isPastYear && (
                            <td className="px-3 py-2 text-center">
                              <PrintItemDiploma prix={user} />
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DiplomasList;
