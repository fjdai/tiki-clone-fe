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
import { NavLink, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Drawer } from "@mui/material";
import { Clear } from "@mui/icons-material";
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
    const [booksPerPage, setBooksPerPage] = useState(10);

    const [openFilter, setOpenFilter] = useState(false);
    const [submitFilter, setSubmitFilter] = useState("")

    const navigate = useNavigate();

    const fetchListBook = async () => {
        let temp = "";
        for (const category of listCategory) {
            temp += `${category}|`;
        }
        const res = await callListBook(currentPage, booksPerPage, sort, "", "", temp.replace(/\|$/i, ""), submitFilter);
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
    }, [sort, currentPage, listCategory, submitFilter])

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
        setCurrentPage(1)
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
        setBooleanList({});
        setCurrentPage(1)
        setSubmitFilter("")
    }

    const handleChangeCurrentPage = (event, value) => {
        setCurrentPage(value)
    }

    const formatPrice = (value) => {
        return `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const handleOnSubmit = () => {
        const temp = `&price>=${price[0]}&price<=${price[1]}`;
        setSubmitFilter(temp);
    }

    const nonAccentVietnamese = (str) => {
        str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/g, "E");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str;
    }

    const convertSlug = (str) => {
        str = nonAccentVietnamese(str);
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        const from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
        const to = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
        for (let i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    }

    const handleRedirectBook = (book) => {
        const slug = convertSlug(book.mainText);
        navigate(`/book/${slug}?id=${book._id}`)
    }

    return (
        <>
            <Drawer
                sx={{
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 300,

                    },
                    display: { xs: "block", md: "none" }
                }}
                anchor={'right'}
                open={openFilter}
            >
                <Box sx={{ m: 3 }}>
                    <Box sx={{ marginBottom: { xs: 3, md: 14 } }}>
                        <IconButton onClick={() => { setOpenFilter(false) }} >
                            <Clear />
                        </IconButton>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <FilterAltOutlinedIcon />
                            <Typography variant="body1">Bộ lọc tìm kiếm</Typography>
                        </Box>
                        <IconButton onClick={handleOnCleatFilter}>
                            <ReplayOutlinedIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: "flex", sm: "none" }, flexDirection: "column" }}  >
                        <Divider sx={{ my: 3 }} />
                        <Typography variant="body1" marginBottom={3}>Sắp xếp theo</Typography>
                        <Box sx={{ mx: "auto" }}>
                            <Tabs sx={{ width: 200 }} orientation="vertical" value={sort} onChange={handleOnChangeSort} >
                                <Tab value={`-sold`} label="Phổ Biến" />
                                <Tab value={`-updatedAt`} label="Hàng Mới" />
                                <Tab value={"price"} label="Giá Thấp Đến Cao" />
                                <Tab value={`-price`} label="Giá Cao Đến Thấp" />
                            </Tabs>
                        </Box>
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
                            <Button fullWidth onClick={handleOnSubmit} variant="contained">Áp dụng</Button>
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
                            {(rate !== 5) ? <Typography variant="body2">{rate} trở lên</Typography> : <Typography variant="body2" >{rate} sao</Typography>}
                        </Box>
                    </Box>
                </Box>
            </Drawer >
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
                            minWidth: "230px",
                            boxShadow: 3,
                            p: 3,
                            display: { xs: "none", sm: "none", md: "block" }
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
                                <Button fullWidth onClick={handleOnSubmit} variant="contained">Áp dụng</Button>
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
                                {(rate !== 5) ? <Typography variant="body2">{rate} trở lên</Typography> : <Typography variant="body2" >{rate} sao</Typography>}
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            height: "auto",
                            width: { xs: "100%", md: "69%", lg: "76%" },
                            boxShadow: { xs: "0", md: "3" },
                            backgroundColor: { xs: "background.default", md: "background.paper" },
                            display: "flex",
                            flexDirection: "column",
                            p: { xs: 0, sm: 2, md: 3 },
                            justifyContent: { xs: "space-around", md: "normal" }
                        }}

                    >
                        <Box sx={{ display: { xs: "none", sm: "block" } }}>
                            <Tabs value={sort} onChange={handleOnChangeSort} >
                                <Tab value={`-sold`} label="Phổ Biến" />
                                <Tab value={`-updatedAt`} label="Hàng Mới" />
                                <Tab value={"price"} label="Giá Thấp Đến Cao" />
                                <Tab value={`-price`} label="Giá Cao Đến Thấp" />
                            </Tabs>
                        </Box>
                        <Box sx={{ m: 0, display: { xs: "flex", md: "none" }, alignItems: "center" }}>
                            <IconButton onClick={() => { setOpenFilter(true) }}>
                                <FilterAltOutlinedIcon />
                            </IconButton>
                            <Typography variant="body1">Lọc</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: "wrap", gap: 1 }} >
                            {
                                listBook?.map((book, index) => {
                                    return (
                                        <Box key={`book-${index}`}
                                            onClick={() => handleRedirectBook(book)}
                                            sx={{
                                                display: "flex",
                                                cursor: "pointer",
                                                flexWrap: "wrap",
                                                flexDirection: "column",
                                                width: { xs: 175, sm: 180, md: 200 },
                                                minHeight: 350,

                                                boxShadow: 1,
                                                "&:hover": { boxShadow: { xs: 1, md: 5 } },
                                                backgroundColor: "#fff",
                                                justifyContent: "space-between"
                                            }}>
                                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                <Box sx={{
                                                    width: "100%",
                                                    minHeight: 210,
                                                }} component="img" src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book.thumbnail}`}></Box>
                                                <Typography sx={{
                                                    m: 1,
                                                    display: '-webkit-box',
                                                    overflow: 'hidden',
                                                    WebkitBoxOrient: 'vertical',
                                                    WebkitLineClamp: 3,
                                                }} variant="body2">{book.mainText}</Typography>
                                            </Box>
                                            <Box sx={{ m: 1, display: "flex", flexDirection: { xs: "row", md: "column" }, gap: 1 }}>
                                                <Typography variant="body2">
                                                    {formatPrice(book.price)}
                                                </Typography>
                                                <Box sx={{ display: "flex", gap: 1, }}>
                                                    <Rating
                                                        value={5}
                                                        size="small"
                                                        sx={{
                                                            display: { xs: "none", md: "flex" }
                                                        }}
                                                    />
                                                    <Typography variant="body2">{`Đã bán ${book.sold}`}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={(e, value) => handleChangeCurrentPage(e, value)}
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