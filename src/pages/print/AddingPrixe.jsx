import { forwardRef } from "react";

const AddingPrixe = forwardRef(function AddingPrixe(props, ref) {
  const { value } = props;
  const title = `uczestnictwo w XV Festiwalu Modelarskim w Jaworznie`;
  return (
    <div
      key={`diplomMainDiv${value.id}`}
      className="hidden print:block break-after-page"
      ref={ref}
    >
      <div className="grid justify-items-stretch width-full text-center font-bold text-2xl ml-[0px] mt-[400px]">
        <span className="font-bold uppercase tracking-[.25em]">
          {Object(value.typeName).length > 0 ? value.typeName : props.typeName}
        </span>
      </div>
      <div className="grid justify-items-stretch width-full text-center font-bold text-xl ml-[0px] mt-[50px]">
        <span className="font-bold">
          {Object(value.place).length > 0 ? `miejsce ${value.place}` : ""}
        </span>
      </div>
      <div className="grid justify-items-stretch width-full text-center font-bold text-xl ml-[0px] mt-[10px]">
        <span className="font-bold justify-center w-3/5 text-center mx-auto">
          {Object(value.categoryName).length > 0 ? `w kategorii:` : ""}
        </span>
        <span className="font-bold justify-center w-3/5 text-center mx-auto">
          {Object(value.categoryName).length > 0 ? `${value.categoryName}` : ""}
        </span>
      </div>
      <div className="grid justify-items-stretch width-full text-center font-bold text-lg ml-[0px] mt-[10px]">
        <span className="font-bold">dla:</span>
        <span className="font-bold">
          {value.imie}&nbsp;{value.nazwisko}
        </span>
      </div>
      <div className="grid justify-items-stretch width-full text-center font-bold text-lg ml-[0px] mt-[10px]">
        <span className="justify-center w-3/5 text-center mx-auto">
          za{Object(value.nazwa).length > 0 ? " model:" : ":"}
        </span>
        <span className="justify-center w-3/5 text-center mx-auto">
          {Object(value.nazwa).length > 0 ? value.nazwa : title}
        </span>
      </div>
    </div>
  );
});

export default AddingPrixe;
