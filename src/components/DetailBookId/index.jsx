import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from "react-image-gallery";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { NavLink, useNavigate } from "react-router-dom";
import "./detailBook.scss";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Rating from '@mui/material/Rating';
import Divider from "@mui/material/Divider";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { doAddBookAction } from "../../redux/order/orderSlice";
import Modal from '@mui/material/Modal';
import { IconButton } from "@mui/material";
import Clear from "@mui/icons-material/Clear";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



const formatPrice = (price) => {
    return `${price}₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


const DetailBook = (props) => {
    const { book, images } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [order, setOrder] = useState(1);
    const [modalGallery, setModalGallery] = useState(false);

    const handleOnChangeQuantity = (event, type) => {
        if (type === "input" && event.target && event.target.value && +event.target.value > 0 && +event.target.value <= +book.quantity) {
            setOrder(+event.target.value);
        }
        if (type === "add" && +order < +book.quantity) {
            setOrder(+order + 1);
        }
        if (type === "subtract" && +order > 1) {
            setOrder(+order - 1);
        }
    }

    const select = (e) => {
        e.target.select();
    }

    const handleOrderBook = () => {
        dispatch(doAddBookAction({ quantity: order, _id: book._id, detail: { ...book } }))
    }

    const handleOnCloseModal = () => {
        setModalGallery(false)
    }

    return (
        <>
            <Modal sx={{ display: { xs: "none", md: "flex" } }} open={modalGallery} >
                <Box className={"modal-gallery"} sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Box marginBottom="15px" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography >{book.mainText}</Typography>
                        <IconButton onClick={handleOnCloseModal}>
                            <Clear />
                        </IconButton>
                    </Box>
                    <ImageGallery
                        items={images}
                        onClick={() => setModalGallery(true)}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        originalHeight={"50px"}
                        showThumbnails={true}
                        infinite={true}
                    />
                </Box>
            </Modal >

            <Box
                sx={{
                    display: { xs: "none", md: "block" },
                    width: "100%",
                    height: "25px",
                    mt: 5,
                    ml: 6
                }}>
                <Breadcrumbs >
                    <HomeOutlinedIcon />
                    <NavLink className="nav-link" to="/">
                        Trang chủ
                    </NavLink>
                </Breadcrumbs>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    mx: { xs: 0, md: 5 },
                    mt: 2,
                    mb: 5,
                    p: 5,
                    height: "auto",
                    flexDirection: { xs: "column", md: "row" }
                }} elevation={5} component={Paper}>
                <Box sx={{ display: { xs: "block", md: "none" }, position: "absolute", left: 15, top: 100 }}>
                    <IconButton onClick={() => navigate("/")}>
                        <ArrowBackIosIcon />
                    </IconButton>
                </Box>
                <Box className="left-content" sx={{ width: "40%", display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
                    <ImageGallery
                        items={images}
                        onClick={() => setModalGallery(true)}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        showNav={false}
                        originalHeight={"50px"}
                        showThumbnails={true}
                        infinite={true}
                    />
                </Box>
                <Box className="left-content" sx={{ width: "100%", display: { xs: "flex", md: "none" }, justifyContent: "center" }}>
                    <ImageGallery
                        items={images}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        showNav={false}
                        originalHeight={"50px"}
                        showThumbnails={false}
                        infinite={true}
                        showIndex={true}
                    />
                </Box>
                <Box className="right-content" sx={{ width: { xs: "100%", md: "60%" }, p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography variant="body1">Tác giả: <NavLink style={{ color: "#0047ab", textDecoration: "none" }}>{`${book.author}`}</NavLink></Typography>
                    <Typography variant="h4">{`${book.mainText}`}</Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Rating
                            value={5}
                            readOnly
                            size="small"
                        />
                        <Divider orientation="vertical" />
                        <Typography variant="body2">{`Đã bán ${book.sold}`}</Typography>
                    </Box>
                    <div className="price-container">
                        <div className="book-price">{formatPrice(book.price)}</div>
                    </div>
                    <div className="transport-container">
                        <div className="transport-title">Vận chuyển</div>
                        <div className="transport-content">Miễn phí vận chuyển</div>
                    </div>
                    <div className="quantity-container">
                        <div className="quantity-title">Số lượng</div>
                        <div className="quantity-content">
                            <button className="button" onClick={(e) => handleOnChangeQuantity(e, "subtract")}>
                                <RemoveOutlinedIcon fontSize="50" />
                            </button>
                            <input className="quantity-input" value={order} onClick={select} onChange={(e) => handleOnChangeQuantity(e, "input")} />
                            <button className="button" onClick={(e) => { handleOnChangeQuantity(e, "add") }}>
                                <AddOutlinedIcon fontSize="50" />
                            </button>
                        </div>
                        <div className="quantity-subtitle">{`${book.quantity} sản phẩm sẵn có`}</div>
                    </div>
                    <div className="order-container">
                        <button onClick={handleOrderBook} className="add-order-btn">
                            <div style={{ marginRight: "10px" }}>
                                <AddShoppingCartOutlinedIcon fontSize="small" />
                            </div>
                            <div>Thêm vào giỏ hàng</div>
                        </button>
                        <button className="buy-btn" onClick={(event) => { handleOrderBook(event); navigate("/order") }}>Mua ngay</button>
                    </div>
                </Box >
            </Box >
        </>
    )
}

export default DetailBook;