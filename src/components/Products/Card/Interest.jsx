import React, { useContext } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { ProductContext } from "../../Context/ContextProvider";

export default function Interest(props) {
  const { state, dispath } = useContext(ProductContext);
  const isAddFavorite = state.favorites.find(
    (product) => product.id === props.id
  );

  return (
    <div
      onClick={() => dispath({ type: "ADD_FAVORITE", payload: props.id })}
      className="Interest"
    >
      {isAddFavorite ? (
        <AiFillHeart style={{ fontSize: "24px" }} className="heart_Fill" />
      ) : (
        <AiOutlineHeart style={{ fontSize: "24px" }} className="heart" />
      )}
    </div>
  );
}
