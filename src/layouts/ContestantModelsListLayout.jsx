import React from "react";

function ContestantModelsListLayout(props) {
  const handleUpdate = (model) => {
    props.handleOpenModyfiDialog(model);
  };

  const handleDelete = (id) => {
    console.log(`Usuń ${id}`);
  };

  return (
    <>
      {props.models.length === 0 && (
        <h2 className="font-medium text-gray-700">
          Jeszcze nie zgłoszono modeli
        </h2>
      )}
      {props.models.length != 0 && (
        <table className="table-auto w-full">
          <tr>
            <th>LP</th>
            <th scope="col" className="px-1 py-2 w-[55%] text-left">
              Nazwa modelu
            </th>
            <th scope="col" className="px-1 py-2 w-[25%] text-left">
              Producent
            </th>
            <th scope="col" className="px-1 py-2 w-[5%] text-left">
              skala
            </th>
            <th></th>
            <th></th>
          </tr>
          {props.models.map((model, index) => (
            <>
              <tr className={`${index % 2 ? "bg-white" : "bg-stone-200"}`}>
                <td className="px-1 py-2 w-[2%]">{index + 1}.</td>
                <td scope="col" className="px-1 py-2 w-[60%]">
                  {model.nazwa}
                </td>
                <td scope="col" className="px-1 py-2 w-[25%]">
                  {model.producent}
                </td>
                <td scope="col" className="px-1 py-2 w-[5%]">
                  {model.skala}
                </td>
                <td scope="col">
                  <button
                    onClick={() => handleUpdate(model)}
                    className="max-w-36 flex justify-end xl:mt-auto ml-2 xl:ml-0 mr-2 xl:mr-1 md:mr-auto mb-2 xl:mb-0 bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold py-2 px-4 border border-gray-600 rounded shadow"
                  >
                    Zmień
                  </button>
                </td>
                <td scope="col">
                  <button
                    onClick={() => handleDelete(model.id)}
                    className="max-w-36 flex justify-end xl:mt-auto ml-2 xl:ml-0 mr-2 xl:mr-1 md:mr-auto mb-2 xl:mb-0 bg-red-400 text-gray-800 hover:bg-red-600 hover:text-gray-50 font-semibold py-2 px-4 border border-red-600 rounded shadow"
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            </>
          ))}
        </table>
      )}
    </>
  );
}

export default ContestantModelsListLayout;
