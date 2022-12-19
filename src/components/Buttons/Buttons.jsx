import React, { useContext } from "react";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import { ProductContext } from "../Context/ContextProvider";
import "./Buttons.css";

export default function Buttons(props) {
  const { dispath } = useContext(ProductContext);
  return (
    <div className="basket_buttons">
      <span
        onClick={() => dispath({ type: "INCREASE", payload: props.id })}
        className="basket_plus"
      >
        <AiOutlinePlus />
      </span>
      <span className="counter_number">{props.count}</span>
      <span
        onClick={() => dispath({ type: "DECREASE", payload: props.id })}
        className="basket_minus"
      >
        {props.count === 1 ? <AiOutlineDelete /> : <AiOutlineMinus />}
      </span>
    </div>
  );
}
