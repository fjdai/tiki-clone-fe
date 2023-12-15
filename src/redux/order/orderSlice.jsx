import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    carts: []
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        doAddBookAction: (state, action) => {
            let carts = state.carts;
            const item = action.payload;

            let isExistIndex = carts.findIndex(e => e._id === item._id);
            if (isExistIndex > -1) {
                carts[isExistIndex].quantity = +carts[isExistIndex].quantity + item.quantity;
                if (+carts[isExistIndex].quantity > +item.quantity) {
                    carts[isExistIndex].quantity = item.quantity;
                }
            }
            else {
                carts.push({ quantity: item.quantity, _id: item._id, detail: item.detail })
            }
            state.carts = carts;
            toast.success("Sản phẩm đã được thêm vào Giỏ hàng");
        },
        doUpdateCartAction: (state, action) => {
            let carts = state.carts;
            const item = action.payload;
            let index = carts.findIndex(e => e._id === item._id);
            carts[index].quantity = item.quantity;
            state.carts = carts;
        },
        doDeleteCartAction: (state, action) => {
            let carts = state.carts.filter(e => e._id != action.payload._id)
            state.carts = carts;
        },
        doPlaceOrderAction: (state) => {
            state.carts = [];
        }
    },
})

export const { doAddBookAction, doUpdateCartAction, doDeleteCartAction, doPlaceOrderAction } = orderSlice.actions;
export default orderSlice.reducer;
