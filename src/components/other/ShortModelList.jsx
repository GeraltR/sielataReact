function ShortModelList(list) {
  return (
    <div className="grid divide-y md:col-span-1 justify-items-center w-[100%] xl:w-[85%] m-3 md:w-[85%] mb-4 items-center px-6 py-8 bg-white bg-opacity-30 rounded-lg shadow-md shadow-gray-200 h-13">
      <span className="pb-2 text-lg font-bold">Kategoria po połączeniu</span>
      <span className="pb-1 px-2 mb-3 text-sm font-bold bg-yellow-200">
        Uwaga! Dotyczy tylko modeli zarejestrownych przez seniorów.
      </span>
      <table className="table-fixed w-full">
        <tr className=" bg-orange-300">
          <th scope="col" className="px-1 py-2 w-[10%] text-left">
            Numer
          </th>
          <th scope="col" className="px-1 py-2 w-[80%] text-center">
            Nazwa modelu
          </th>
        </tr>
        {list.list.map((item, index) => {
          return (
            <>
              <tr key={index}>
                <td className="px-5">{item.konkurs}</td>
                <td className="px-5">{item.nazwa}</td>
              </tr>
            </>
          );
        })}
      </table>
    </div>
  );
}

export default ShortModelList;
