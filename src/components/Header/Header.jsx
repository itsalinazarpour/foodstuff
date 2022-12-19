import React, { useContext, useEffect } from "react";
import "./Header.css";
import { AiOutlineShopping } from "react-icons/ai";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { ProductContext } from "../Context/ContextProvider";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

function Header() {
  const { state, dispath } = useContext(ProductContext);
  const location = useLocation();

  useEffect(() => {
    dispath({ type: "PRICE_LOAD" });
  }, [dispath]);

  useEffect(() => {
    document.body.setAttribute("dir", state.lng === "PR" ? "rtl" : "ltr");
  }, [state.lng]);

  return (
    <header className="header">
      <nav className="nav">
        <Link to={"/"} className="logo">
          {state.lng === "PR" ? "  فروشگاه مواد غذایی " : "Foodstuffs Store"}
        </Link>
        <div className="search_header">
          {location.pathname === "/" && (
            <SearchBar
              placeText={state.lng === "PR" ? "جستجو کنید ..." : "searching..."}
            />
          )}
        </div>
        <div className="icon_Sopping_box">
          <Link to={"/basket"} className="shoppe_icon_box" aria-label="basket">
            <AiOutlineShopping className="shop_icon" />
            {state.basket.length > 0 && (
              <span className="badge_shope">{state.basket.length}</span>
            )}
          </Link>
          <Link
            to={"/favorite"}
            aria-label="favorite"
            className={`mark_icon_box ${
              state.favorites.length > 0 ? "tada" : ""
            }`}
          >
            <BsFillBookmarkHeartFill className="mark_icon" />
            {state.favorites.length > 0 && (
              <span className="badge_mark">{state.favorites.length}</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
