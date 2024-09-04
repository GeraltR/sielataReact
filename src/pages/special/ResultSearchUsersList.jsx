function ResultSearchUsersList(props) {
  return (
    <div className="fixed columns-[39.5rem] mr-6 mt-2 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow-xl ">
      <ul
        className="flex flex-col overflow-y-scroll max-h-[60dvh] md:max-h-[25dvh] xl:max-h-[60dvh] py-2 text-lg text-cyan-700"
        aria-labelledby="dropdown-button"
      >
        {props.listUsers.map((user, index) => (
          <li key={`resultSearchUsersList${index}`}>
            <button
              type="button"
              className="inline-flex w-full px-4 py-2 hover:bg-cyan-100"
              onClick={() => props.handleCheckUser(user)}
            >
              <span className="px-2 my-auto font-bold">
                {user.imie} {user.nazwisko}
              </span>{" "}
              <span className="px-2">{user.email}</span>
              <span className="px-2 ml-auto mr-3 my-auto">{user.rokur}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultSearchUsersList;
