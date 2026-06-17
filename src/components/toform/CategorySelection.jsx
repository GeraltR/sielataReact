import { useEffect } from "react";

function CategorySelection(props) {
  useEffect(() => {}, []);

  const onChange = (e) => {
    props.setValueCategoryId(e.target.value);
  };
  return (
    <>
      <div className="relative mb-4">
        <select
          className="appearance-none bg-gray-50 pl-4 pr-16 py-3 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
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
        <div className="pointer-events-none absolute inset-y-0 right-0 w-14 flex items-center justify-center border-l border-gray-300">
          <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      {props.error && (
        <div className="flex">
          <span className="text-red-400 text-sm m-2 p-2">{props.error[0]}</span>
        </div>
      )}
    </>
  );
}

export default CategorySelection;
