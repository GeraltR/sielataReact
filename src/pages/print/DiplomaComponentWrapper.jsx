import { useRef } from "react";
import ReactToPrint from "react-to-print";
import Diploma from "./Diploma";

function DiplomaComponentWrapper({ prix }) {
  const diplomaRef = useRef(null);
  prix.typeName = "Dyplom";
  return (
    <td className="px-1 py-1 text-center">
      <ReactToPrint
        trigger={() => (
          <button className="hidden md:flex xl:flex max-w-36 justify-end xl:mt-auto ml-2 xl:ml-0 mr-2 xl:mr-1 md:mr-auto mb-2 xl:mb-0 bg-lime-400 text-gray-800 hover:bg-lime-600 hover:text-gray-50 font-semibold py-2 px-4 border border-lime-600 rounded shadow">
            Drukuj
          </button>
        )}
        content={() => diplomaRef.current}
        key={`reactToPront${prix.id}`}
      />
      <Diploma ref={diplomaRef} key={`diplomaPrint${prix.id}`} value={prix} />
    </td>
  );
}

export default DiplomaComponentWrapper;
