import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Footer = () => {
    return (
        <>
            <Box component="footer" sx={{ bgcolor: 'background.paper', py: 2 }}>
                <Container sx={{ display: "flex", flexDirection: "column", gap: 0.8, mx: 1, }} >
                    <Typography
                        variant="subtitle2"
                        align="left"
                        color="text.secondary"
                        component="p"
                    >
                        Trụ sở chính: Tòa nhà Viettel, Số 285, đường Cách Mạng Tháng 8, phường 12, quận 10, Thành phố Hồ Chí Minh

                    </Typography>
                    <Typography
                        variant="subtitle2"
                        align="left"
                        color="text.secondary"
                        component="p"
                    >
                        BuyBook nhận đặt hàng trực tuyến và giao hàng tận nơi, chưa hỗ trợ mua và nhận hàng trực tiếp tại văn phòng hoặc trung tâm xử lý đơn hàng

                    </Typography>
                    <Typography
                        variant="subtitle2"
                        align="left"
                        color="text.secondary"
                        component="p"
                    >
                        Giấy chứng nhận Đăng ký Kinh doanh số 0309532909 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp lần đầu ngày 06/01/2010 và sửa đổi lần thứ 23 ngày 14/02/2022

                    </Typography>
                    <Typography
                        variant="subtitle2"
                        align="left"
                        color="text.secondary"
                        component="p"
                    >
                        © 2022 - Bản quyền của Công ty TNHH BuyBook

                    </Typography>
                </Container>
            </Box>
        </>
    );
}

export default Footer