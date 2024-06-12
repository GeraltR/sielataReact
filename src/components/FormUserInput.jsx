const FormUserinput = (props) => {
  const { error, onChange, label, ...inputProps } = props;

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-base text-start" htmlFor={inputProps.name}>
          <span
            className={`"block text-sm font-medium text-slate-700"
            ${!inputProps.disabled ? "" : "opacity-10"}
            `}
          >
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
                    focus:border-primary
                    focus-visible:shadow-none
                    FormInput
                    ${
                      !inputProps.disabled
                        ? "text-base placeholder-[#ACB6BE] bg-[#FCFDFE] text-body-color cursor-auto"
                        : "opacity-10 bg-[stone-600] text-stone-200-25 cursor-not-allowed"
                    }
                    `}
        disabled={!inputProps.disabled}
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
