const PLACE_ICONS = { "1": "🥇", "2": "🥈", "3": "🥉" };

function placeIcon(place) {
  return PLACE_ICONS[place] ?? "✦";
}

function categoryLabel(klasa, symbol, name) {
  const material = klasa === "P" ? "Plastik" : "Karton";
  return `[${material}] ${symbol} ${name}`;
}

function ResultCompetitionList({ models }) {
  const groups = models.reduce((acc, model) => {
    const key = `${model.klasa}|${model.symbol}|${model.categoryName}`;
    if (!acc[key]) acc[key] = { label: categoryLabel(model.klasa, model.symbol, model.categoryName), items: [] };
    acc[key].items.push(model);
    return acc;
  }, {});

  if (models.length === 0) return null;

  return (
    <div className="w-full">
      <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-4 flex items-center gap-2">
        🎖 Wyniki kategorii
      </h2>
      <div className="space-y-4">
        {Object.entries(groups).map(([key, { label, items }]) => (
          <div key={key} className="rounded-xl overflow-hidden shadow-lg">
            <div className="bg-sky-700 text-white font-bold px-4 py-2 text-sm uppercase tracking-wide">
              {label}
            </div>
            <div className="bg-white/85 backdrop-blur-sm">
              {items.map((user, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[auto_1fr_1fr] gap-x-3 px-4 py-2 text-sm items-center ${
                    i % 2 ? "bg-sky-50/60" : ""
                  } ${i < items.length - 1 ? "border-b border-sky-100/50" : ""}`}
                >
                  <span className="text-lg leading-none w-7 text-center">
                    {placeIcon(user.place)}
                  </span>
                  <span className="font-semibold text-gray-800">
                    {user.imie} {user.nazwisko}
                  </span>
                  <span className="text-gray-600 truncate">{user.nazwa}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultCompetitionList;
