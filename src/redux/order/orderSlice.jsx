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
        }
    },
})

export const { doAddBookAction } = orderSlice.actions;
export default orderSlice.reducer;
