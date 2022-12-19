import React, { useContext } from "react";
import { sendPrice } from "../../Offer";
import { ProductContext } from "../Context/ContextProvider";

export default function SendProducts() {
  const { state } = useContext(ProductContext);
  
  const handleText = () => {
    if (state.totalPrice - state.offerPrice <= 100_000) {
      return state.lng === "PR"
        ? `${sendPrice.toLocaleString()} تومان`
        : `${sendPrice.toLocaleString()} $`;
    } else {
      return state.lng === "PR" ? "رایگان" : "Free";
    }
  };

  return (
    <div className="send_products">
      <div className="send_info_price">
        <span>{state.lng === "PR" ? " هزینه ارسال" : "shipping cost"}</span>
        <span>{handleText()}</span>
      </div>
      {state.totalPrice - state.offerPrice > 100_000 && (
        <div className="send_free_img">
          <img src="images/free.svg" alt="free" />
        </div>
      )}
    </div>
  );
}
