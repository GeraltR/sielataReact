//import { CSSProperties } from "react";
import HashLoader from "react-spinners/hashLoader";

const ModalSpinner = ({ ...props }) => {
  const override = {
    top: props.top,
    left: props.left,
    position: "fixed",
  };

  return (
    <>
      {props.visibled && (
        <>
          <div className="fixed bottom-0 w-dvw h-dvh bg-stone-600 text-white text-base font-medium opacity-30 z-20"></div>
          <HashLoader
            color={"#23b03f"}
            loading={props.visibled}
            cssOverride={override}
            size={80}
            aria-label="Ładowanie danych"
            data-testid="loader"
          />
        </>
      )}
    </>
  );
};

export default ModalSpinner;
