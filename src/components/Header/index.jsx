import { useEffect, useState } from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
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
import { useLocation, useNavigate } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import List from '@mui/material/List';
import { callLogout } from '../../services/apiAuth';
import { doLogoutAction } from '../../redux/account/accountSlice';
import { toast } from 'react-toastify';
import { Popover } from '@mui/material';


const drawerWidth = 240;

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
        width: '100%',
    },
    [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(5),
        width: '63%',
    },
    [theme.breakpoints.up('xl')]: {
        marginLeft: theme.spacing(10),
        width: 'auto',
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
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '40ch',
        },
        [theme.breakpoints.up('md')]: {
            width: '50ch',
        },
        [theme.breakpoints.up('lg')]: {
            width: '81ch',
        },
        [theme.breakpoints.up('xl')]: {
            width: '115ch',
        },
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
    window.history.replaceState({}, document.title)

    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);
    const role = user.role;
    const avt = useSelector(state => state.account.user?.avatar);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const [anchorElOrder, setAnchorElOrder] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isClickPopover, setIsClickPopover] = useState("none")

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
                    <MenuItem onClick={() => alert("me")}>Quản lí tài khoản</MenuItem>
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
                    <MenuItem onClick={() => alert("me")}>Quản lí tài khoản</MenuItem>
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
                <Box sx={{ height: 400, width: 400 }}>

                </Box>
            </Popover>
        </>

    );

    useEffect(() => {
        if (location.state !== null) {
            setMessage(location.state);
            setToast(true);
        }
    }, [])

    return (
        <>
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
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ display: { xs: "none", sm: "none", md: 'block' }, ml: { md: 3, lg: 4, xl: 6 }, cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        BuyBook
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Bạn đọc gì hôm nay?"
                        />
                    </Search>
                    <Box sx={{ display: 'flex', mx: 2.5 }}>
                        <IconButton
                            color="inherit"
                            onClick={(e) => { setIsClickPopover("auto"); handleOrderOpen(e); }}
                            onPointerEnter={handleOrderOpen}
                            onPointerLeave={() => { if (isClickPopover === "none") { handleOrderClose() } }}
                            sx={{ p: 0 }}
                        >
                            <Badge badgeContent={5} color="error">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                    {isAuthenticated ?
                        <>
                            <Box sx={{ display: { xs: 'none', sm: "none", md: 'flex' } }}>
                                <IconButton
                                    size="large"
                                    onClick={handleAnchorOpen}
                                    color="inherit"
                                    sx={{ p: 0, m: 2, }}

                                >
                                    <Avatar sx={{ backgroundColor: "#fff" }} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${avt}`} />

                                </IconButton>
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
                </Toolbar>
            </AppBar >
            {renderMenu}
            {renderPopover}
            <Drawer Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }
                }
                variant="persistent"
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