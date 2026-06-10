import { useEffect, useState } from "react";
import axios from "../../api/axios";

function Statistics() {
  const [statistcs, setStatistics] = useState([]);

  const getStatistics = async () => {
    try {
      const data = await axios.get(`/api/statistics`);
      setStatistics(data.data.statistics);
    } catch (error) {
      console.log(`Error from get_statistics: ${error}`);
    }
  };
  useEffect(() => {
    getStatistics();
  }, []);
  return (
    <div className="px-6 py-4">
      <div className="w-full grid grid-flow-dense grid-cols-1 md:grid-cols-3 xl:grid-flow-col gap-4 auto-cols-max mb-2 m-auto xl:mb-auto">
        <div className="bg-amber-400 p-2">
          Modelarzy z modelami:{" "}
          <span className="ml-2 font-bold">{statistcs.sumAllContestant}</span>
        </div>
        <div className="bg-orange-300 p-2">
          Zarejestrowanych modeli:
          <span className="ml-2 font-bold">{statistcs.sumAllModels}</span>
        </div>
        <div className="bg-orange-400 p-2">
          Modeli w klasie karton:{" "}
          <span className="ml-2 font-bold">{statistcs.sumCarton}</span>
        </div>
        <div className="bg-amber-400 p-2">
          Modeli w klasie plastik:{" "}
          <span className="ml-2 font-bold">{statistcs.sumPlastic}</span>
        </div>
        <div className="bg-orange-400 p-2">
          Seniorów:{" "}
          <span className="ml-2 font-bold">{statistcs.sumSenior}</span>
        </div>
        <div className="bg-amber-400 p-2">
          Juniorów:{" "}
          <span className="ml-2 font-bold">{statistcs.sumJunior}</span>
        </div>
        <div className="bg-amber-400 p-2">
          Młodzików:{" "}
          <span className="ml-2 font-bold">{statistcs.sumYoung}</span>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
