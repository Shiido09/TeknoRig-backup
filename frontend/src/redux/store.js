import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./reducers/productReducer";
import { 
  orderCreateReducer, 
  orderDetailsReducer, 
  orderListMyReducer,
  adminOrdersReducer,
  orderUpdateStatusReducer
} from "./reducers/orderReducers";
import { statsReducer } from './reducers/statReducer';

const store = configureStore({
  reducer: {
    productState: productReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderListMy: orderListMyReducer,
    adminOrders: adminOrdersReducer, 
    orderUpdateStatus: orderUpdateStatusReducer,
    stats: statsReducer,
  },
});

export default store;