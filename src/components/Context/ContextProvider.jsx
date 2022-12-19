import React, { createContext, useReducer } from "react";
import allProducts from "../../Data";
import offerCode from "../../Offer";
import { sendPrice } from "../../Offer";

const initialState = {
  allProducts,
  favorites: JSON.parse(localStorage.getItem("favorite")) || [],
  basket: JSON.parse(localStorage.getItem("basket")) || [],
  totalPrice: 0,
  totalPriceAfterOffer: 0,
  offerPrice: 0,
  totalPriceFainal: 0,
  isEnterOfferCode: false,
  offerMessage: "",
  lng: JSON.parse(localStorage.getItem("language")) || "EN"
};

const sumPrice = (items, isOffer) => {
  const totalPrice = items.reduce((totalPrice, product) => {
    return totalPrice + product.price * product.count;
  }, 0);

  if (isOffer) {
    const offerPrice = (totalPrice * offerCode.disCount) / 100;
    const totalPriceAfterOffer = totalPrice - offerPrice;

    return {
      totalPrice,
      offerPrice,
      totalPriceAfterOffer,
      ...sumPriceWithSend(totalPrice, offerPrice)
    };
  } else {
    return { totalPrice, ...sumPriceWithSend(totalPrice) };
  }
};

// calc Price With shopping cost
const sumPriceWithSend = (totalPrice, offerPrice = 0) => {
  let totalPriceFainal = null;

  if (totalPrice - offerPrice <= 100_000) {
    totalPriceFainal = totalPrice + sendPrice - offerPrice;
  } else {
    totalPriceFainal = totalPrice - offerPrice;
  }

  return { totalPriceFainal };
};

const reduce = (state, action) => {
  switch (action.type) {
    case "PRICE_LOAD":
      return {
        ...state,
        ...sumPrice(state.basket, state.isEnterOfferCode)
      };
    case "ADD_FAVORITE":
      const hasFavorite = state.favorites.some(
        (product) => product.id === action.payload
      );
      const mainItem = state.allProducts.find(
        (product) => product.id === action.payload
      );
      if (hasFavorite) {
        // Remove Item
        state.favorites = state.favorites.filter(
          (product) => product.id !== action.payload
        );
      } else {
        // Add Item
        state.favorites.push(mainItem);
      }
      localStorage.setItem("favorite", JSON.stringify(state.favorites));
      return {
        ...state
      };

    case "REMOVE_ALL_FAVORITE":
      state.favorites = [];
      localStorage.setItem("favorite", JSON.stringify(state.favorites));

      return {
        ...state
      };

    case "ADD_TO_BASKET":
      const hasProduct = state.basket.some(
        (product) => product.id === action.payload
      );
      if (!hasProduct) {
        const mainItem = state.allProducts.find(
          (product) => product.id === action.payload
        );
        state.basket.push({ ...mainItem, count: 1 });
        localStorage.setItem("basket", JSON.stringify(state.basket));
      }

      return {
        ...state,
        ...sumPrice(state.basket, state.isEnterOfferCode)
      };

    case "REMOVE_FROM_BASKET":
      const indexDelete = state.basket.findIndex(
        (product) => product.id === action.payload
      );
      state.basket[indexDelete].count = 1;
      state.basket = state.basket.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem("basket", JSON.stringify(state.basket));
      return {
        ...state,
        ...sumPrice(state.basket, state.isEnterOfferCode)
      };

    case "INCREASE":
      const indexPlus = state.basket.findIndex(
        (product) => product.id === action.payload
      );
      state.basket[indexPlus].count++;
      localStorage.setItem("basket", JSON.stringify(state.basket));

      return {
        ...state,
        ...sumPrice(state.basket, state.isEnterOfferCode)
      };

    case "DECREASE":
      const indexMinus = state.basket.findIndex(
        (product) => product.id === action.payload
      );
      if (state.basket[indexMinus].count > 1) {
        state.basket[indexMinus].count--;
      } else {
        state.basket = state.basket.filter(
          (product) => product.id !== action.payload
        );
      }
      localStorage.setItem("basket", JSON.stringify(state.basket));

      return {
        ...state,
        ...sumPrice(state.basket, state.isEnterOfferCode)
      };

    case "EMPTY_BASKET":
      state.basket = state.basket.forEach((product) => (product.count = 1));
      state.basket = [];
      localStorage.setItem("basket", JSON.stringify(state.basket));

      return {
        ...state,
        ...sumPrice(state.basket, state.isEnterOfferCode)
      };

    case "OFFER_CODE":
      if (offerCode.code === action.payload) {
        state.isEnterOfferCode = true;
        state.offerMessage =
          state.lng === "PR" ? "تخفیف اعمال شد" : "Discount applied";
      } else {
        state.offerMessage =
          state.lng === "PR"
            ? "کد وارد شده صحیح نیست"
            : "The entered code is not correct";
       
      }
      return {
        ...state,
        ...sumPrice(state.basket, state.isEnterOfferCode)
      };

    case "LANG_CHANGE":
      state.lng = action.payload;
      localStorage.setItem("language", JSON.stringify(state.lng));

      return { ...state };
    default:
      return state;
  }
};

export const ProductContext = createContext();

export default function ContextProvider({ children }) {
  const [state, dispath] = useReducer(reduce, initialState);
  return (
    <ProductContext.Provider value={{ state, dispath }}>
      {children}
    </ProductContext.Provider>
  );
}
