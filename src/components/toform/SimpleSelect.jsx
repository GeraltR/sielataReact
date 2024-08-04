function SimpleSelect(props) {
  return (
    <select
      className="bg-gray-50 mb-4 py-3 p-5 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      value={props.selectedValue}
      onChange={props.handleChangeValue}
    >
      {props.list.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
}

export default SimpleSelect;
