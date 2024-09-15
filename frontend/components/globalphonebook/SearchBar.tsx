type SearchBarProps = {
  onClick: () => void;
  changeMethod: (method: "name" | "phone") => void;
  searchText: string;
  setSearchText: (query: string) => void;
};

export const SearchBar = ({
  onClick,
  changeMethod,
  searchText,
  setSearchText,
}: SearchBarProps) => {
  return (
    <section className="w-full bg-white rounded-full overflow-clip flex justify-between border border-solid border-gray-200 ">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full py-3 pl-5 md:pl-10 outline-none font-medium"
        placeholder="Search"
      />
      <div className="w-max flex gap-2  ">
        <select
          onChange={(e) => changeMethod(e.target.value as "phone" | "name")}
          name=""
          id=""
          className="outline-none shadow-none rounded-none text-sm font-medium"
        >
          <option value="name">by Name</option>
          <option value="phone">by Phone</option>
        </select>
        <button
          onClick={onClick}
          className="bg-indigo-500 px-5 md:px-10 text-white font-bold active:bg-indigo-900"
        >
          Search
        </button>
      </div>
    </section>
  );
};
