import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Diploma from "./Diploma";

function DiplomaComponentWrapper({ prix }) {
  const contentRef = useRef(null);
  prix.typeName = "Dyplom";
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <td className="px-1 py-1 text-center">
      <button className={`
                    w-full
                    px-4
                    py-3
                    bg-indigo-500
                    hover:bg-indigo-700
                    rounded-md
                    text-white
                    `}
        onClick={reactToPrintFn}
        key={`reactToPront${prix.id}`}
      >Drukuj</button>
      <Diploma ref={contentRef} key={`diplomaPrint${prix.id}`} value={prix} />
    </td>
  );
}

export default DiplomaComponentWrapper;
