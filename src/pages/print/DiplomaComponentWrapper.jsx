import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Diploma from "./Diploma";

function DiplomaComponentWrapper({ prix }) {
  const contentRef = useRef(null);
  prix.typeName = "Dyplom";
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <td className="px-1 py-1 text-center">
      <button
        onClick={reactToPrintFn}
        key={`reactToPront${prix.id}`}
      >Drukuj</button>
      <Diploma ref={contentRef} key={`diplomaPrint${prix.id}`} value={prix} />
    </td>
  );
}

export default DiplomaComponentWrapper;
