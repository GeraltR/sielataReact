import { useState, useEffect } from "react";
import axios from "../api/axios";
import { IsResultListAvailable } from "../components/main/Common";
import ModalSpinner from "../components/main/ModalSpinner";
import GrandPixesList from "../components/lists/GrandPixesList";
import ResultCompetitionList from "../components/lists/ResultCompetitionList";

function ResultsCompetition() {
  const [loading, setLoading] = useState(false);
  const [listResultGrandPrixes, setListResultGrandPrixes] = useState([]);
  const [resultsCompetition, setResultsCompetition] = useState([]);
  const [isAdmin, setIsAdmin] = useState(0);

  const getResulListPrixes = async () => {
    try {
      const { data } = await axios.get(`/api/resultgrandprixes/1`);
      setListResultGrandPrixes(data.grandprixes);
    } catch (error) {
      console.log("Error reading list of Grand Prixes");
    }
  };

  const getRewardModels = async () => {
    try {
      const { data } = await axios.get("/api/rewardmodels/0");
      setResultsCompetition(data.rewards);
      setIsAdmin(data.isadmin);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getResulListPrixes();
    getRewardModels();
  }, []);

  return (
    <>
      <ModalSpinner visibled={loading} key="modalSpinnerResultsPrixesList" />
      {IsResultListAvailable() || isAdmin === 1 ? (
        <>
          <section className="block xl:grid xl:grid-cols-4 md:grid md:grid-cols-4 gap-8 p-1 h-max">
            <div className="grid col-span-2 xl:m-5 md:m-5 sm:m-0 justify-items-left">
              <GrandPixesList prixes={listResultGrandPrixes} />
            </div>
            <div className="grid col-span-2 xl:m-5 md:m-5 sm:m-0 justify-items-left">
              <ResultCompetitionList models={resultsCompetition} />
            </div>
          </section>
        </>
      ) : (
        <>
          <div className="grid items-center width-full text-center font-bold text-2xl ">
            <span className="font-bold uppercase text-green-700 tracking-[.25em] mt-[10%]">
              Czekamy na wyniki
            </span>
          </div>
        </>
      )}
    </>
  );
}

export default ResultsCompetition;
