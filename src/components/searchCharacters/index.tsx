import React from "react";
import "./styles.css";
import SearchIcon from "../../img/search.svg";

type SearchBarProps = {
  setSearchedCharacter: React.Dispatch<React.SetStateAction<string>>;
  searchedCharachter: string;
};

const SearchBar = ({
  setSearchedCharacter,
  searchedCharachter,
}: SearchBarProps) => {
  const handleChange = (e: any) => {
    setSearchedCharacter(e.target.value.toLowerCase());
  };
  return (
    <div className="searchContainer">
      <div className="rootSearchBar">
        <img src={SearchIcon} alt="search icon" />
        <input
          type="text"
          className="inputSearch"
          placeholder="Search Characters..."
          onChange={handleChange}
          value={searchedCharachter}
        />
      </div>
      <div className="line" />
    </div>
  );
};

export default SearchBar;
