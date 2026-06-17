import { useState, useEffect } from "react";
import axios from "../api/axios";
import { IsResultListAvailable } from "../components/main/Common";
import useAuthContext from "../context/AuthContext";
import ModalSpinner from "../components/main/ModalSpinner";
import GrandPixesList from "../components/lists/GrandPixesList";
import ResultCompetitionList from "../components/lists/ResultCompetitionList";
import bgImage from "../assets/images/bg.jpg";

function ResultsCompetition() {
  const { festival } = useAuthContext();
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

  const canSeeResults = IsResultListAvailable(festival) || isAdmin & 4;

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/55 pointer-events-none" />

      <ModalSpinner visibled={loading} key="modalSpinnerResultsPrixesList" />

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {canSeeResults ? (
          <>
            <h1 className="text-white font-black text-3xl uppercase tracking-widest text-center mb-10">
              Wyniki Festiwalu Modelarskiego
            </h1>
            <div className="grid xl:grid-cols-2 gap-8 items-start">
              <GrandPixesList prixes={listResultGrandPrixes} />
              <ResultCompetitionList models={resultsCompetition} />
            </div>
          </>
        ) : (
          <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <div className="text-8xl mb-6 drop-shadow-lg" style={{ animation: "bounce 2s infinite" }}>
              🏆
            </div>
            <h1 className="text-white font-black text-4xl uppercase tracking-[.2em] mb-4 drop-shadow">
              Czekamy na wyniki
            </h1>
            <p className="text-white/75 text-lg max-w-md leading-relaxed mb-8">
              Wyniki zostaną ogłoszone wkrótce po zakończeniu festiwalu.
              Dziękujemy za udział i cierpliwość!
            </p>
            <div className="flex gap-3 text-white/50 text-2xl">
              <span style={{ animation: "pulse 2s infinite 0ms" }}>✦</span>
              <span style={{ animation: "pulse 2s infinite 300ms" }}>✦</span>
              <span style={{ animation: "pulse 2s infinite 600ms" }}>✦</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultsCompetition;
