import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import { Outlet, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import "./LayoutAdmin.scss"
import { useDispatch, useSelector } from 'react-redux';
import { callLogout } from '../../services/apiAuth';
import { doLogoutAction } from '../../redux/account/accountSlice';

const drawerWidth = 240;

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    {...props}
    expandIcon={<ExpandMoreIcon sx={{ fontSize: '1.5rem', }} />}
  />
))(({ theme }) => ({
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
}));



const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const LayoutAdmin = () => {
  const navigate = useNavigate();
  const role = useSelector(state => state.account.user.role);
  const avt = useSelector(state => state.account.user.avatar);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    let res = await callLogout();
    if (res && res.data) {
      dispatch(doLogoutAction());
      setAnchorEl(null);
      navigate("/", { state: "logout" });
    }
  }

  const renderMenu = (
    <Menu
      sx={{ mt: '45px' }}
      anchorEl={anchorEl}
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
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => navigate("/")}>Trang chủ</MenuItem>
      <MenuItem onClick={() => alert("me")}>Quản lí tài khoản</MenuItem>
      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
    </Menu>
  );

  const [expanded, setExpanded] = useState(false);

  return (<>

    {
      role === "USER" ?
        <>
          <Outlet />
        </>
        :
        <>
          <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" open={open}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 5,
                    ...(open && { display: 'none' }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h5" noWrap component="div">
                  BuyBook
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton
                  size="large"
                  edge="end"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar sx={{ backgroundColor: "#fff" }} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${avt}`} />
                </IconButton>
              </Toolbar>
            </AppBar>
            {renderMenu}
            <Drawer variant="permanent" open={open}>
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
                <Typography variant='h5' sx={{ ml: 5 }}>Admin</Typography>
              </DrawerHeader>
              <List>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={() => navigate("/admin")}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <SpaceDashboardOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText sx={{ opacity: open ? 1 : 0 }} > DashBoard</ListItemText>
                  </ListItemButton>
                </ListItem>
                {open ?
                  <ListItem className='manage-users-container' disablePadding sx={{ display: 'block' }}>
                    <Accordion expanded={expanded}>
                      <ListItemButton className='manage-users'
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                        }}
                        onClick={() => { setExpanded(!expanded) }}

                      >
                        <AccordionSummary sx={{ p: 0 }} >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: 3,
                              justifyContent: 'center',
                              alignItems: "center",
                            }}
                          >
                            <PersonOutlineOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText >
                            Manage Users
                          </ListItemText>
                        </AccordionSummary>
                      </ListItemButton>
                      <AccordionDetails>
                        <List>
                          <ListItem disablePadding >
                            <ListItemButton
                              sx={{
                                minHeight: 10,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                              }}
                              onClick={() => navigate("/admin/user")}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: 0,
                                  mr: 3,
                                  ml: 3,
                                  justifyContent: 'start',
                                }}
                              >
                                <PeopleAltOutlinedIcon />
                              </ListItemIcon>
                              <ListItemText>CURD</ListItemText>
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding >
                            <ListItemButton
                              sx={{
                                minHeight: 10,
                                justifyContent: 'initial',
                                px: 2.5,
                              }}
                              onClick={() => navigate("/admin/user")}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: 0,
                                  mr: 3,
                                  ml: 3,

                                  justifyContent: 'start',
                                }}
                              >
                                <PeopleAltOutlinedIcon />
                              </ListItemIcon>
                              <ListItemText>CURD</ListItemText>
                            </ListItemButton>
                          </ListItem>
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  </ListItem>
                  :
                  <>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: 'center',
                          px: 2.5,
                        }}
                        onClick={() => { navigate("/admin/user") }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            justifyContent: 'center',
                          }}
                        >
                          <PersonOutlineOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText sx={{ opacity: open ? 1 : 0 }} > Manage Users</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  </>
                }
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <LibraryBooksOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText sx={{ opacity: open ? 1 : 0 }} > Manage Books</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <PaidOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText sx={{ opacity: open ? 1 : 0 }} > Manage Orders</ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <DrawerHeader />
              <Outlet />
            </Box>
          </Box >
        </>
    }
  </>
  )

}

export default LayoutAdmin;