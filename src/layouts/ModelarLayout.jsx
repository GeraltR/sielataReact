import ListRegisteredModels from "./ListRegisteredModels";
import { LearnersLayouts } from "./LearnersLayot";

function ModelarLayout(props) {
  const teacherId = props.userdata.id;

  return (
    <section className="block xl:grid xl:col-span-2 md:grid md:col-span-1 gap-8 p-3 h-max">
      <div className="xl:flex md:grid md:col-span-1 w-[100%] xl:w-[100%] md:w-[100%] 
      mb-4 xl:mb-0 md:mb-0 mr-0 xl:mr-0 md:mr-0 items-center px-6 py-8 bg-white bg-opacity-30
      rounded-lg shadow-md shadow-gray-200 h-max">
        <div className="xl:flex md:mr-auto items-center -mx-2">
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
            <p>
              {props.userdata.admin != 0
                ? props.userdata.admin === 1
                  ? "administrator"
                  : "sędzia"
                : "zawodnik"}
            </p>
          </div>
        </div>
      </div>
      <ListRegisteredModels
        background="bg-white bg-opacity-30 rounded-lg shadow-md shadow-gray-200"
        idContestant={props.userdata.id}
        user={`${props.userdata.imie} ${props.userdata.nazwisko}`}
        categories={props.categories}
        isadmin={props.isadmin}
      />

      <LearnersLayouts
        teacher={props.userdata.imie + ` ` + props.userdata.nazwisko}
        teacherEmail={props.userdata.email}
        idopiekuna={teacherId}
        categories={props.categories}
        showLearner={props.showLearner != 0 ? 1 : undefined}
        isadmin={props.isadmin}
      />
    </section>
  );
}

export default ModelarLayout;
