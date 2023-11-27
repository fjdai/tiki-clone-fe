import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { postRegister } from '../../services/apiRegister';
import CircularProgress from '@mui/material/CircularProgress';

export default function RegisterPage() {


    const [user, setUser] = useState({
        fullname: "",
        email: "",
        password: "",
        phone: ""

    })

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();


    const handleOnSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const res = await postRegister(user.fullname, user.email, user.password, user.phone);
        if (res && res.data) {
            setIsLoading(false);
            console.log(res.data);

            if (res.data.statusCode === 201) {
                // navigate("/login");
                alert("me");
            }
            if (res.data.statusCode === 400) {
                alert("me");
            }
        }

        // navigate("/login");
    };

    const handleOnChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={6}
                md={7}
                lg={8}
                sx={{
                    backgroundImage: 'url(../../../src/assets/bg.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={6} md={5} lg={4} component={Paper} elevation={12} square>
                <Box
                    sx={{
                        my: 6,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar alt="BuyBook" src="../../../src/assets/buybook.png" sx={{ m: 1, width: 100, height: 100 }} variant="square" />
                    <Typography variant="h5">

                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleOnSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            autoFocus
                            fullWidth
                            onChange={(event) => handleOnChange(event)}
                            label="Full Name"
                            value={user.fullname}
                            name="fullname"
                            type='text'
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={user.email}
                            autoComplete='username'
                            label="Email Address"
                            onChange={(event) => handleOnChange(event)}
                            name="email"
                            type='text'
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={user.password}
                            onChange={(event) => handleOnChange(event)}
                            name="password"
                            label="Password"
                            autoComplete='current-password'
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            value={user.phone}
                            onChange={(event) => handleOnChange(event)}
                            type="text"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {!isLoading ? "Sign Up" : <><CircularProgress />"Sign Up"</>}
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
                                <Link to="/login" relative="path">
                                    <Typography sx={{ textDecoration: 'underline' }} color={"primary"} variant="body2">Already have an account? Sign in</Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid >
    );
}