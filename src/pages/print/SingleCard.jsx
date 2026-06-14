import CardModelClassify from "../../components/toprint/CardModelClassify";
import CardModelContenstant from "../../components/toprint/CardModelContenstant";

export default function SingleCard({ model, festival, termDiscription }) {
  return (
    <table className="card-model w-full">
      <thead>
        <tr>
          <th className="card-model" colSpan="5">
            KARTA POD MODEL
          </th>
          <th className="card-model" colSpan="5">
            KARTA ODBIORU MODELU
          </th>
        </tr>
        <tr>
          <th className="card-model" colSpan="5">
            {festival?.edition} {festival?.title}
            <br />
            {termDiscription}
          </th>
          <th className="card-model" colSpan="5">
            {festival?.edition} {festival?.title}
            <br />
            {termDiscription}
          </th>
        </tr>
      </thead>
      <tbody>
        <CardModelClassify model={model} />
        <CardModelContenstant model={model} festival={festival} />
      </tbody>
    </table>
  );
}
