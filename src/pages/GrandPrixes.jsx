import { useEffect, useLayoutEffect, useState } from "react";
import axios from "../api/axios";
import ModalSpinner from "../components/main/ModalSpinner";
import SimpleSelect from "../components/toform/SimpleSelect";
import ResultSearchModelList from "./special/ResultSearchModelList";
import ConfirmationDialog from "../components/dialogs/ConfirmationDialog";
import DiplomaComponentWrapper from "./print/DiplomaComponentWrapper";

function GrandPrixes() {
  const [loading, setLoading] = useState(false);
  const [prixes, setPrixes] = useState([]);
  const [selectedPrixes, setSelectedPrixes] = useState(0);
  const [listModels, setListModels] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");
  const [grandPrixModel, setGrandPrixModel] = useState({});
  const [lastKeyTyping, setLastKeyTyping] = useState("");
  const [memberKeyTyping, setMemberKeyTyping] = useState("");
  const [listResultGrandPrixes, setListResultGrandPrixes] = useState([]);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState({
    prix: [],
    opening: false,
  });
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  const isPastYear = years.length > 0 && selectedYear !== null && selectedYear !== years[0];

  const getPrixes = async () => {
    try {
      const { data } = await axios.get(`/api/listgrandprixes/0`);
      setPrixes(data.prixes);
      setSelectedPrixes(data.prixes[0].id);
    } catch (error) {
      console.log("Error geting prixes");
    }
  };

  const getResulListPrixes = async () => {
    try {
      const { data } = await axios.get(`/api/resultgrandprixes/0`);
      setListResultGrandPrixes(data.grandprixes);
    } catch (error) {
      console.log("Error reading list of Grand Prixes");
    }
  };

  const getPastResultGrandPrixes = async (year) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/pastresultgrandprixes/0/${year}`);
      setListResultGrandPrixes(data.grandprixes ?? []);
    } catch (error) {
      console.log("Error loading past grand prixes");
      setListResultGrandPrixes([]);
    }
    setLoading(false);
  };

  const getListModels = async (lookingModel) => {
    if (lookingModel.length < 1) lookingModel = "&";
    try {
      const { data } = await axios.get(
        `/api/listModels/classfilter/0/category/0/age/0/name/${lookingModel}`
      );
      if (data.status === 200) {
        setListModels(data.models);
      }
    } catch (error) {
      console.log("Error geting list model to do prixes");
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await axios.get("/api/grandprixyears");
        setYears(data.years);
        setSelectedYear(data.years[0]);
      } catch (error) {
        console.log("Error loading years");
      }
    };
    init();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (Object(prixes).length < 1) {
      getPrixes();
      getResulListPrixes();
    }
    if (lastKeyTyping === memberKeyTyping) {
      getListModels(lastKeyTyping);
      setLastKeyTyping("");
    }
  }, [lastKeyTyping, memberKeyTyping]);

  useLayoutEffect(() => {
    setLoading(false);
  }, [listResultGrandPrixes, listModels]);

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
    if (year === years[0]) {
      getResulListPrixes();
    } else {
      getPastResultGrandPrixes(year);
    }
  };

  const handleCheckGrandPrix = (e) => {
    setSelectedPrixes(e.target.value);
    setSelectedModel("");
    setGrandPrixModel(null);
  };

  const handlePostGrandPrix = async () => {
    if (typeof grandPrixModel != "undefined") {
      setLoading(true);
      try {
        await axios.post("/api/add_grand", grandPrixModel);
        setSelectedModel("");
        setGrandPrixModel(null);
        await getResulListPrixes();
      } catch (error) {
        console.log("Error post GrandPrix to: " + grandPrixModel);
      }
    } else console.log("Pusto");
    setLoading(false);
  };

  const handleOnChange = (e) => {
    setSelectedModel(e.target.value);
    setLastKeyTyping(e.target.value);
  };

  const handleAddPrix = (model) => {
    setIsSearchActive(false);
    setSelectedModel(`${model.konkurs}  ${model.nazwa}`);
    const modelGrandPrix = model;
    modelGrandPrix.prixes_id = selectedPrixes;
    setGrandPrixModel(modelGrandPrix);
  };

  const handleDisagreeConfirmationDialog = () => {
    setOpenConfirmationDialog({ prix: [], opening: false });
  };

  const handleAgreeConfirmationDialog = async () => {
    const prixId = openConfirmationDialog.prix.id;
    setOpenConfirmationDialog({ prix: [], opening: false });
    setLoading(true);
    await axios.delete("/api/delete_result_grand_prix/" + prixId);
    await getResulListPrixes();
  };

  const handleDeleteResultPrix = (prix) => {
    setOpenConfirmationDialog({ prix: prix, opening: true });
  };

  return (
    <>
      <ModalSpinner visibled={loading} key="modalSpinnerGrandPrixes" />
      <ConfirmationDialog
        title={"Usuwanie przyznanej nagrody"}
        description={`Czy chesz przyznaną nagrodę: `}
        deleteName={`${openConfirmationDialog.prix.konkurs} ${openConfirmationDialog.prix.prix_name}`}
        open={openConfirmationDialog.opening}
        handleDisagree={handleDisagreeConfirmationDialog}
        handleAgree={handleAgreeConfirmationDialog}
        buttonCancel="Anulij"
        buttonOK="Usuń"
        key="confirmDialogGrandPrixes"
      ></ConfirmationDialog>
      <section className="block xl:grid xl:col-span-2 md:grid md:col-span-1 gap-8 p-1 h-max">
        <div className="xl:flex md:grid w-[100%] xl:w-[100%] md:w-[100%] bg-white bg-opacity-30 rounded-lg shadow-md shadow-gray-200">
          <div className="grid divide-y xl:m-5 md:m-5 sm:m-0 justify-items-center">
            <div className="flex items-center gap-4 py-2">
              <h3 className="text-2xl font-medium text-gray-800">
                Nagrody specjalne
              </h3>
              {years.length > 0 && (
                <div className="relative">
                  <select
                    value={selectedYear ?? ""}
                    onChange={handleYearChange}
                    className="appearance-none border border-gray-300 rounded-lg pl-3 pr-10 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-8 flex items-center justify-center border-l border-gray-300">
                    <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            {!isPastYear && (
              <div className="w-full max-w-2xl p-5">
                <span className="text-lg font-bold">Wybierz nagrodę:</span>
                <SimpleSelect
                  selectedValue={selectedPrixes}
                  handleChangeValue={handleCheckGrandPrix}
                  list={prixes}
                  key="spimpleSelectGrandPrixes"
                />
                <label
                  htmlFor="search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only"
                >
                  szukaj wg numeru lub nazwy
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="search"
                    className="block w-full p-4 ps-10 text-sm md:text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="szukaj wg numeru lub nazwy"
                    value={selectedModel}
                    onChange={(e) => handleOnChange(e)}
                    onKeyDown={(e) => {
                      setIsSearchActive(true);
                      setTimeout(() => setMemberKeyTyping(e.target.value), 1500);
                    }}
                  />
                  <button
                    className="text-white absolute end-2.5 top-1/2 -translate-y-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-2 before:content-['+']  md:before:content-['Dodaj\00a0nagrodę'] xl:before:content-['Dodaj\00a0nagrodę']"
                    onClick={handlePostGrandPrix}
                  ></button>
                </div>
                {isSearchActive && Object(listModels).length > 0 && (
                  <ResultSearchModelList
                    listModels={listModels}
                    handleAddPrix={handleAddPrix}
                  />
                )}
              </div>
            )}
            <div className="w-full overflow-x-auto px-2 md:px-5">
              <table className="table-auto w-full text-xs md:text-lg">
                <tbody>
                  {listResultGrandPrixes.map((prixe, index) => (
                    <>
                      <tr
                        key={`rowPrix${prixe}${index}`}
                        className={`${
                          index % 2 ? "bg-white" : "bg-stone-200"
                        } bg-opacity-50 `}
                      >
                        <td className="px-1 py-1 text-center">{prixe.konkurs}</td>
                        <td className="px-1 py-1 text-left">{prixe.prix_name}</td>
                        <td className="px-1 py-1 text-left">{prixe.modelName}</td>
                        <td className="hidden md:flex xl:flex px-1 py-1 text-left">
                          {prixe.imie} {prixe.nazwisko}
                        </td>
                        {!isPastYear && (
                          <DiplomaComponentWrapper
                            key={`diplomaWrap${index}`}
                            prix={prixe}
                          />
                        )}
                        {!isPastYear && (
                          <td className="px-1 py-1 text-center align-middle">
                            <button
                              onClick={() => handleDeleteResultPrix(prixe)}
                              className="w-full bg-red-400 text-white font-semibold text-sm md:text-lg hover:bg-red-600 hover:text-gray-50 py-2 px-4 border border-red-600 rounded shadow before:content-['-'] md:before:content-['Usuń\00a0nagrodę'] xl:before:content-['Usuń\00a0nagrodę']"
                            ></button>
                          </td>
                        )}
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default GrandPrixes;
