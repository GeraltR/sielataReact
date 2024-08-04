function ResultSearchModelList(props) {
  return (
    <div className="fixed columns-[39.5rem] mr-6 mt-2 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow-xl ">
      <ul
        className="flex flex-col overflow-y-scroll max-h-[60dvh] md:max-h-[25dvh] xl:max-h-[60dvh] py-2 text-lg text-cyan-700"
        aria-labelledby="dropdown-button"
      >
        {props.listModels.map((model, index) => (
          <li key={index}>
            <button
              type="button"
              className="inline-flex w-full px-4 py-2 hover:bg-cyan-100"
              onClick={() => props.handleAddPrix(model)}
            >
              <span className="px-2 my-auto font-bold">{model.konkurs}</span>{" "}
              <span className="px-2">{model.nazwa}</span>
              <span
                className={`ml-auto mr-3 my-auto max-h-[2rem] text-right px-3 text-white font-bold ${
                  model.klasa === "K" ? "bg-lime-600" : "bg-amber-800"
                }`}
              >
                {model.klasa}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultSearchModelList;
