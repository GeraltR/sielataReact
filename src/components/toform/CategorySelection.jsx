import { useEffect, useState } from "react";

function CategorySelection(props) {
  const [categoriesFiltr, setCategoriesFiltr] = useState("K");

  const handleOnChangeCategory = (e) => {
    props.setValueCategory(e.target.value);
  };

  useEffect(() => {}, [props.valueCategory]);

  return (
    <>
      <div className="flex items-center me-4 mb-2">
        <input
          checked={categoriesFiltr === "K"}
          id="kartonRadio"
          type="radio"
          value="K"
          name="kartonRadio"
          className="w-5 h-6  float-right text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-1"
          onClick={() => setCategoriesFiltr("K")}
        />
        <label
          htmlFor="kartonRadio"
          className="ms-2 text-base font-medium text-gray-900"
        >
          Karton
        </label>
      </div>
      <div className="flex items-center mb-2">
        <input
          checked={categoriesFiltr === "P"}
          id="plastikRadio"
          type="radio"
          value="P"
          name="plastikRadio"
          className="w-5 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-1"
          onClick={() => setCategoriesFiltr("P")}
        />
        <label
          htmlFor="plastikRadio"
          className="ms-2 text-base font-medium text-gray-900 dark:text-gray-300"
        >
          Plastik
        </label>
      </div>
      <select
        className="bg-gray-50 mb-4 py-3 p-5 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        defaultValue={props.valueCategory}
        onChange={handleOnChangeCategory}
      >
        {props.categories.categories
          .filter((category) => category.klasa === categoriesFiltr)
          .map((category) => (
            <option key={category.idkat} value={category.idkat}>
              {category.symbol}&nbsp;
              {category.nazwa}
            </option>
          ))}
      </select>
    </>
  );
}

export default CategorySelection;
