import React, { useContext } from "react";
import { ProductContext } from "../Context/ContextProvider";

export default function LanguageSelect(props) {
  const { state, dispath } = useContext(ProductContext);
  return (
    <select
      value={state.lng}
      onChange={(e) =>
        dispath({ type: "LANG_CHANGE", payload: e.target.value })
      }
    >
      <option value="EN">English</option>
      <option value="PR">Persian</option>
    </select>
  );
}
