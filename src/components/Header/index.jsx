import { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import List from '@mui/material/List';
import { callLogout } from '../../services/apiAuth';
import { doLogoutAction, doUpdateInfoAction } from '../../redux/account/accountSlice';
import { toast } from 'react-toastify';
import { Button, InputAdornment, Modal, Popover, Tab, Tabs, TextField } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { callUpdateUserInfo, callUploadAvt, changePassword } from '../../services/apiNormalUser/apiInfo';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(2),
        width: '90%',
    },
    [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(5),
        width: '55%',
    },
    [theme.breakpoints.up('lg')]: {
        marginLeft: theme.spacing(10),
        width: '60%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#fff',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
    },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

const Header = () => {

    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);
    const role = user.role;
    const userName = user.fullName;
    const avt = useSelector(state => state.account.user.avatar);
    const carts = useSelector(state => state.order.carts);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [anchorElOrder, setAnchorElOrder] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isClickPopover, setIsClickPopover] = useState("none");
    const [openModalUpdateInfo, setOpenModalUpdateInfo] = useState(false);
    const [tab, setTab] = useState("info");

    const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const [newpass, setNewpass] = useState("");
    const [oldpass, setOldpass] = useState("");


    const isMenuOpen = Boolean(anchorElMenu);
    const isPopoverOpen = Boolean(anchorElOrder);


    const handleAnchorOpen = (event) => {
        setAnchorElMenu(event.currentTarget);
    };

    const handleAnchorClose = () => {
        setAnchorElMenu(null);
    };

    const handleOrderOpen = (event) => {
        setAnchorElOrder(event.currentTarget);
    };

    const handleOrderClose = () => {
        setAnchorElOrder(null);
    };

    const handleLogout = async () => {
        let res = await callLogout();
        if (res && res.data) {
            dispatch(doLogoutAction());
            setAnchorElMenu(null);
            navigate("/");
            toast.success("Đăng xuất thành công")
        }
    }

    const formatPrice = (price) => {
        return `${price}₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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

    const handleRedirectBook = (cart) => {
        const slug = convertSlug(cart.detail.mainText);
        navigate(`/book/${slug}?id=${cart._id}`)
    }

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleOnChangeAvt = async (event) => {
        if (event.target.files && event.target.files[0]) {
            const res = await callUploadAvt(event.target.files[0]);
            console.log(res);
            if (res && res.data) {
                setAvatar(res.data.fileUploaded)
                toast.success("Upload Avatar thành công");
            }
            else {
                toast.error("Có lỗi xảy ra")
            }
        }
    }

    const handleUpdateInfo = async () => {
        const res = await callUpdateUserInfo(user.id, user.phone, user.fullName, avatar);
        if (res && res.data) {
            dispatch(doUpdateInfoAction({ fullName: user.fullName, phone: user.phone, avatar }))
            toast.success("Cập nhật thông tin user thành công!")

            localStorage.removeItem("access_token");
        }
        else {
            toast.error("Có lỗi xảy ra");
        }
    }

    const renderMenu = (
        <>
            {role === "ADMIN" ?
                <Menu
                    sx={{ mt: '45px' }}
                    anchorElMenu={anchorElMenu}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={isMenuOpen}
                    onClose={handleAnchorClose}
                >
                    <MenuItem onClick={() => navigate("/admin")}>Trang quản trị</MenuItem>
                    <MenuItem onClick={() => { setOpenModalUpdateInfo(true); setAnchorElMenu(null) }}>Quản lí tài khoản</MenuItem>
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </Menu>

                :
                <Menu
                    sx={{ mt: '45px' }}
                    anchorElMenu={anchorElMenu}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={isMenuOpen}
                    onClose={handleAnchorClose}
                >
                    <MenuItem onClick={() => { setOpenModalUpdateInfo(true); setAnchorElMenu(null) }}>Quản lí tài khoản</MenuItem>
                    <MenuItem onClick={() => navigate("/history")}>Lịch sử mua hàng</MenuItem>
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </Menu >
            }</>

    );

    const renderPopover = (
        <>
            <Popover
                open={isPopoverOpen}
                anchorEl={anchorElOrder}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={() => { setIsClickPopover("none"); handleOrderClose(); }}
                sx={{ pointerEvents: isClickPopover, }}
                disableRestoreFocus
            >
                {carts.length > 0 ?
                    <>
                        <Box sx={{ width: 400, padding: 1.5, display: "flex", flexDirection: 'column', gap: 2 }}>
                            <Typography variant='body2' color="rgba(0, 0, 0, 0.5)">
                                Sản phẩm mới thêm
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: 'column', overflow: 'hidden' }}>
                                {carts.slice(-4).reverse().map((cart, index) => {
                                    return (
                                        <Box key={`key-${index}`}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                ":hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
                                                p: 1,
                                                cursor: "pointer"
                                            }}
                                            onClick={() => { setAnchorElOrder(null); setIsClickPopover("none"); handleRedirectBook(cart); }}
                                        >
                                            <Box sx={{ display: "flex", width: "70%" }}>
                                                <Box component="img" sx={{ height: 50, width: 50 }} src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${cart.detail.thumbnail}`} />
                                                <Typography variant='body1' sx={{ display: 'inline-block', ml: 1, overflow: "hidden", textOverflow: 'ellipsis', whiteSpace: "nowrap" }} >{cart.detail.mainText}</Typography>
                                            </Box>
                                            <Box >
                                                <Typography color={"#ee4d2d"}>{formatPrice(cart.detail.price)}</Typography>
                                            </Box>
                                        </Box>
                                    )
                                })}
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }} >
                                {carts.length > 4 &&
                                    <Typography variant='body2' color="rgba(0, 0, 0, 0.5)" >{carts.length - 4} Thêm Hàng Vào Giỏ</Typography>
                                }
                                <Button sx={{ ml: "auto", width: "45%" }} variant='contained' onClick={() => { setAnchorElOrder(null); setIsClickPopover("none"); navigate("/order") }}>Xem Giỏ Hàng</Button>
                            </Box>
                        </Box>
                    </>
                    :
                    <>
                        <Box position={'relative'}>
                            <img
                                src="../../src/assets/cart-empty.png"
                                alt="404"
                                style={{ maxWidth: "100%", maxHeight: "200px" }}
                            />
                            <Typography sx={{
                                position: "absolute",
                                top: 150,
                                right: 70,
                            }}
                                variant='body1'

                            >Chưa có sản phẩm</Typography>
                        </Box>
                    </>
                }

            </Popover>
        </>

    );

    const handleOnCLose = () => {
        setOpenModalUpdateInfo(false);
        setShowNewPassword(false);
        setShowPasswordCurrent(false);
    }

    useEffect(() => {
        fetchInfo();
    }, [user]);

    const fetchInfo = () => {
        setAvatar(avt);
        setName(user.fullName);
        setPhone(user.phone);
    }

    const handleNameUpdate = (e) => {
        setName(e.target.value)
    }

    const handlePhoneUpdate = (e) => {
        setPhone(e.target.value)
    }

    const handleOnChangePassNew = (e) => {
        setNewpass(e.target.value);
    }

    const handleOnChangePassOld = (e) => {
        setOldpass(e.target.value);

    }

    const handleUpdatePass = async () => {
        const res = await changePassword(user.email, oldpass, newpass);
        if (res && res.data) {
            setNewpass("");
            setOldpass("");
            toast.success("Thay đổi mật khẩu thành công!");
        }
        else {
            toast.error("Thông tin old/new password sai")
        }
    }

    const renderModalUploadInfo = (
        <>
            <Modal
                open={openModalUpdateInfo}
            >

                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    p: 3,
                    width: "65%",
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3
                }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant='body1' sx={{ fontWeight: 600 }}>Quản lí tài khoản</Typography>
                        <IconButton onClick={() => handleOnCLose()}>
                            <ClearOutlinedIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ width: "100%", borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tab} onChange={handleChange} >
                            <Tab value="info" label="Cập nhật thông tin" />
                            <Tab value="password" label="Đổi mật khẩu" />
                        </Tabs>
                    </Box>
                    {tab === "info" ?
                        <Box sx={{ width: "100%", display: "flex", height: 350 }}>
                            <Box sx={{ width: "50%", display: "flex", flexDirection: "column", gap: 3 }}>
                                <Box component="img" src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${avatar}`} sx={{ width: "50%", height: "auto", borderRadius: 100, boxShadow: 3 }} />
                                <Button
                                    variant="contained"
                                    component="label"
                                    sx={{ width: "50%" }}
                                >
                                    Upload avatar
                                    <input
                                        accept="image/*"
                                        onChange={handleOnChangeAvt}
                                        type="file"
                                        hidden
                                    />
                                </Button>
                            </Box>
                            <Box sx={{ width: "50%" }}>
                                <TextField margin='normal' size='small' label="Email" fullWidth disabled value={user.email} />
                                <TextField margin='normal' size='small' label="Tên hiển thị" required fullWidth value={name} onChange={handleNameUpdate} />
                                <TextField margin='normal' size='small' label="Số điện thoại" required fullWidth value={phone} onChange={handlePhoneUpdate} />
                                <Button variant='contained' sx={{ mt: 5 }} onClick={handleUpdateInfo}> Cập nhật</Button>
                            </Box>
                        </Box>
                        :
                        <Box sx={{ width: "100%", height: 350, display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <TextField sx={{ width: "50%" }} margin='normal' label="Email" disabled value={user.email} />
                            <TextField
                                margin="normal"
                                sx={{ width: "50%" }}
                                required
                                label="Mật khẩu hiện tại"
                                type={showPasswordCurrent ? "text" : "password"}
                                value={oldpass}
                                onChange={handleOnChangePassOld}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton sx={{ color: 'text.secondary' }} onMouseDown={() => setShowPasswordCurrent(!showPasswordCurrent)}>
                                                {showPasswordCurrent ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField
                                margin="normal"
                                sx={{ width: "50%" }}
                                required
                                label="Mật khẩu mới"
                                type={showNewPassword ? "text" : "password"}
                                value={newpass}
                                onChange={handleOnChangePassNew}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton sx={{ color: 'text.secondary' }} onMouseDown={() => setShowNewPassword(!showNewPassword)}>
                                                {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Button variant='contained' sx={{ mt: 5 }} onClick={handleUpdatePass}> Cập nhật</Button>
                        </Box>
                    }
                </Box>
            </Modal>
        </>
    )

    return (
        <>
            {renderModalUploadInfo}
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ display: { xs: 'block', sm: 'block', md: "none" } }}
                        onClick={() => setIsDrawerOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box flexGrow={1}></Box>
                    <Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{ display: { xs: "none", sm: "none", md: 'block' }, cursor: "pointer" }}
                            onClick={() => navigate("/")}
                        >
                            BuyBook
                        </Typography>
                    </Box>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase sx={{ width: "100%" }}
                            placeholder="Bạn đọc gì hôm nay?"
                        />
                    </Search>
                    <Box flexGrow={{ xs: 0, md: 2 }}></Box>
                    <Box sx={{ display: 'flex', mx: 2.5 }}>
                        <IconButton
                            color="inherit"
                            onClick={(e) => { setIsClickPopover("auto"); handleOrderOpen(e); }}
                            onPointerEnter={handleOrderOpen}
                            onPointerLeave={() => { if (isClickPopover === "none") { handleOrderClose() } }}
                            sx={{ p: 0 }}
                        >
                            <Badge badgeContent={carts.length} color="error">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                    {isAuthenticated ?
                        <>
                            <Box onClick={handleAnchorOpen} sx={{ display: { xs: 'none', sm: "none", md: 'flex', alignItems: "center", cursor: "pointer" } }}>
                                <IconButton
                                    size="large"
                                    color="inherit"
                                    sx={{ p: 0, m: 2, }}

                                >
                                    <Avatar sx={{ backgroundColor: "#fff" }} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${avt}`} />

                                </IconButton>
                                <Box>
                                    <Typography>{userName}</Typography>
                                </Box>
                            </Box>
                        </>
                        :
                        <>
                            <Box sx={{ display: { xs: 'none', sm: "none", md: 'flex' } }}>
                                <IconButton
                                    size="small"
                                    edge="end"
                                    onClick={() => navigate("/login")}
                                    color="inherit"
                                >
                                    <Typography>Account</Typography>
                                </IconButton>
                            </Box>
                        </>
                    }
                    <Box flexGrow={{ xs: 0, md: 1 }}></Box>
                </Toolbar>
            </AppBar >
            {renderMenu}
            {renderPopover}
            <Drawer
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                    },
                    display: { xs: 'block', sm: "block", md: 'none' }
                }
                }
                onClose={() => setIsDrawerOpen(false)}
                anchor="left"
                open={isDrawerOpen}
            >
                <DrawerHeader>
                    <IconButton onClick={() => setIsDrawerOpen(false)}>
                        <ChevronLeftIcon />
                    </IconButton>
                    <Typography variant='h6'>Menu</Typography>
                </DrawerHeader>
                <Divider />
                <List>
                    {isAuthenticated ?
                        <>
                            {role === "ADMIN" ?
                                <>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => navigate("/admin")}>
                                            <ListItemText >Trang quản trị</ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton >
                                            <ListItemText >Quản lí tài khoản</ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={handleLogout}>
                                            <ListItemText >Log Out</ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                </>
                                :
                                <>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText >Quản lí tài khoản</ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={handleLogout}>
                                            <ListItemText >Log Out</ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                </>
                            }

                        </>
                        :
                        <>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText onClick={() => navigate("/login")}>Log In</ListItemText>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => navigate("/register")}>
                                    <ListItemText  > Sign Up</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </>
                    }
                </List>
            </Drawer >
        </>
    );
}

export default Header;