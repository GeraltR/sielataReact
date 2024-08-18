import { forwardRef } from "react";

const Diploma = forwardRef((props, ref) => {
  const { value } = props;
  return (
    <>
      <div
        key={`diplomMainDiv${value.id}`}
        className="hidden print:block"
        ref={ref}
      >
        <div className="grid justify-items-stretch width-full text-left font-bold text-2xl ml-[250px] mt-[100px]">
          <span className="font-bold uppercase tracking-[.25em]">
            {value.typeName}
          </span>
        </div>
        <div className="grid justify-items-stretch width-full text-center font-bold text-xl mx-[150px] mt-[50px]">
          {value.prix_name}
        </div>
        <div className="grid justify-items-stretch width-full text-center font-bold text-lg ml-[0px] mt-[0px]">
          <span className="font-bold">dla:</span>
          <span className="font-bold">
            {value.imie}&nbsp;{value.nazwisko}
          </span>
        </div>
        <div className="grid justify-items-stretch width-full text-center font-bold text-lg ml-[0px] mt-[10px]">
          za:
        </div>
        <div className="grid justify-items-stretch width-full text-center font-bold text-lg ml-[0px] mt-[0px]">
          {value.modelName}
        </div>
      </div>
    </>
  );
});

Diploma.displayName = "Diploma";

export default Diploma;
