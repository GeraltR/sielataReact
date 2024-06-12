import useAuthContext from "../context/AuthContext";

export const FormPupilInputs = (props) => {
  const { add_pupil } = useAuthContext();

  const handleAddPupil = async (event) => {
    event.preventDefault();
    //setLoadaing(true);
    //await add_pupil({ props });
  };

  return (
    <div className="flex justify-left px-8 py-6 bg-white rounded-lg shadow-md shadow-gray-200  gap-y-4 gap-x-8">
      <div className="flex item-left">
        <button
          className="max-w-36 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={handleAddPupil}
        >
          Dodaj ucznia
        </button>
      </div>
    </div>
  );
};
