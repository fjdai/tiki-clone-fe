import Skeleton from '@mui/material/Skeleton';
import "react-image-gallery/styles/scss/image-gallery.scss";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";


const SkeletonDetailBook = () => {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    mx: { xs: 0, md: 5 },
                    mt: 2,
                    mb: 5,
                    p: 5,
                    height: "auto",
                    flexDirection: { xs: "column", md: "row" }
                }} elevation={5} component={Paper}>
                <Box className="left-content" sx={{ width: "40%", display: { xs: "none", md: "flex" }, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 1 }}>
                    <Skeleton variant='rounded' sx={{ width: "80%", height: 380 }} />
                    <Box sx={{ display: "flex", width: "100%", gap: 1, justifyContent: "center" }}>
                        <Skeleton variant='rounded' sx={{ width: "20%", height: 100 }} />
                        <Skeleton variant='rounded' sx={{ width: "20%", height: 100 }} />
                        <Skeleton variant='rounded' sx={{ width: "20%", height: 100 }} />
                    </Box>
                </Box>
                <Box className="right-content" sx={{ width: { xs: "100%", md: "60%" }, p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: "30%" }} />
                    <Skeleton variant="text" sx={{ fontSize: '2.5rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '0.5rem', width: "20%" }} />
                    <Skeleton variant="rectangular" sx={{ fontSize: '5rem' }} />
                    <Skeleton variant="rectangular" sx={{ fontSize: '2rem', width: "50%" }} />
                    <Skeleton variant="rectangular" sx={{ fontSize: '2rem', width: "40%" }} />
                    <Box sx={{ width: "50%", display: "flex", justifyContent: "space-between" }}>
                        <Skeleton variant="rounded" sx={{ width: "45%", height: 45 }} />
                        <Skeleton variant="rounded" sx={{ width: "45%", height: 45 }} />
                    </Box>
                </Box >
            </Box >
        </>
    )
}

export default SkeletonDetailBook;