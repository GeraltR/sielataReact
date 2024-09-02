import { useEffect } from "react";
import { useState } from "react";
import axios from "../api/axios";
import ModalSpinner from "../components/main/ModalSpinner";

function ResultsCompetition() {
  const [loading, setLoading] = useState(false);
  const [resultsCompetition, setResultsCompetition] = useState([]);

  const getRewardModels = async () => {
    try {
      const { data } = await axios.get("/api/rewardmodels");
      setResultsCompetition(data.rewards);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getRewardModels();
  }, []);

  return (
    <>
      <ModalSpinner visibled={loading} key="modalSpinnerResultsPrixesList" />
      <section className="block xl:grid xl:col-span-2 md:grid md:col-span-1 gap-8 p-1 h-max">
        <div className="xl:flex md:grid w-[100%] xl:w-[100%] md:w-[100%] bg-white bg-opacity-30 rounded-lg shadow-md shadow-gray-200">
          <table>
            {resultsCompetition.map((user, index) => (
              <>
                <tr key={`tabPrixesResults${index}`}>
                  <td>{user.imie}</td>
                  <td>{user.nazwisko}</td>
                </tr>
              </>
            ))}
          </table>
        </div>
      </section>
    </>
  );
}

export default ResultsCompetition;
