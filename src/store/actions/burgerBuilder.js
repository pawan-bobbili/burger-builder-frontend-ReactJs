import * as actionTypes from "./actionTypes";
import axios from "axios";

const setIngredients = (ingredients) => {
  return { type: actionTypes.SET_INGREDIENTS_SUCCESS, payload: ingredients };
};

const setIngredientsFailed = () => {
  return { type: actionTypes.SET_INGREDIENTS_FAILED };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:8080/shop/ingredients")
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          dispatch(setIngredientsFailed());
        } else {
          dispatch(setIngredients(response.data));
        }
      })
      .catch((err) => {
        dispatch(setIngredientsFailed());
      });
  };
};

export const addIngredient = (ingredient) => {
  return { type: actionTypes.ADD_INGREDIENT, payload: ingredient };
};

export const removeIngredient = (ingredient) => {
  return { type: actionTypes.REMOVE_INGREDIENT, payload: ingredient };
};
