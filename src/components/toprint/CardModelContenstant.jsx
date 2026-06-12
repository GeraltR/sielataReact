import { QRCodeSVG } from "qrcode.react";
import SieLataFooter from "../other/SieLataFooter";

function CardModelContenstant({ model, festival }) {
  return (
    <>
      <tr>
        <td className="card-model card-model-duze" colSpan="4">
          <span>Producent/wydawnictwo:</span>
          <span>{model.producent}</span>
        </td>
        <td className="card-model card-model-duze" colSpan="1">
          <span>Skala:</span>
          <span>{model.skala}</span>
        </td>
        <td className="card-model card-model-duze" colSpan="4">
          <span>Producent/wydawnictwo:</span>
          <span>{model.producent}</span>
        </td>
        <td className="card-model card-model-duze" colSpan="1">
          <span>Skala:</span>
          <span>{model.skala}</span>
        </td>
      </tr>
      <tr>
        <td className="card-model card-model-duze" colSpan="5">
          <span className="card-model-center">PROSIMY NIE DOTYKAC MODELI</span>
        </td>
        <td className="card-model card-model-duze" colSpan="5">
          <div className="flex items-center justify-between px-1">
            <div>
              <div className="text-2xl font-semibold">{model.imie} {model.nazwisko}</div>
              <div>{model.klub || model.miasto}</div>
            </div>
            <QRCodeSVG value={String(model.id)} size={72} />
          </div>
        </td>
      </tr>
      <tr>
        <td className="card-model card-model-footer" colSpan="5">
          <SieLataFooter year={festival?.year} />
        </td>
        <td className="card-model card-model-footer" colSpan="5">
          <SieLataFooter year={festival?.year} />
        </td>
      </tr>
    </>
  );
}

export default CardModelContenstant;
