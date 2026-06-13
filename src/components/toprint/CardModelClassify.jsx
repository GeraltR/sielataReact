import { Fragment } from "react";

const sectionRepeat = [0, 1];

function CardModelClassify(props) {
  return (
    <>
      <tr>
        {sectionRepeat.map((i) => (
          <Fragment key={i}>
            <td className="card-model  card-model-male">
              <span>Numer startowy:</span>
              <span className="card-model-food-center font-bold">
                {props.model.klasa} {props.model.konkurs}
              </span>
            </td>
            <td className="card-model  card-model-male" colSpan="3">
              <span>Klasa modelu:</span>
              <span>
                {props.model.symbol} {props.model.categoryName}
              </span>
            </td>
            <td className="card-model  card-model-male">
              <span>Kategoria wiekowa:</span>
              <span>{props.model.kategoriaWiek}</span>
            </td>
          </Fragment>
        ))}
      </tr>
      <tr>
        {sectionRepeat.map((i) => (
          <Fragment key={i}>
            <td className="card-model  card-model-duze" colSpan="5">
              <span>Nazwa modelu:</span>
              <span className="card-model-center">{props.model.nazwa}</span>
            </td>
          </Fragment>
        ))}
      </tr>
    </>
  );
}

export default CardModelClassify;
