import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { postLogin } from '../../services/apiAuth';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';
import { doLoginAction } from '../../redux/account/accountSlice';


export default function LoginPage() {
    window.history.replaceState({}, document.title)
    const [user, setUser] = useState({
        username: "",
        password: "",
    })
    const [toast, setToast] = useState({
        open: false,
        type: "success"
    });

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const res = await postLogin(user.username, user.password);
        setIsLoading(false);
        if (res?.data) {
            localStorage.setItem("access_token", res.data.access_token);
            dispatch(doLoginAction(res.data.user))
            navigate("/")
        } else {
            setToast({ ...toast, open: true, type: "error", message: [res.message] });
        };
    };

    const handleOnChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }



    useEffect(() => {
        if (location.state !== null) {
            setToast(location.state)
        }
    }, [])

    return (
        <>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid
                    item
                    xs={false}
                    sm={6}
                    md={7}
                    lg={8}
                    sx={{
                        backgroundImage: 'url(../../../src/assets/bg1.avif)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={6} md={5} lg={4} component={Paper} elevation={12} square>
                    <Box
                        sx={{
                            my: 10,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar alt="BuyBook" src="../../../src/assets/buybook.png" sx={{ m: 1, width: 100, height: 100 }} variant="square" />
                        <Typography variant="h5">
                            Sign In
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                autoFocus
                                fullWidth
                                value={user.username}
                                onChange={handleOnChange}
                                label="Email Address"
                                name="username"
                                type='text'
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                value={user.password}
                                onChange={handleOnChange}
                                name="password"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton onMouseDown={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {!isLoading ? "Sign In" : <><CircularProgress sx={{ ml: -2.5, mr: 0.5 }} size="1rem" color="inherit" />Sign In</>}

                            </Button>
                            <Grid container>
                                {/* <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid> */}
                                <Grid item xs={12} sx={{
                                    justifyContent: "center",
                                    display: "flex"
                                }}>
                                    <Link to="/register" relative="path">
                                        <Typography sx={{ textDecoration: 'underline' }} color={"primary"} variant="body2">Don't have an account? Sign Up</Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid >
            <Snackbar open={toast.open} autoHideDuration={2500} onClose={() => { setToast({ ...toast, open: false }) }} anchorOrigin={{ vertical: "top", horizontal: "center" }}  >
                <Alert onClose={() => { setToast({ ...toast, open: false }) }} severity={toast.type} sx={{ width: '150%' }}>
                    {toast.type === "error" ? <>{toast.message}</> : <>Đăng ký tài khoản thành công!</>}
                </Alert>
            </Snackbar ></>
    );
}