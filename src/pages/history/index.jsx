import { Alert, Box, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from "react";
import { callHistory } from "../../services/apiNormalUser/apiBook";
import moment from "moment-timezone";
import ReactJson from 'react-json-view'

const HistoryPage = () => {
    const [historyOrder, setHistoryOder] = useState([]);

    const fetchHistory = async () => {
        const res = await callHistory();
        if (res && res.data) {
            setHistoryOder(res.data);
        }
    }
    const formatPrice = (price) => {
        return `${price}₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    useEffect(() => {
        fetchHistory();
    }, [])

    console.log(historyOrder.length);

    return (
        <Box sx={{ p: 3, display: "flex", flexDirection: "column" }}>
            <Typography>Lịch sử đặt hàng:</Typography>
            <Box>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                    >
                        <TableHead>
                            <TableRow>

                                <TableCell sx={{ fontWeight: 600 }}> STT </TableCell>
                                <TableCell sx={{ fontWeight: 600 }}> Thời gian </TableCell>
                                <TableCell sx={{ fontWeight: 600 }}> Tổng số tiền </TableCell>
                                <TableCell sx={{ fontWeight: 600 }}> Trạng thái </TableCell>
                                <TableCell sx={{ fontWeight: 600 }}> Chi tiết </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {historyOrder.length === 0 &&
                                <TableRow sx={{ height: 200 }}>
                                    <TableCell colSpan={6} align="center" >
                                        <Typography variant="h5">
                                            No records found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            }
                            {historyOrder.length > 0 && historyOrder.map((data, index) => {
                                return (
                                    <TableRow key={`row-${index}`} >
                                        <TableCell >{index + 1} </TableCell>
                                        <TableCell >{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")} </TableCell>
                                        <TableCell >{formatPrice(data.totalPrice)} </TableCell>
                                        <TableCell >
                                            <Alert severity="success" sx={{ width: 150 }}>Thành công</Alert>
                                        </TableCell>
                                        <TableCell >
                                            <ReactJson collapsed={true} enableClipboard={false} displayObjectSize={false} displayDataTypes={false} name={"Chi tiết đơn hàng"} src={data.detail} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box >
    )
}

export default HistoryPage;