import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../Context/ContextProvider";
import { HiArrowRight } from "react-icons/hi";
import "./Details.css";
import Buttons from "../Buttons/Buttons";

export default function Details() {
  const navigate = useNavigate();
  const params = useParams();
  const { state, dispath } = useContext(ProductContext);

  const mainItem = state.allProducts.find(
    (product) => product.id === parseInt(params.id)
  );
  const basketItem = state.basket.find(
    (product) => product.id === parseInt(params.id)
  );
  const checkBasket = state.basket.some(
    (product) => product.id === parseInt(params.id)
  );

  useEffect(() => {
    !mainItem && navigate("/", { replace: true });
  }, [mainItem, navigate]);

  return (
    <div className="details_container">
      {mainItem && (
        <>
          <div className="details_linkBar">
            <span onClick={() => navigate(-1)} className="details_backLink">
              <HiArrowRight />
              {state.lng === "PR" ? "بازگشت" : "Back"}
            </span>
          </div>
          <div className="datails_card">
            <div className="image_box">
              <img
                className="card_image"
                src={mainItem.image}
                alt="card_image"
              />
              <img src="images/kg.png" alt="" className="kg_image" />
            </div>
            <div className="main_content_box">
              <span className="card_category">
                {" "}
                {state.lng === "PR" ? mainItem.category : mainItem.category_en}
              </span>
              <div className="card_content">
                <span className="card_title">
                  {state.lng === "PR" ? mainItem.title : mainItem.title_en}
                </span>
                <span style={{ color: "#0078c7" }}>|</span>
                <span className="card_price">
                  {mainItem.price.toLocaleString()}{" "}
                  {state.lng === "PR" ? "تومان" : "$"}
                </span>
              </div>
              <div className="card_information">
                <ul>
                  <li>
                    {state.lng === "PR" ? "  ارگانیک : بله" : "Organic: Yes"}
                  </li>
                  <li>
                    {state.lng === "PR"
                      ? " وزن بسته بندی : یک کیلوگرم"
                      : "Package weight: one Kg"}
                  </li>
                </ul>
              </div>
              {checkBasket ? (
                <Buttons {...basketItem} />
              ) : (
                <button
                  onClick={() =>
                    dispath({ type: "ADD_TO_BASKET", payload: mainItem.id })
                  }
                  className="card_buy"
                >
                  {state.lng === "PR" ? " افزودن به سبد" : "add to cart"}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
