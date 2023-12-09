import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from "react-image-gallery";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import "./detailBook.scss";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Rating from '@mui/material/Rating';
import Divider from "@mui/material/Divider";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';


const formatPrice = (price) => {
    return `${price}₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


const DetailBook = (props) => {
    const { book, images } = props;

    return (
        <>
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
                <Box className="left-content" sx={{ width: { xs: "100%", md: "40%" }, display: "flex", justifyContent: "center" }}>
                    <ImageGallery
                        items={images}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        showNav={false}
                        originalHeight={"50px"}
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
                            <button className="button">
                                <RemoveOutlinedIcon fontSize="50" />
                            </button>
                            <input className="quantity-input" />
                            <button className="button">
                                <AddOutlinedIcon fontSize="50" />
                            </button>
                        </div>
                    </div>
                    <div className="order-container">
                        <button className="add-order-btn">
                            <div style={{ marginRight: "10px" }}>
                                <AddShoppingCartOutlinedIcon fontSize="small" />
                            </div>
                            <div>Thêm vào giỏ hàng</div>
                        </button>
                        <button className="buy-btn">Mua ngay</button>
                    </div>
                </Box >
            </Box >
        </>
    )
}

export default DetailBook;