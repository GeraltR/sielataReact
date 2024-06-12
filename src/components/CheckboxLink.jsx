const CheckboxLink = ({ ...props }) => {
  return (
    <div className="mb-4">
      <div className="inline-flex">
        <label
          className="relative flex items-center p-3 -mt-2 rounded-full cursor-pointer"
          htmlFor={props.name}
        >
          <input
            disabled={props.disabled}
            type="checkbox"
            className={`"before:content[''] peer relative h-5 w-5 appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
              ${
                !props.disabled
                  ? "cursor-pointer"
                  : "cursor-not:allowed opacity-10"
              }
              `}
            id={props.name}
            value={props.checked}
            checked={props.checked}
            onChange={props.onChange}
          />
          <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </label>
        <label
          className={`"mt-px font-light text-gray-700 select-none"
            ${
              !props.disabled
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-10"
            }
            `}
          htmlFor={props.name}
        >
          <p
            disabled={props.disabled}
            className="flex font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900"
          >
            {props.description}
            <a
              disabled={props.disabled}
              href={props.linkAddress}
              className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-500 transition-colors hover:text-blue-700"
            >
              &nbsp;{props.linkText}
            </a>
            .
          </p>
        </label>
      </div>
      {props.isError && (
        <label className="mt-px font-light text-red-700">
          <div>
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-red-700">
              {props.errorText}
            </p>
          </div>
        </label>
      )}
    </div>
  );
};

export default CheckboxLink;
