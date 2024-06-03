const FormUserinput = (props) => {
  const { error, onChange, label, ...inputProps } = props;

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-base text-start" htmlFor={inputProps.name}>
          <span className="block text-sm font-medium text-slate-700">
            {inputProps.placeholder} {inputProps.required && "*"}
          </span>
        </label>
      )}
      <input
        className={`bordder-[#E9EDF4]
                    w-full
                    rounded-md
                    border
                    py-3
                    p-5
                    text-base
                    text-body-color
                    placeholder-[#ACB6BE]
                    outline-none
                    focus:border-primary
                    focus-visible:shadow-none
                    FormInput
                    bg-[#FCFDFE]
                    ${
                      !inputProps.disabled
                        ? "cursor-auto;"
                        : "cursor-not-allowed"
                    }`}
        {...inputProps}
        onChange={onChange}
      />
      {error && (
        <div className="flex">
          <span className="text-red-400 text-sm m-2 p-2">{error[0]}</span>
        </div>
      )}
    </div>
  );
};

export default FormUserinput;
