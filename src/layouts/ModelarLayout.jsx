import { PupillsLayouts } from "./PupillsLayot";

function ModelarLayout(props) {
  const teacherId = props.userdata.id;

  return (
    <section className="grid col-span-2 gap-8 p-3 h-max">
      <div className="flex items-center px-6 py-8 bg-white rounded-lg shadow-md shadow-gray-200 h-13">
        <div className="flex items-center -mx-2">
          <svg
            className="mx-2"
            width="70"
            height="70"
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="35" cy="35" r="35" fill="#713BDB" fillOpacity="0.05" />
            <path
              d="M26 44C26 40.625 30.5 40.625 32.75 38.375C33.875 37.25 30.5 37.25 30.5 31.625C30.5 27.8754 31.9996 26 35 26C38.0004 26 39.5 27.8754 39.5 31.625C39.5 37.25 36.125 37.25 37.25 38.375C39.5 40.625 44 40.625 44 44"
              stroke="#6F52ED"
              strokeWidth="2"
              strokeLinecap="square"
            />
          </svg>

          <div className="mx-2">
            <h3 className="text-2xl font-medium text-gray-800">
              Modele zgłoszone dla:
            </h3>
            <p className="mt-1 text-2xl text-gray-500">
              {props.userdata.imie} {props.userdata.nazwisko}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center px-8 py-6 bg-white rounded-lg shadow-md shadow-gray-200  gap-y-4 gap-x-8">
        <button className="max-w-36 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          Dodaj model
        </button>
        <div className="flex item-left">
          <h2 className="font-medium text-gray-700">
            Jeszcze nie zgłoszono modeli
          </h2>
        </div>
      </div>
      {props.showPupill && (
        <PupillsLayouts
          teacher={props.userdata.imie + ` ` + props.userdata.nazwisko}
          idopiekuna={teacherId}
        />
      )}
    </section>
  );
}

export default ModelarLayout;
