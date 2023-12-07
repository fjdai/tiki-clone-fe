import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import IconButton from "@mui/material/IconButton";
import { callBookCategory, callListBook } from "../../services/apiAdmin/apiManageBooks";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";
import Slider from '@mui/material/Slider';
import Pagination from '@mui/material/Pagination';
import TextField from "@mui/material/TextField";
import { NumericFormat } from "react-number-format";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { NavLink } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import "./home.scss";

const Home = () => {
    const [rate, setRate] = useState(2.5);
    const [listCategory, setListCategory] = useState([]);
    const [booleanList, setBooleanList] = useState({});
    const [bookCategory, setBookCategory] = useState([]);
    const [price, setPrice] = useState([0, 10000000]);
    const [sort, setSort] = useState(`-sold`);

    const [listBook, setListBook] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState("");
    const [booksPerPage, setBooksPerPage] = useState(5);

    const fetchListBook = async () => {
        const res = await callListBook(currentPage, booksPerPage, sort);
        if (res && res.data) {
            setListBook(res.data.result);
            setTotalPages(res.data.meta.pages);
        }
    }

    const fetchCategory = async () => {
        const res = await callBookCategory();
        if (res && res.data) {
            setBookCategory(res.data);
        }
    }

    useEffect(() => {
        fetchCategory();
    }, [])

    useEffect(() => {
        fetchListBook();
    }, [sort, currentPage,])

    const handleOnChangeCheckBox = (event, value, index) => {
        if (event.target.checked) {
            const temp = [...listCategory, value];
            setListCategory(temp);
            const temp1 = { ...booleanList, [index]: true }
            setBooleanList(temp1)
        }
        if (!event.target.checked) {
            const temp = listCategory.filter(e => e != value);
            setListCategory(temp);
            const temp1 = { ...booleanList, [index]: false }
            setBooleanList(temp1);
        }
    }

    const handleChangePrice = (event) => {
        setPrice(event.target.value);
    }
    const handleChangeMin = (event) => {
        const temp = +event.target.value.replace(/,|đ/g, "");
        if (temp >= 0 && temp < price[1]) {
            setPrice([temp, price[1]]);
        }
    }

    const handleChangeMax = (event) => {
        const temp = +event.target.value.replace(/,|đ/g, "");
        if (temp <= 10000000 && temp > price[0]) {
            setPrice([price[0], temp]);
        }

    }

    const handleOnChangeSort = (event, value) => {
        setSort(value);
    }

    const handleOnCleatFilter = () => {
        setPrice([0, 10000000]);
        setListCategory([]);
        setBooleanList({})
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "auto",
                    p: 5,
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "25px",
                        mb: 2,
                        ml: 1
                    }}>
                    <Breadcrumbs >
                        <HomeOutlinedIcon />
                        <NavLink className="nav-link" >
                            Trang chủ
                        </NavLink>
                    </Breadcrumbs>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                    <Box
                        component={Paper}
                        elevation={24}
                        sx={{
                            height: "auto",
                            width: "20%",
                            boxShadow: 3,
                            p: 3
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <FilterAltOutlinedIcon />
                                <Typography variant="body1">Bộ lọc tìm kiếm</Typography>
                            </Box>
                            <IconButton onClick={handleOnCleatFilter}>
                                <ReplayOutlinedIcon />
                            </IconButton>
                        </Box>
                        <Divider sx={{ my: 3 }} />
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Typography variant="body1">Danh mục sản phẩm</Typography>
                            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                <FormGroup>
                                    {bookCategory?.map((item, index) => {
                                        return (
                                            <FormControlLabel key={`checkbox-${index}`} control={<Checkbox size="small" checked={booleanList[index] ?? false} value={item} onClick={(event) => handleOnChangeCheckBox(event, item, index)} />} label={item} />

                                        )
                                    })}
                                </FormGroup>
                            </Box>
                        </Box>
                        <Divider sx={{ my: 3 }} />
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Typography variant="body1">Khoảng giá</Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }} >
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <NumericFormat
                                            variant="standard"
                                            customInput={TextField}
                                            type="text"
                                            thousandSeparator=","
                                            autoComplete='off'
                                            sx={{ width: "45%" }}
                                            size="small"
                                            suffix={"đ"}
                                            value={price[0]}
                                            onChange={handleChangeMin}
                                        />
                                        <Typography>-</Typography>
                                        <NumericFormat
                                            variant="standard"
                                            suffix={"đ"}
                                            customInput={TextField}
                                            type="text"
                                            thousandSeparator=","
                                            autoComplete='off'
                                            sx={{ width: "45%" }}
                                            size="small"
                                            value={price[1]}
                                            onChange={handleChangeMax}

                                        />
                                    </Box>
                                    <Slider
                                        size="small"
                                        value={price}
                                        min={0}
                                        max={10000000}
                                        onChange={handleChangePrice}

                                    />
                                </Box>
                                <Button fullWidth variant="contained">Áp dụng</Button>
                            </Box>
                        </Box>
                        <Divider sx={{ my: 3 }} />
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Typography variant="body1">Đánh giá</Typography>
                            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                <Rating
                                    precision={0.5}
                                    value={rate}
                                    onChange={(event, newValue) => {
                                        setRate(newValue);
                                    }}
                                />
                                {(rate !== 5) ? <Typography variant="body1">{rate} trở lên</Typography> : <Typography variant="body1" >{rate} sao</Typography>}
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        component={Paper}
                        elevation={24}
                        sx={{
                            height: "auto",
                            width: "78%",
                            boxShadow: 3,
                            display: "flex",
                            flexDirection: "column",
                            p: 3,
                            gap: 3
                        }}

                    >
                        <Box>
                            <Tabs value={sort} onChange={handleOnChangeSort} >
                                <Tab value={`-sold`} label="Phổ Biến" />
                                <Tab value={`-updatedAt`} label="Hàng Mới" />
                                <Tab value={"price"} label="Giá Thấp Đến Cao" />
                                <Tab value={`-price`} label="Giá Cao Đến Thấp" />
                            </Tabs>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: "wrap", gap: 2.5 }} >
                            {
                                listBook.map((book, index) => {
                                    return (
                                        <Box key={`book-${index}`} component={Paper}
                                            sx={{
                                                display: "flex",
                                                cursor: "pointer",
                                                flexWrap: "wrap",
                                                flexDirection: "column",
                                                width: 200,
                                                boxShadow: 1,
                                                "&:hover": { boxShadow: 5 },
                                                backgroundColor: "#fff"
                                            }}>
                                            <Box sx={{
                                                width: "100%",
                                            }} component="img" src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book.thumbnail}`}></Box>
                                            <Typography sx={{ p: 1 }} variant="caption">{book.mainText}</Typography>
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Pagination
                                count={totalPages}
                                page={1}
                                color="primary" shape="rounded"
                            />
                        </Box>

                    </Box>
                </Box>
            </Box >
        </>
    )
}

export default Home;