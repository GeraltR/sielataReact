import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { appParameters } from "../../components/main/Common";
import axios from "../../api/axios";
import CardModelClassify from "../../components/toprint/CardModelClassify";
import ModalSpinner from "../../components/main/ModalSpinner";
import CardModelContenstant from "../../components/toprint/CardModelContenstant";

function ModelCard() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [queryParmaeters] = useSearchParams();
  const [models, setModels] = useState([
    {
      categories_id: 0,
      categoryName: "",
      id: 0,
      idparent: null,
      imie: "",
      kategoriaWiek: "",
      klasa: "",
      klub: "",
      konkurs: 0,
      miasto: "",
      nazwa: "",
      nazwisko: "",
      producent: "",
      rokur: 0,
      skala: "",
      styl: 0,
      symbol: "",
      users_id: 0,
      wynik: 0,
    },
  ]);

  const modelid = queryParmaeters.get("model");

  console.log("modelid=" + modelid);

  const printmodelcardard = async () => {
    try {
      const { data } = await axios.get(`api/printmodels/${modelid}`);
      //console.log(data.models);
      setModels(data.models);
      //console.log(models);
    } catch (e) {
      if (e.response.status != 204) {
        setErrors(e.response.data.errors);
      }
    }
    setLoading(false);
  };

  const myColumns = [1, 2, 3];

  useEffect(() => {
    setLoading(true);
    printmodelcardard();
  }, []);

  return (
    <div className="w-100 brake-after-page">
      <ModalSpinner visibled={loading} />
      {models.map((model) => (
        <>
          <table className="card-model w-100">
            <thead className="">
              <tr className="">
                <th className="card-model" colSpan="5">
                  KARTA DLA ORGANIZATORA
                </th>
                <th className="card-model" colSpan="5">
                  KARTA POD MODEL
                </th>
                <th className="card-model" colSpan="5">
                  KARTA ODBIORU MODELU
                </th>
              </tr>
              <tr>
                <th className="card-model" colSpan="5" rowSpan="2">
                  {appParameters.edition} {appParameters.title}
                  <br />
                  {appParameters.termDiscription}
                </th>
                <th className="card-model" colSpan="5" rowSpan="2">
                  {appParameters.edition} {appParameters.title}
                  <br />
                  {appParameters.termDiscription}
                </th>
                <th className="card-model" colSpan="5" rowSpan="2">
                  {appParameters.edition} {appParameters.title}
                  <br />
                  {appParameters.termDiscription}
                </th>
              </tr>
            </thead>
            <tbody>
              <CardModelClassify model={model} />
              <CardModelContenstant model={model} />
            </tbody>
          </table>
        </>
      ))}
    </div>
  );
}

export default ModelCard;
