import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                flexDirection: "column"
            }}
        >
            <Box container spacing={2}>
                <Grid item
                >
                    <img
                        src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                        alt="404"
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                </Grid>
                <Grid item
                >
                    <Typography sx={{ display: "grid", justifyContent: "center" }} variant="h6">
                        The page you’re looking for doesn’t exist.
                    </Typography>
                    <Container sx={{ display: "grid", justifyContent: "center", mt: 2 }}>
                        <Button sx={{ borderRadius: 3 }} variant="contained" onClick={() => navigate("/")}>Back Home</Button>
                    </Container>
                </Grid>

            </Box>
        </Box >
    );

}
export default NotFound;