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
        className={`border-gray-200
                    border-1
                    w-full
                    rounded-md
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
        id={`user-input-${inputProps.id}`}
        name={inputProps.name}
        type={inputProps.type}
        placeholder={inputProps.placeholder}
        required={inputProps.required}
        value={!inputProps.value ? "" : inputProps.value}
        error={inputProps && inputProps.error}
        onChange={onChange}
      />
      {error && (
        <div className="flex">
          <span className="text-red-400 text-sm m-2 p-2">{error && error[0]}</span>
        </div>
      )}
    </div>
  );
};

export default FormUserinput;
