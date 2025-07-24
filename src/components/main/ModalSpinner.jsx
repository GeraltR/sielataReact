import Modal from "@mui/material/Modal";
import HashLoader from "react-spinners/hashLoader";

const ModalSpinner = ({ ...props }) => {
  const override = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    border: "none",
    outline: "none"
  };

  return (
    <Modal
      open={props.visibled}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{outline: "none"}}
    >
      <HashLoader
        color={"#23b03f"}
        loading={props.visibled}
        cssOverride={override}
        size={80}
        aria-label="Ładowanie danych"
        data-testid="loader"
      />
    </Modal>
  );
};

export default ModalSpinner;
