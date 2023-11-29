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
            <Box container>
                <Grid item mt={{ xs: -8, sm: -7, md: -8, lg: -8 }}
                >
                    <Typography sx={{ display: "grid", justifyContent: "center" }} variant="h1">
                        404
                    </Typography>
                </Grid>
                <Grid item
                >
                    <img
                        src="../../src/assets/404.gif"
                        alt="404"
                        style={{ maxWidth: "100%", maxHeight: "400px" }}
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