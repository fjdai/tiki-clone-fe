import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

export default function LoginPage() {
    const [user, setUser] = useState({
        username: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

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
                    backgroundImage: 'url(/bg1.avif)',
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
                    <Avatar alt="BuyBook" src="/buybook.png" sx={{ m: 1, width: 100, height: 100 }} variant="square" />
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
                            Sign In
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
    );
}