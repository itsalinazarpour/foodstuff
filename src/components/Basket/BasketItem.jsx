import React, { useContext } from "react";
import { GrClose } from "react-icons/gr";
import Buttons from "../Buttons/Buttons";
import { ProductContext } from "../Context/ContextProvider";
import { Link } from "react-router-dom";

export default function BasketItem(props) {
  const { state, dispath } = useContext(ProductContext);

  return (
    <div key={props.id} className="basket_item">
      <GrClose
        onClick={() =>
          dispath({ type: "REMOVE_FROM_BASKET", payload: props.id })
        }
        className={state.lng === "PR" ? "basket_remove-l" : "basket_remove-r"}
      />
      <Link className="basket_link" to={`/${props.id}`}>
        <div className="basket_img">
          <img src={props.image} alt="basket_item" />
        </div>
        <div className="basket_content">
          <span className="basket_title">
            {state.lng === "PR" ? props.title : props.title_en}
          </span>
          <span>
            {(props.price * props.count).toLocaleString()}{" "}
            {state.lng === "PR" ? "تومان" : "$"}
          </span>
        </div>
      </Link>
      <div className="basket_counter">
        <Buttons {...props} />
      </div>
    </div>
  );
}
