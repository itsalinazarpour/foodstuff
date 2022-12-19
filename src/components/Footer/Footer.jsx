import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaArrowUp } from "react-icons/fa";
import LanguageSelect from "./../LngSelect/LanguageSelect";
import { ProductContext } from "../Context/ContextProvider";

export default function Footer() {
  const { state: lng } = useContext(ProductContext);

  const handelToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <footer className="footer">
      <span onClick={handelToTop} className="go_top">
        <FaArrowUp />
      </span>

      <div className="footer_last">
        <div className="footer_link_box">
          <Link to={"/basket"}>{lng.lng === "PR" ? " سبد خرید" : "Cart"}</Link>
          <Link to={"/favorite"}>
            {lng.lng === "PR" ? " علاقه مندی ها" : "Favorite"}
          </Link>
        </div>
        <div className="footer_link_box">
          <a
            href="https://github.com/erfjs/foodstuffs_store"
            target="_blank"
            rel="noopener noreferrer"
          >
            {lng.lng === "PR"
              ? "سورس کد پروژه در گیت هاب"
              : "Project source code on GitHub"}
          </a>
          <LanguageSelect />
        </div>
      </div>
    </footer>
  );
}
