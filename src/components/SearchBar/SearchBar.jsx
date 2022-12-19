import React, { useContext } from "react";
import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";
import { FilterContext } from "../Context/ContextFilter";

export default function SearchBar({placeText}) {
  const { state, dispath } = useContext(FilterContext);

  const searchKeywordHandler = (e) => {
    dispath({ type: "SEARCH_KEYWORD", payload: e.target.value });
  };
  return (
    <div className="searchBar_box">
      <input
        onChange={(e) => searchKeywordHandler(e)}
        type="text"
        placeholder={placeText}
        value={state.searchKey}
      />
      <span>
        <FiSearch />
      </span>
    </div>
  );
}
