import { useEffect } from "react";
import CategorySelection from "./CategorySelection";

function ClassRadioButton(props) {
  useEffect(() => {}, []);
  return (
    <>
      <div className="flex items-center me-4 mb-2">
        <input
          checked={props.categoriesFiltr === "K"}
          id={`kartonRadio${props.kartonName}`}
          type="radio"
          value="K"
          name={`kartonRadio${props.kartonName}`}
          className="w-5 h-6  float-right text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-1"
          onChange={() => {
            props.OnClickClassModel("K");
          }}
        />
        <label
          htmlFor={`kartonRadio${props.kartonName}`}
          className="ms-2 text-base font-medium text-gray-900"
        >
          Karton
        </label>
      </div>
      <div className="flex items-center mb-2">
        <input
          checked={props.categoriesFiltr === "P"}
          id={`kartonRadio${props.plastikName}`}
          type="radio"
          value="P"
          name={`kartonRadio${props.plastikName}`}
          className="w-5 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-1"
          onChange={() => {
            props.OnClickClassModel("P");
          }}
        />
        <label
          htmlFor={`kartonRadio${props.plastikName}`}
          className="ms-2 text-base font-medium text-gray-900 dark:text-gray-300"
        >
          Plastik
        </label>
      </div>
      <CategorySelection
        categories={props.categories}
        classModelValue={props.categoriesFiltr}
        valueCategoryId={props.valueCategoryId}
        setValueCategoryId={props.setValueCategoryId}
        error={props.error}
      />
    </>
  );
}

export default ClassRadioButton;
