const FormUserinput = (props) => {
  const { error, onChange, ...inputProps } = props;
  return (
    <div className="mb-4">
      <input
        className="
                    bordder-[#E9EDF4]
                    w-full
                    rounded-md
                    border
                    bg-[#FCFDFE]
                    py-3
                    p-5
                    text-base
                    text-body-color
                    placeholder-[#ACB6BE]
                    outline-none
                    focus:border-primary
                    focus-visible:shadow-none
                    FormInput
                    "
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
