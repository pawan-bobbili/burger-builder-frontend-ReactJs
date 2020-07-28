import * as actionTypes from "./actionTypes";
import axios from "axios";

const fetchOrdersSuccess = (orders, perPage, totalOrders) => {
  return {
    type: actionTypes.FETCH_ORDERS,
    payload: { orders, perPage, totalOrders },
  };
};

const fetchOrdersFailed = () => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
  };
};

export const fetchOrders = (token, userId, page) => {
  return (dispatch) => {
    axios
      .get("http://localhost:8080/shop/orders/?page=" + page, {
        headers: {
          token: "Bearer " + token,
          userId: userId,
        },
      })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("Fetching Orders Failed");
        }
        const orders = [];
        for (let order in response.data.orders) {
          orders.push({
            ingredients: response.data.orders[order].ingredients,
            price: response.data.orders[order].price,
            customerInfo: response.data.orders[order].customerInfo,
            key: order,
          });
        }
        dispatch(
          fetchOrdersSuccess(
            orders,
            response.data.perPage,
            response.data.totalOrders
          )
        );
      })
      .catch((err) => dispatch(fetchOrdersFailed()));
  };
};

export const initCheckout = () => {
  return {
    type: actionTypes.INIT_CHECKOUT,
  };
};

export const initContactData = () => {
  return {
    type: actionTypes.INIT_CONTACT_DATA,
  };
};

const orderClicked = () => {
  return {
    type: actionTypes.ORDER_CLICKED,
  };
};

const orderSuccess = () => {
  return {
    type: actionTypes.ORDER_HANDLED_SUCCESS,
  };
};

const orderFailed = () => {
  return {
    type: actionTypes.ORDER_HANDLED_FAILED,
  };
};

export const orderPlaced = (
  ingredients,
  info,
  token,
  userId,
  type,
  addressId
) => {
  return (dispatch) => {
    dispatch(orderClicked());
    axios
      .post(
        "http://localhost:8080/shop/order",
        JSON.stringify({
          ingredients: ingredients,
          customerInfo: info,
          type,
          addressId,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            token: "Bearer " + token,
            userId,
          },
        }
      )
      .then((response) => {
        // This Order of dispatching is Important
        dispatch({ type: actionTypes.SET_INGREDIENTS_FAILED });
        dispatch(orderSuccess());
      })
      .catch((err) => {
        dispatch(orderFailed());
      });
  };
};

export const setPage = (page) => {
  return {
    type: actionTypes.SET_PAGE,
    payload: page,
  };
};
