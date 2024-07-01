import { useEffect } from "react";

function CategorySelection(props) {
  useEffect(() => {}, []);

  const onChange = (e) => {
    props.setValueCategoryId(e.target.value);
  };
  return (
    <>
      <select
        className="bg-gray-50 mb-4 py-3 p-5 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={props.valueCategoryId}
        onChange={onChange}
      >
        {props.categories.categories
          .filter((category) => category.klasa === props.classModelValue)
          .map((category) => (
            <option key={category.idkat} value={category.idkat}>
              {category.symbol}&nbsp;
              {category.nazwa}
            </option>
          ))}
      </select>
      {props.error && (
        <div className="flex">
          <span className="text-red-400 text-sm m-2 p-2">{props.error[0]}</span>
        </div>
      )}
    </>
  );
}

export default CategorySelection;
