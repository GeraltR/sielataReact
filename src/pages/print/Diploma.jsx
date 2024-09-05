import { forwardRef } from "react";

const Diploma = forwardRef(function Diploma(props, ref) {
  const { value } = props;
  return (
    <>
      <div
        key={`diplomMainDiv${value.id}`}
        className="hidden print:block"
        ref={ref}
      >
        <div className="grid justify-items-stretch width-full text-center text-green-700 font-bold text-4xl ml-[0px] mt-[300px]">
          <span className="font-bold uppercase tracking-[.25em]">
            {value.typeName}
          </span>
        </div>
        <div className="grid justify-items-stretch width-full text-center font-bold text-xl ml-[0px] mt-[50px]">
          <span className="font-bold justify-center w-3/5 text-center font-printLight mx-auto">
            {value.prix_name}
          </span>
        </div>
        <div className="grid justify-items-stretch width-full text-center font-bold text-xl ml-[0px] mt-[10px]">
          <span className="font-bold">dla:</span>
          <span className="font-bold">
            {value.imie} {value.nazwisko}
          </span>
        </div>
        <div className="grid justify-items-stretch width-full text-center font-bold text-lg ml-[0px] mt-[10px]">
          za:
        </div>
        <div className="grid justify-items-stretch width-full text-center font-bold text-lg ml-[0px] mt-[0px]">
          <span className="font-bold justify-center w-3/5 text-center font-printLight mx-auto">
            {value.modelName}
          </span>
        </div>
      </div>
    </>
  );
});

export default Diploma;
