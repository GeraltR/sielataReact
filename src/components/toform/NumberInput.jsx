function NumberInput({ ...props }) {
  const handleAddNumer = () => {
    props.onChange(props.value + 1);
  };
  const handleDescNumer = () => {
    const min = parseInt(props.minValue);
    const value = parseInt(props.value);
    if (value > 1 && min <= value - 1) props.onChange(props.value - 1);
  };

  const handleChangeNumber = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) props.onChange(value);
  };

  return (
    <>
      <label
        htmlFor={props.name}
        className="block my-auto mx-2 pr-2 text-lg font-medium text-gray-900 dark:text-white"
      >
        {props.text}
      </label>
      <div className="relative flex items-center max-w-[8rem]">
        <button
          type="button"
          id={`${props.name}desc`}
          data-input-counter-decrement={props.name}
          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          onClick={handleDescNumer}
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="text"
          id={props.name}
          data-input-counter
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={props.value}
          value={props.value}
          onChange={handleChangeNumber}
          required
        />
        <button
          type="button"
          id={`${props.name}inc`}
          data-input-counter-increment={props.name}
          className="mr-2 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          onClick={handleAddNumer}
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default NumberInput;
