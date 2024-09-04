function ResultCompetitionList(props) {
  const models = props.models;
  let oldCategory = "";

  const NameOfCategory = (name) => {
    if (name === oldCategory) return "";
    else {
      oldCategory = name;
      return (
        <>
          <div className="h-4"></div>
          <div className="px-2 py-2 col-span-2 bg-orange-300 font-bold">
            {name}
          </div>
        </>
      );
    }
  };

  return (
    <div>
      {models.map((user, index) => (
        <>
          {NameOfCategory(user.categoryName)}
          <div
            key={`tabPrixesResults${index}`}
            className={`${
              index % 2 ? "bg-white" : "bg-stone-200"
            } bg-opacity-50 grid grid-cols-3`}
          >
            <div
              className={`px-1 py-2 text-left col-span-1
                ${user.place != "wyróżnienie" ? "before:content-['M_']" : ""}
              ${
                user.place != "wyróżnienie"
                  ? "xl:before:content-['Miejsce_']"
                  : ""
              }
              ${user.place === "wyróżnienie" ? "capitalize" : ""}
              `}
            >
              {user.place}
            </div>
            <div className="px-1 py-2 text-left col-span-1">
              {user.imie} {user.nazwisko}
            </div>
            <div className="px-1 py-2 text-left col-span-1 ">
              <span>{user.nazwa}</span>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default ResultCompetitionList;
