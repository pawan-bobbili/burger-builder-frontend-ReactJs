import * as actionTypes from "../actions/actionTypes";
import _ from "lodash";

const INGREDIENTS_PRICE = {};

const initialState = {
  ingredients: null,
  totalprice: 0,
};

const burgerBuilderReducer = (state = initialState, action) => {
  const burgerIngredients = _.cloneDeep(state.ingredients);
  let price = state.totalprice;
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      if (burgerIngredients[action.payload] < 4) {
        burgerIngredients[action.payload]++;
        price += INGREDIENTS_PRICE[action.payload];
        return { ingredients: burgerIngredients, totalprice: price };
      }
      return state;

    case actionTypes.REMOVE_INGREDIENT:
      if (burgerIngredients[action.payload] > 0) {
        burgerIngredients[action.payload]--;
        price -= INGREDIENTS_PRICE[action.payload];
        return {
          ingredients: burgerIngredients,
          totalprice: price,
        };
      }
      return state;

    case actionTypes.SET_INGREDIENTS_SUCCESS:
      let ingredients = {};
      for (let ing in action.payload) {
        INGREDIENTS_PRICE[ing] = action.payload[ing].price;
        ingredients[ing] = action.payload[ing].qty;
      }
      return {
        ...state,
        ingredients: ingredients,
        totalprice: 0,
      };

    case actionTypes.SET_INGREDIENTS_FAILED:
      return { ...state, ingredients: null, totalprice: 0 };

    default:
      return state;
  }
};

export default burgerBuilderReducer;
