import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { formatFestivalTerm } from "../../components/main/Common";
import useAuthContext from "../../context/AuthContext";
import axios from "../../api/axios";
import CardModelClassify from "../../components/toprint/CardModelClassify";
import ModalSpinner from "../../components/main/ModalSpinner";
import CardModelContenstant from "../../components/toprint/CardModelContenstant";
import SingleCard from "./SingleCard";


export default function ModelCard() {
  const { festival } = useAuthContext();
  const termDiscription = formatFestivalTerm(festival?.festival_start, festival?.festival_end);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [queryParmaeters] = useSearchParams();
  const [models, setModels] = useState([]);

  const modelid = queryParmaeters.get("model");
  const isRange = modelid?.includes("-");

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

  const chunks = [];
  if (isRange) {
    for (let i = 0; i < models.length; i += 2) {
      chunks.push(models.slice(i, i + 2));
    }
  }

  return (
    <>
      <Helmet>
        <style>{`
          body { background-image: none !important; background-color: white !important; }
        `}</style>
      </Helmet>
      <div className="min-h-screen bg-white">
        <ModalSpinner visibled={loading} />
        {errors.length > 0 && (
          <div className="text-red-600 p-4">
            {Object.values(errors).flat().map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
        )}

        {isRange ? (
          chunks.map((chunk, chunkIndex) => (
            <div
              key={chunkIndex}
              className="break-after-page print:flex print:flex-col print:justify-between print:h-[277mm] print:pt-[10mm]"
            >
              {chunk.map((model) => (
                <SingleCard
                  key={model.id}
                  model={model}
                  festival={festival}
                  termDiscription={termDiscription}
                />
              ))}
            </div>
          ))
        ) : (
          models.map((model) => (
            <div key={model.id} className="break-after-page print:pt-[10mm]">
              <SingleCard
                model={model}
                festival={festival}
                termDiscription={termDiscription}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
}

