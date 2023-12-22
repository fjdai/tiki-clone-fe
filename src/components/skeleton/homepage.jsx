import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const SkeletonHomePage = () => {
    return (
        <>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", height: "auto", gap: 1 }}>
                {Array.apply(null, Array(15)).map((value, index) => {
                    return (
                        <Box key={`item-${index}`} sx={{ width: { xs: "calc(100% / 3 - 15px)", sm: "calc(100% / 4 - 15px)", md: "calc(100% / 4 - 15px)", lg: "calc(100% / 5 - 15px)" }, height: 300, display: "flex", flexDirection: "column", gap: 1 }} >
                            <Skeleton variant="rounded" sx={{ width: "100%", height: "60%" }} />
                            <Box >
                                <Skeleton variant="text" />
                                <Skeleton variant="text" />
                                <Skeleton variant="text" sx={{ fontSize: "0.6rem", width: "40%" }} />
                                <Box sx={{ display: "flex", gap: 2 }}>
                                    <Skeleton variant="text" sx={{ fontSize: "0.8rem", width: "50%" }} />
                                    <Skeleton variant="text" sx={{ fontSize: "0.8rem", width: "50%" }} />
                                </Box>
                            </Box>
                        </Box>

                    )
                })}
            </Box >
        </>
    )
}

export default SkeletonHomePage;