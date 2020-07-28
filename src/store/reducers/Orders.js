import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: true,
  order_status: false,
  orders: null,
  ordersPage: 0,
  totalOrders: 0,
  perPage: 1,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_CHECKOUT:
      return { ...state, order_status: false, loading: true };

    case actionTypes.INIT_CONTACT_DATA:
      return { ...state, loading: false };

    case actionTypes.ORDER_CLICKED:
      return { ...state, loading: true, order_status: false };

    case actionTypes.ORDER_HANDLED_SUCCESS:
      alert("Ordered Successfully");
      return {
        ...state,
        loading: false,
        order_status: true,
      };

    case actionTypes.ORDER_HANDLED_FAILED:
      return { orders: state.orders, loading: false, order_status: false };

    case actionTypes.FETCH_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
        perPage: action.payload.perPage,
        totalOrders: action.payload.totalOrders,
      };

    case actionTypes.FETCH_ORDERS_FAILED:
      return { ...state };

    case actionTypes.SET_PAGE:
      return {
        ...state,
        orders: null,
        ordersPage: action.payload,
      };

    default:
      return state;
  }
};

export default ordersReducer;
