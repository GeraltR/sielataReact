function ContestantModelsListLayout(props) {
  const handleUpdate = (model) => {
    props.handleOpenModyfiDialog(model);
  };

  const handleDelete = (model) => {
    props.handleDelete(model);
  };

  return (
    <>
      {props.models.length === 0 && (
        <h2 className="font-medium text-gray-700">
          Jeszcze nie zgłoszono modeli
        </h2>
      )}
      {props.models.length != 0 && (
        <>
          {/* Mobile card view */}
          <div className="block md:hidden w-full space-y-2">
            {props.models.map((model, index) => (
              <div
                key={`model-card-${model.id}`}
                className={`p-3 rounded ${index % 2 ? "bg-white" : "bg-stone-200"} bg-opacity-30`}
              >
                <div className="font-bold">{index + 1}. {model.nazwa}</div>
                <div className="text-sm text-gray-600">
                  {model.producent} · skala {model.skala}
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {props.isadmin ? (
                    <button
                      onClick={() => window.open(`/printmodelcard?model=${model.id}`, '_blank')}
                      className="bg-blue-100 text-gray-800 hover:bg-blue-200 font-semibold py-1 px-3 border border-blue-400 rounded shadow text-sm"
                    >
                      Karta
                    </button>
                  ) : null}
                  {(model.konkurs == 0 || props.isadmin & 4) && (
                    <button
                      onClick={() => handleUpdate(model)}
                      className="bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold py-1 px-3 border border-gray-600 rounded shadow text-sm"
                    >
                      Zmień
                    </button>
                  )}
                  {(model.konkurs == 0 || props.isadmin & 4) && (
                    <button
                      onClick={() => handleDelete(model)}
                      className="bg-red-400 text-gray-800 hover:bg-red-600 hover:text-gray-50 font-semibold py-1 px-3 border border-red-600 rounded shadow text-sm"
                    >
                      Usuń
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table view */}
          <table className="hidden md:table table-auto w-full" id="contestant-table-models">
            <thead>
              <tr id="contestant-table-header">
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {props.models.map((model, index) => (
                <tr
                  className={`${
                    index % 2 ? "bg-white" : "bg-stone-200"
                  } bg-opacity-30 `}
                  key={`contestant-table-row-model-${model.id}`}
                >
                  <td className="px-1 py-2 w-[2%] font-bold" id={`contestant-table-column-A-${model.id}`}>{index + 1}.</td>
                  <td scope="col" className="px-1 py-2 w-[60%] font-bold">
                    {model.nazwa}
                  </td>
                  <td scope="col" className="px-1 py-2 w-[25%]" id={`contestant-table-column-B-${model.id}`}>
                    {model.producent}
                  </td>
                  <td scope="col" className="px-1 py-2 w-[5%]" id={`contestant-table-column-c-${model.id}`}>
                    {model.skala}
                  </td>
                  <td scope="col" id={`contestant-table-column-C2-${model.id}`}>
                    {props.isadmin ? (
                      <button
                        onClick={() => window.open(`/printmodelcard?model=${model.id}`, '_blank')}
                        className="max-w-36 flex justify-end xl:mt-auto ml-2 xl:ml-0 mr-2 xl:mr-1 md:mr-auto mb-2 xl:mb-0 bg-blue-100 text-gray-800 hover:bg-blue-200 font-semibold py-2 px-4 border border-blue-400 rounded shadow"
                      >
                        Karta
                      </button>
                    ) : null}
                  </td>
                  <td scope="col" id={`contestant-table-column-D-${model.id}`}>
                    {(model.konkurs == 0 || props.isadmin & 4) && (
                      <button
                        onClick={() => handleUpdate(model)}
                        className="max-w-36 flex justify-end xl:mt-auto ml-2 xl:ml-0 mr-2 xl:mr-1 md:mr-auto mb-2 xl:mb-0 bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold py-2 px-4 border border-gray-600 rounded shadow"
                      >
                        Zmień
                      </button>
                    )}
                  </td>
                  <td scope="col" id={`contestant-table-column-E-${model.id}`}>
                    {(model.konkurs == 0 || props.isadmin & 4) && (
                      <button
                        onClick={() => handleDelete(model)}
                        className="max-w-36 flex justify-end xl:mt-auto ml-2 xl:ml-0 mr-2 xl:mr-1 md:mr-auto mb-2 xl:mb-0 bg-red-400 text-gray-800 hover:bg-red-600 hover:text-gray-50 font-semibold py-2 px-4 border border-red-600 rounded shadow"
                      >
                        Usuń
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default ContestantModelsListLayout;
