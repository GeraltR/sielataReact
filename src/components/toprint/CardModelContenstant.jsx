function CardModelContenstant(props) {
  const sectionRepeat = [0, 1];

  return (
    <>
      <tr>
        <td className="card-model card-model-duze" colSpan="5">
          <span>Imię i nazwisko:</span>
          <span>
            {props.model.imie} {props.model.nazwisko}
          </span>
        </td>
        {sectionRepeat.map(() => (
          <>
            <td className="card-model card-model-duze" colSpan="4">
              <span>Producent/wydawnictwo:</span>
              <span>{props.model.producent}</span>
            </td>
            <td className="card-model card-model-duze" colSpan="1">
              <span>Skala:</span>
              <span>{props.model.skala}</span>
            </td>
          </>
        ))}
      </tr>
      <tr>
        <td className="card-model card-model-duze" colSpan="5">
          <span>KLUB, MIEJSCOWOŚĆ:</span>
          <span className="card-model-food-center">
            {props.model.klub} {props.model.miasto}
          </span>
        </td>
        <td className="card-model card-model-duze" colSpan="5">
          <span className="card-model-center">PROSIMY NIE DOTYKAC MODELI</span>
        </td>
        <td className="card-model card-model-duze" colSpan="5">
          <span className="card-model-food-center">
            Prosimy o okazanie przy odbieraniu modelu
          </span>
        </td>
      </tr>
    </>
  );
}

export default CardModelContenstant;
