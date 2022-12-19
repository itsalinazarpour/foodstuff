import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../Context/ContextProvider";

export default function FavoriteCard(props) {
  const {state, dispath } = useContext(ProductContext);

  return (
    <div key={props.id} className="favorite_card">
      <Link to={`/${props.id}`}>
        <img className="favorite_img" src={props.image} alt="favorite_image" />
        <div className="favorite_content">
          <div className="favorite_title">
            <span>
              {" "}
              {state.lng === "PR" ? props.title : props.title_en}
            </span>
          </div>
        </div>
      </Link>
      <button
        onClick={() => dispath({ type: "ADD_FAVORITE", payload: props.id })}
        className="favorite_button"
      >
        {state.lng === "PR" ? " حذف" : "Remove"}
      </button>
    </div>
  );
}
