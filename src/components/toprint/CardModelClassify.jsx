const sectionRepeat = [0, 1, 2];

function CardModelClassify(props) {
  return (
    <>
      <tr>
        {sectionRepeat.map(() => (
          <>
            <td className="card-model  card-model-male">
              <span>Numer startowy:</span>
              <span className="card-model-food-center">
                {props.model.konkurs}
              </span>
            </td>
            <td className="card-model  card-model-male" colSpan="3">
              <span>Klasa modelu:</span>
              <span>
                {props.model.symbol} {props.model.categoryName}
              </span>
            </td>
            <td className="card-model  card-model-male">
              <span
                className={`${
                  props.model.kategoriaWiek != "Senior"
                    ? "bg-green-400"
                    : "bg-transparent"
                }`}
              >
                Kategoria wiekowa:{" "}
              </span>
              <span
                className={`${
                  props.model.kategoriaWiek != "Senior"
                    ? "bg-green-400"
                    : "bg-transparent"
                }`}
              >
                {props.model.kategoriaWiek}
              </span>
            </td>
          </>
        ))}
      </tr>
      <tr>
        {sectionRepeat.map(() => (
          <>
            <td className="card-model  card-model-duze" colSpan="5">
              <span>Nazwa modelu:</span>
              <span className="card-model-center">{props.model.nazwa}</span>
            </td>
          </>
        ))}
      </tr>
    </>
  );
}

export default CardModelClassify;
