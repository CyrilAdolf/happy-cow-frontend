import React, { useState } from "react";
import "./searchBar.css";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({ initialSearch }) => {
  const history = useHistory();
  const [search, setSearch] = useState(initialSearch || "");

  const handleClick = (event) => {
    event.preventDefault();
    history.push({
      pathname: `/search/location`,
      state: { search: search },
      search: `search=${search}`,
    });
  };

  return (
    <form
      className="searchBarHome"
      onSubmit={(event) => {
        handleClick(event);
      }}
    >
      <input
        type="text"
        placeholder="Search for city, region or zipcode"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <button>
        <FontAwesomeIcon icon="search" className="icon" />
      </button>
    </form>
  );
};

export default SearchBar;
