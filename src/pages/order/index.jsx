import Box from "@mui/material/Box";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { NavLink, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useEffect, useState } from "react";
import { Button, Divider, IconButton, TextField, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { doDeleteCartAction, doPlaceOrderAction, doUpdateCartAction } from "../../redux/order/orderSlice";
import { callOrder } from "../../services/apiNormalUser/apiBook";
import { toast } from "react-toastify";




const OrderPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const steps = ['Đơn hàng', 'Đặt hàng', 'Thanh toán'];
    const carts = useSelector(state => state.order.carts);
    const userName = useSelector(state => state.account.user.fullName);
    const userPhone = useSelector(state => state.account.user.phone);

    const [activeStep, setActiveStep] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalCart, setTotalCart] = useState(0);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const sum = () => {
        let temp = 0;
        let temp1 = 0
        setTotalCart(temp);
        setTotalPrice(temp1)
        for (const cart of carts) {
            temp += cart.quantity * cart.detail.price;
            setTotalPrice(temp);
            temp1 += cart.quantity;
            setTotalCart(temp1)
        }
    }

    const getUser = () => {
        if (userName && userPhone) {
            setName(userName);
            setPhone(userPhone);
        }
    }

    const formatPrice = (value) => {
        return `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const select = (e) => {
        e.target.select();
    }

    const handleOnChangeQuantity = (event, cart) => {
        if (event.target && event.target.value && +event.target.value > 0 && +event.target.value <= +cart.detail.quantity) {
            dispatch(doUpdateCartAction({ quantity: +event.target.value, _id: cart._id }))
        }
    }

    const handleDeleteCart = (id) => {
        dispatch(doDeleteCartAction({ _id: id }));
        sum();
    }

    const handleOnOrder = async () => {
        let data = {}
        if (carts.length > 0) {
            data = {
                name,
                phone,
                address,
                totalPrice,
                detail: [
                    ...carts.map(cart => {
                        return ({
                            bookName: cart.detail.mainText,
                            quantity: +cart.quantity,
                            _id: cart._id
                        })
                    })
                ]
            }
        }
        const res = await callOrder(data);
        if (res && res.data) {
            dispatch(doPlaceOrderAction());
            setActiveStep(3);
            setAddress("");
            setName("");
            setPhone("");
            setTotalPrice(0);
            setTotalCart(0)
        }
        else {
            toast.error(res.message)
        }
    }

    useEffect(() => {
        sum();
    }, [carts])

    useEffect(() => {
        getUser();
    }, [userName, userPhone])

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "auto",
                    p: { xs: 0, md: 5 },
                    mt: { xs: 3, md: 0 }
                }}
            >

                <Box
                    sx={{
                        display: { xs: "none", md: "block" },
                        width: "100%",
                        height: "25px",
                        mb: 2,
                        ml: 1
                    }}>
                    <Breadcrumbs >
                        <HomeOutlinedIcon />
                        <NavLink className="nav-link" to="/">
                            Trang chủ
                        </NavLink>
                    </Breadcrumbs>
                </Box>
                <Box sx={{ display: "flex" }}>
                    <Box sx={{ display: { xs: "block", md: "none" } }}>
                        <IconButton>
                            <ArrowBackIosIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ width: '100%', boxShadow: 2, p: 1, borderRadius: 1.5 }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label) => {
                                return (
                                    <Step key={label} >
                                        <StepLabel >{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                    </Box>
                </Box>
                {(activeStep === 1 || activeStep === 2) &&
                    <Box sx={{ display: "flex", mt: 3, justifyContent: "space-between", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
                        <Box sx={{ width: { xs: "100%", md: "65%" }, gap: 3, display: "flex", flexDirection: "column" }}>
                            {carts.length > 0 ? <></> :
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "70%", flexDirection: "column" }}>
                                    <Box component="img" src="../../src/assets/cartempty.png" sx={{ height: "70%", maxWidth: 500 }}></Box>
                                    <Typography>Không có sản phẩm trong giỏ hàng</Typography>
                                </Box>
                            }
                            {carts.map((cart, index) => {
                                return (
                                    <Box key={`detail-order-${index}`} sx={{ width: "100%", borderRadius: 1.5, backgroundColor: "rgb(0,0,0,0.04)", display: "flex", alignItems: "center", py: 2 }}>
                                        <Box sx={{ width: "50%", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                                            <Box sx={{ display: "flex", width: "70%", alignItems: "center" }}>
                                                <Box component="img" sx={{ height: 70, width: 70 }} src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${cart.detail.thumbnail}`} />
                                                <Typography noWrap variant='body2' sx={{ ml: 2 }}>{cart.detail.mainText}</Typography>
                                            </Box>
                                            <Typography variant='body1'>{formatPrice(cart.detail.price)}</Typography>
                                        </Box>
                                        <Box sx={{ width: "50%", display: "flex", justifyContent: "space-between", px: 2, alignItems: "center" }}>
                                            <TextField value={cart.quantity} variant="outlined" onClick={select} sx={{ width: 80 }} onChange={(e) => handleOnChangeQuantity(e, cart)} size="small"></TextField>
                                            <Typography variant='body2'>{`Tổng: ${formatPrice(cart.detail.price * cart.quantity)}`}</Typography>
                                            <IconButton onClick={() => handleDeleteCart(cart._id)}>
                                                <DeleteOutlinedIcon color="error" />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                )
                            })}
                        </Box>
                        {activeStep === 1 &&
                            <Box sx={{ boxShadow: 3, borderRadius: 1.5, width: { xs: "100%", md: "30%" }, height: "100%", p: 3, display: "flex", flexDirection: "column", gap: 5 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body2">Tạm tính</Typography>
                                    <Typography variant="body2">{formatPrice(totalPrice)}</Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body1" >Tổng tiền</Typography>
                                    <Typography variant="h5" sx={{ color: "#fe3834" }}>{formatPrice(totalPrice)}</Typography>
                                </Box>
                                <Divider />
                                <Button variant="contained" size="large" sx={{ backgroundColor: "#ee4d2d" }} onClick={() => setActiveStep(2)}>{`Mua Hàng (${totalCart})`}</Button>
                            </Box>
                        }
                        {activeStep === 2 && name && phone &&
                            <Box sx={{ boxShadow: 3, borderRadius: 1.5, width: { xs: "100%", md: "30%" }, height: "100%", p: 3, display: "flex", flexDirection: "column", gap: 5 }}>
                                <Box component="form">
                                    <TextField required margin="normal" label="Tên người nhận" fullWidth value={name} name="name" onChange={(e) => setName(e.target.value)} />
                                    <TextField required margin="normal" label="Số điện thoại" fullWidth value={phone} name="phone" onChange={(e) => setPhone(e.target.value)} />
                                    <TextField required multiline rows={4} margin="normal" label="Địa chỉ" fullWidth name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                </Box>
                                <Divider />
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="body1" >Tổng tiền</Typography>
                                    <Typography variant="h5" sx={{ color: "#fe3834" }}>{formatPrice(totalPrice)}</Typography>
                                </Box>
                                <Divider />
                                <Button variant="contained" size="large" sx={{ backgroundColor: "#ee4d2d" }} onClick={() => { handleOnOrder(); }}>{`Đặt Hàng (${totalCart})`}</Button>
                            </Box>
                        }
                    </Box>
                }
                {activeStep === 3 &&
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 9, gap: 2 }}>
                        <Box component="img" src="../../src/assets/orderSucceed.png" sx={{ width: "20%", ml: { xs: 3, md: 8.5 } }}></Box>
                        <Typography variant="h6">Đơn hàng đã được đặt thành công!</Typography>
                        <Button variant="contained" onClick={() => { setActiveStep(1); navigate("/history") }}>Xem lịch sử</Button>
                    </Box>
                }
            </Box >
        </>
    )
}

export default OrderPage;