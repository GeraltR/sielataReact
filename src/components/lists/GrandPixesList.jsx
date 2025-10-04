function GrandPixesList(props) {
  const prixes = props.prixes;
  let oldPrixe = "";

  const NameOfPrixe = (name, index) => {
    if (name === oldPrixe) return "";
    else {
      oldPrixe = name;
      return (
        <>
          <div key={`grandPrixeH${name}${index}`} className="h-4"></div>
          <div className="px-2 py-2 col-span-2 bg-orange-300 font-bold">
            {name}
          </div>
        </>
      );
    }
  };

  return (
    <div>
      {prixes.map((prixe, index) => (
        <>
          {NameOfPrixe(prixe.prix_name)}
          <div
            key={`rowGrandPrixe${index}`}
            className={`${
              index % 2 ? "bg-white" : "bg-stone-200"
            } bg-opacity-50 grid grid-cols-3 gap-4`}
          >
            <div className="px-1 py-1 text-left col-span-1">
              {prixe.imie} {prixe.nazwisko}
            </div>
            <div className="px-1 py-1 text-left col-span-1">
              {prixe.modelName}
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default GrandPixesList;
