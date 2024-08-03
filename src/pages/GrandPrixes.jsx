import { useEffect, useState } from "react";
import ModalSpinner from "../components/main/ModalSpinner";
import axios from "../api/axios";

function GrandPrixes() {
  const [loading, setLoading] = useState(false);
  const [prixes, setPrixes] = useState([]);
  const [selectedPrixes, setSelectedPrixes] = useState(0);
  const [listModels, setListModels] = useState([{}]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");
  const [grandPrixModel, setGrandPrixModel] = useState({});
  const [lastKeyTyping, setLastKeyTyping] = useState("");
  const [memberKeyTyping, setMemberKeyTyping] = useState("");

  const get_prixes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/listgrandprixes/0`);
      setPrixes(data.prixes);
      setSelectedPrixes(data.prixes[0].id);
    } catch (error) {
      console.log("Error geting prixes");
    }
    setLoading(false);
  };

  const getListModels = async (lookingModel) => {
    setLoading(true);
    //await csrf();
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
    setLoading(false);
  };

  useEffect(() => {
    get_prixes();
  }, []);

  let timeout = null;

  const handleCheckGrandPrix = (e) => {
    setSelectedPrixes(e.target.value);
    setSelectedModel("");
    setGrandPrixModel(null);
  };

  const handlePostGrandPrix = () => {
    if (typeof grandPrixModel != "undefined") console.log(grandPrixModel);
    else console.log("Pusto");
  };

  const handleOnChange = (e) => {
    setSelectedModel(e.target.value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (lastKeyTyping === memberKeyTyping) {
        getListModels(e.target.value);
      }
    }, 200);
  };

  const handleAddPrix = (model) => {
    setIsSearchActive(false);
    setSelectedModel(`${model.konkurs}  ${model.nazwa}`);
    // console.log(model);
    const modelGrandPrix = model;
    modelGrandPrix.prixes_id = selectedPrixes;
    console.log(modelGrandPrix);
    setGrandPrixModel(modelGrandPrix);
  };

  return (
    <>
      <ModalSpinner visibled={loading} />
      <section className="block xl:grid xl:col-span-2 md:grid md:col-span-1 gap-8 p-1 h-max">
        <div className="xl:flex md:grid w-[100%] xl:w-[100%] md:w-[100%] bg-white bg-opacity-30 rounded-lg shadow-md shadow-gray-200">
          <div className="grid divide-y xl:m-5 md:m-5 sm:m-0 justify-items-center">
            <h3 className="text-2xl font-medium text-gray-800">
              Nagrody specjalne
            </h3>
            <div className="max-w-2xl justify-items-center p-5">
              <span className="text-lg font-bold">Wybierz nagrodę:</span>
              <select
                className="bg-gray-50 mb-4 py-3 p-5 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={selectedPrixes}
                onChange={handleCheckGrandPrix}
              >
                {prixes.map((prix) => (
                  <option key={prix.id} value={prix.id}>
                    {prix.prix_name}
                  </option>
                ))}
              </select>
              <label
                htmlFor="search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only"
              >
                szukaj wg numeru lub nazwy
              </label>
              <div className="relative">
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
                  className="block w-full p-4 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="szukaj wg numeru lub nazwy"
                  value={selectedModel}
                  onChange={(e) => handleOnChange(e)}
                  onKeyDown={(e) => {
                    setLastKeyTyping(e.target.value);
                    setIsSearchActive(true);
                    setTimeout(() => setMemberKeyTyping(e.target.value), 1000);
                  }}
                />
                <button
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-2 before:content-['+']  md:before:content-['Dodaj\00a0nagrodę'] xl:before:content-['Dodaj\00a0nagrodę']"
                  onClick={handlePostGrandPrix}
                ></button>
              </div>
              {isSearchActive && Object(listModels.length > 0) && (
                <>
                  <div
                    id="dropdown"
                    className="mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-xl "
                  >
                    <ul
                      className="flex flex-col overflow-y-scroll max-h-[60dvh] md:max-h-[25dvh] xl:max-h-[60dvh] py-2 text-lg text-cyan-700"
                      aria-labelledby="dropdown-button"
                    >
                      {listModels.map((model, index) => (
                        <>
                          <li key={index}>
                            <button
                              type="button"
                              className="inline-flex w-full px-4 py-2 hover:bg-cyan-100"
                              onClick={() => handleAddPrix(model)}
                            >
                              <span className="px-2">{model.konkurs}</span>{" "}
                              <span className="px-2">{model.nazwa}</span>
                              <span
                                className={`ml-auto mr-3  text-right px-3 text-white font-bold ${
                                  model.klasa === "K"
                                    ? "bg-lime-600"
                                    : "bg-amber-800"
                                }`}
                              >
                                {model.klasa}
                              </span>
                            </button>
                          </li>
                        </>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default GrandPrixes;
