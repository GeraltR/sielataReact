import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import useAuthContext from "../context/AuthContext";
import ModalSpinner from "../components/main/ModalSpinner";
import ReactToPrint from "react-to-print";
import AddingPrixe from "./print/AddingPrixe";
import ClassRadioButton from "../components/toform/ClassRadioButton";
import { appParameters } from "../components/main/Common";

function ListDiplomaYoungComponentWrapper({ prix }) {
  const diplomaRef = useRef(null);
  return (
    <div className="px-1 py-1 text-center">
      <ReactToPrint
        trigger={() => (
          <button className="hidden md:flex xl:flex max-w-36 justify-end xl:mt-auto ml-2 xl:ml-0 mr-2 xl:mr-1 md:mr-auto mb-2 xl:mb-0 bg-lime-400 text-gray-800 hover:bg-lime-600 hover:text-gray-50 font-semibold py-2 px-4 border border-lime-600 rounded shadow">
            Drukuj wszystkich młodzik i junior
          </button>
        )}
        content={() => diplomaRef.current}
        key={`reactToPront${prix.id}`}
      />
      <div ref={diplomaRef}>
        {prix.map((user, index) => (
          <AddingPrixe
            key={`itemDiplomaYoungPrint${index}`}
            value={user}
            typeName="WYRÓŻNIENIE"
          />
        ))}
      </div>
    </div>
  );
}

function ListDiplomaSeniorComponentWrapper({ prix }) {
  const diplomaRef = useRef(null);
  return (
    <div className="px-1 py-1 text-center">
      <ReactToPrint
        trigger={() => (
          <button className="hidden md:flex xl:flex max-w-36 justify-end xl:mt-auto ml-2 xl:ml-0 mr-2 xl:mr-1 md:mr-auto mb-2 xl:mb-0 bg-lime-400 text-gray-800 hover:bg-lime-600 hover:text-gray-50 font-semibold py-2 px-4 border border-lime-600 rounded shadow">
            Drukuj wszystkie dyplomy
          </button>
        )}
        content={() => diplomaRef.current}
        key={`reactToPront${prix.id}`}
      />
      <div ref={diplomaRef}>
        {prix.map((user, index) => (
          <AddingPrixe key={`itemDiplomaSeniorPrint${index}`} value={user} />
        ))}
      </div>
    </div>
  );
}

function PrintItemDiplomaComponentWrapper({ prix }) {
  const diplomaRef = useRef(null);
  return (
    <td className="px-1 py-1 text-center">
      <ReactToPrint
        trigger={() => (
          <button className="hidden md:flex xl:flex max-w-36 justify-end xl:mt-auto ml-2 xl:ml-0 mr-2 xl:mr-1 md:mr-auto mb-2 xl:mb-0 bg-lime-400 text-gray-800 hover:bg-lime-600 hover:text-gray-50 font-semibold py-2 px-4 border border-lime-600 rounded shadow">
            Drukuj
          </button>
        )}
        content={() => diplomaRef.current}
        key={`reactItemToPront${prix.id}`}
      />
      <AddingPrixe
        ref={diplomaRef}
        key={`diplomaItemPrint${prix.id}`}
        value={prix}
        typeName={prix.typeName}
      />
    </td>
  );
}

function DiplomasList() {
  const [loading, setLoading] = useState(false);
  const [loadingSeniors, setLoadingSeniors] = useState(false);
  const [classModelValue, setClassModelValue] = useState("K");
  const [valueCategoryId, setValueCategoryId] = useState(0);
  const [prixesYoung, setPrixesYoung] = useState([]);
  const [prixesSeniors, setPrixesSeniors] = useState([]);

  const { categories } = useAuthContext();

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
    } catch (error) {
      console.log(error);
    }
    setLoadingSeniors(false);
  };

  useEffect(() => {
    setLoading(true);
    getListRegisteredTeenager();
    setLoadingSeniors(true);
    getRewardModels();
  }, []);

  const handleGetList = () => {
    setLoadingSeniors(true);
    getRewardModels(valueCategoryId);
  };

  const handleChangeClassModels = (e) => {
    if (classModelValue === "K") {
      setClassModelValue("P");
      setValueCategoryId(appParameters.emptyPlasticClass);
    } else {
      setClassModelValue("K");
      setValueCategoryId(appParameters.emptyCartonClass);
    }
  };

  return (
    <>
      <ModalSpinner
        visibled={loading || loadingSeniors}
        key="modalSpinnerDiplomasList"
      />
      <section className="block xl:grid xl:col-span-2 md:grid md:col-span-1 gap-8 p-1 h-max">
        <div className="xl:flex md:grid w-[100%] xl:w-[100%] md:w-[100%] bg-white bg-opacity-30 rounded-lg shadow-md shadow-gray-200">
          <div className="grid divide-y xl:m-5 md:m-5 sm:m-0 justify-items-center">
            <ListDiplomaYoungComponentWrapper
              key={`diplomaPrixesYoungWrap`}
              prix={prixesYoung}
            />
          </div>
          <table>
            {prixesYoung.map((user, index) => (
              <>
                <tr key={`tabPrixesYoung${index}`}>
                  <td>{user.imie}</td>
                  <td>{user.nazwisko}</td>
                  <PrintItemDiplomaComponentWrapper
                    key={`diplomaItemWrap${index}`}
                    prix={user}
                  />
                </tr>
              </>
            ))}
          </table>
          <div className="w-full">
            <div className="max-w-2xl justify-items-center p-5">
              <ClassRadioButton
                OnClickClassModel={handleChangeClassModels}
                categoriesFiltr={classModelValue}
                setValueCategoryId={setValueCategoryId}
                categories={categories}
                valueCategoryId={valueCategoryId}
                plastikName="1"
                kartonName="1"
              />
              <button
                className="border-amber-900 md:flex xl:flex max-w-36 justify-end xl:mt-auto ml-2 xl:ml-0 mr-2 xl:mr-1 md:mr-auto mb-2 xl:mb-0 bg-white-400 text-gray-800 hover:bg-zinc-600 hover:text-gray-50 font-semibold py-2 px-4 rounded shadow"
                onClick={handleGetList}
              >
                Pobierz wybrane
              </button>
            </div>
            <div className="grid divide-y xl:m-5 md:m-5 sm:m-0 justify-items-left">
              <ListDiplomaSeniorComponentWrapper
                key={`diplomaPrixesSeniorsWrap`}
                prix={prixesSeniors}
              />
            </div>
            <div className="xl:flex md:grid w-[100%] xl:w-[100%] md:w-[100%] bg-white bg-opacity-30 rounded-lg shadow-md shadow-gray-200 ml-[30px]">
              <table>
                {prixesSeniors.map((user, index) => (
                  <>
                    <tr key={`tabPrixesYoung${index}`}>
                      <td>{user.wynik}</td>
                      <td>{user.imie}</td>
                      <td>{user.nazwisko}</td>
                      <td>
                        {user.klasa}&nbsp;{user.symbol}
                      </td>

                      <PrintItemDiplomaComponentWrapper
                        key={`diplomaSeniorItemWrap${index}`}
                        prix={user}
                      />
                    </tr>
                  </>
                ))}
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DiplomasList;
