function GrandPixesList({ prixes }) {
  const groups = prixes.reduce((acc, prixe) => {
    const key = prixe.prix_name;
    if (!acc[key]) acc[key] = [];
    acc[key].push(prixe);
    return acc;
  }, {});

  if (prixes.length === 0) return null;

  return (
    <div className="w-full">
      <h2 className="text-white font-black text-2xl uppercase tracking-widest mb-4 flex items-center gap-2">
        🏆 Grand Prix
      </h2>
      <div className="space-y-4">
        {Object.entries(groups).map(([name, items]) => (
          <div key={name} className="rounded-xl overflow-hidden shadow-lg">
            <div className="bg-amber-500 text-white font-bold px-4 py-2 text-sm uppercase tracking-wide">
              {name}
            </div>
            <div className="bg-white/85 backdrop-blur-sm">
              {items.map((prixe, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-2 gap-2 px-4 py-2 text-sm ${
                    i % 2 ? "bg-amber-50/60" : ""
                  } ${i < items.length - 1 ? "border-b border-amber-100/50" : ""}`}
                >
                  <span className="font-semibold text-gray-800">
                    {prixe.imie} {prixe.nazwisko}
                  </span>
                  <span className="text-gray-600">{prixe.modelName}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GrandPixesList;
