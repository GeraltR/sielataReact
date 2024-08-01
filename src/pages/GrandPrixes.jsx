import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ModalSpinner from "../components/main/ModalSpinner";
import axios from "../api/axios";

function GrandPrixes() {
  const [loading, setLoading] = useState(false);
  const [prixes, setPrixes] = useState([]);
  const [newprix, setNewPrix] = useState("");

  const get_prixes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/listgrandprixes/0`);
      setPrixes(data.prixes);
    } catch (error) {
      console.log("Error geting prixes");
    }
    setLoading(false);
  };

  useEffect(() => {
    get_prixes();
  }, []);

  const handleOnChange = (e) => {
    console.log(e.target.value);
  };

  const handleAddPrix = () => {};

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
                className="bg-gray-50 mb-4 py-3 p-5 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={prixes.id}
                onChange={handleOnChange}
              >
                {prixes.map((prix) => (
                  <option key={prix.id} value={prix.id}>
                    {prix.prix_name}
                  </option>
                ))}
              </select>
              <div className="w-[100%] flex">
                <FaSearch
                  id="findmodel"
                  size="3em"
                  color="blue"
                  className="bg-gray-50 h-11 px-2"
                />
                <input
                  type="text"
                  value={newprix}
                  placeholder="wpisz numer lub nazwę"
                  className="w-full bg-gray-50 border-x-0 border-indigo-800 h-11 text-left text-gray-900 text-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  className="w-[15rem] bg-indigo-500 hover:bg-indigo-300 text-zinc-50 font-semibold py-2 px-4 border border-indigo-500 hover:border-indigo-300 hover:text-zinc-200 rounded shadow"
                  onClick={handleAddPrix}
                >
                  Dodaj nagrodę
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default GrandPrixes;
