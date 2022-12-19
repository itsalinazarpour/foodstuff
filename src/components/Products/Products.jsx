import React, { useContext } from "react";
import "./Products.css";
import Filter from "./Filter/Filter";
import { FilterContext } from "../Context/ContextFilter";
import Card from "./Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import Footer from "../Footer/Footer";
import { ProductContext } from "../Context/ContextProvider";

export default function Products() {
  const { state } = useContext(FilterContext);
  const { state: lng } = useContext(ProductContext);

  const productsList = state.filteredItems.filter((product) => {
    return (
      (lng.lng === "PR"
        ? product.title.includes(state.searchKey)
        : product.title_en.toLowerCase().includes(state.searchKey)) || !state.searchKey
    );
  });

  return (
    <>
      <Filter />
      <div className="search_Container">
        <div className="search_box">
          <SearchBar />
        </div>
      </div>
      <div className="product_container">
        {productsList.length > 0 ? (
          productsList.map((product) => <Card key={product.id} {...product} />)
        ) : (
          <div className="not_products">
            {" "}
            <span className="products_empty_title">
              {lng.lng === "PR"
                ? " با عرض پوزش هیچ محصولی با جستجوی شما مطابقت نداشت!"
                : "Sorry, no products matched your search!"}
            </span>
            <span className="products_empty_guide">
              {lng.lng === "PR"
                ? "  !کلمه کلیدی دیگری را وارد کرده و امتحان کنید"
                : "Enter another keyword and try!"}
            </span>
            <img
              className="products_empty_img"
              src="images/bare-tree.png"
              alt=""
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
