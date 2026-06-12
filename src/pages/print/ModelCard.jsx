import { useEffect, useState, Fragment } from "react";
import { useSearchParams } from "react-router-dom";
import { formatFestivalTerm } from "../../components/main/Common";
import useAuthContext from "../../context/AuthContext";
import axios from "../../api/axios";
import CardModelClassify from "../../components/toprint/CardModelClassify";
import ModalSpinner from "../../components/main/ModalSpinner";
import CardModelContenstant from "../../components/toprint/CardModelContenstant";
import logo from "../../assets/images/sielata_logo_druk_new_bw.gif";

function ModelCard() {
  const { festival } = useAuthContext();
  const termDiscription = formatFestivalTerm(festival?.festival_start, festival?.festival_end);
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

  const printmodelcardard = async () => {
    try {
      const { data } = await axios.get(`api/printmodels/${modelid}`);
      setModels(data.models);
    } catch (e) {
      if (e.response?.status != 204) {
        setErrors(e.response.data.errors);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    printmodelcardard();
  }, []);

  return (
    <>
      <ModalSpinner visibled={loading} />
      {errors.length > 0 && (
        <div className="text-red-600 p-4">
          {Object.values(errors).flat().map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      )}
      {models.map((model) => (
        <Fragment key={model.id}>
          <div className="contents mb-10">
            <table className="card-model">
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
                    {festival?.edition} {festival?.title}
                    <br />
                    {termDiscription}
                  </th>
                  <th className="card-model" colSpan="5" rowSpan="2">
                    {festival?.edition} {festival?.title}
                    <br />
                    {termDiscription}
                  </th>
                  <th className="card-model" colSpan="5" rowSpan="2">
                    {festival?.edition} {festival?.title}
                    <br />
                    {termDiscription}
                  </th>
                </tr>
              </thead>
              <tbody>
                <CardModelClassify model={model} />
                <CardModelContenstant model={model} />
              </tbody>
            </table>
            <div className="flex justify-center items-center pt-2 break-after-page">
              <span className="pt-3 font-bold">
                &copy; {festival?.year}
              </span>
              <img className="ml-3" src={logo} alt="SieLata" />
            </div>
          </div>
        </Fragment>
      ))}
    </>
  );
}

export default ModelCard;
