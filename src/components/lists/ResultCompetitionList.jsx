import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

const PLACE_ORDER = { pierwsze: 1, drugie: 2, trzecie: 3, wyróżnienie: 4 };
const PLACE_COLOR = {
  pierwsze: "text-yellow-600",
  drugie: "text-gray-400",
  trzecie: "text-amber-700",
};

function placeColor(place) {
  return PLACE_COLOR[place] ?? "text-sky-600";
}

function PlaceMarker({ place }) {
  if (PLACE_COLOR[place]) {
    return <MilitaryTechIcon className={placeColor(place)} fontSize="medium" />;
  }
  return <span className={`text-lg leading-none ${placeColor(place)}`}>✦</span>;
}

function sortByPlaceThenName(a, b) {
  const placeDiff = (PLACE_ORDER[a.place] ?? 99) - (PLACE_ORDER[b.place] ?? 99);
  if (placeDiff !== 0) return placeDiff;
  return (
    (a.nazwisko || "").localeCompare(b.nazwisko || "", "pl") ||
    (a.imie || "").localeCompare(b.imie || "", "pl")
  );
}

function categoryLabel(klasa, symbol, name) {
  const material = klasa === "P" ? "Plastik" : "Karton";
  return `[${material}] ${symbol} ${name}`;
}

function ResultCompetitionList({ models }) {
  const groups = models.reduce((acc, model) => {
    const key = `${model.klasa}|${model.symbol}|${model.categoryName}`;
    if (!acc[key]) {
      acc[key] = {
        label: categoryLabel(model.klasa, model.symbol, model.categoryName),
        grupa: model.grupa ?? key,
        items: [],
      };
    }
    acc[key].items.push(model);
    return acc;
  }, {});

  const sortedGroups = Object.entries(groups).sort(([, a], [, b]) =>
    (a.grupa || "").localeCompare(b.grupa || "", "pl")
  );

  sortedGroups.forEach(([, group]) => group.items.sort(sortByPlaceThenName));

  if (models.length === 0) return null;

  return (
    <div className="w-full">
      <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-4 flex items-center gap-2">
        🎖 Wyniki kategorii
      </h2>
      <div className="space-y-4">
        {sortedGroups.map(([key, { label, items }]) => (
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
                  <span className="w-7 flex items-center justify-center">
                    <PlaceMarker place={user.place} />
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
