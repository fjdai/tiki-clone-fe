import * as XLSX from "xlsx";
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { callBulkCreateUser } from '../../../services/apiAdmin/apiManageUsers';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import DragDropFileUpload from './DragDropFileUpload';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';




export default function ModalUploadFile(props) {
    const { open, setOpen, toast, openToast, setToast, reload, setReload } = props;

    const [fileName, setFileName] = useState(null);
    const [rows, setRows] = useState([]);


    const handleFileUpload = async (file) => {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const raw_data = XLSX.utils.sheet_to_json(worksheet);
        openToast("success", "File uploaded successfully");
        setFileName(file.name);
        setRows(raw_data);
    };

    const handleClose = () => {
        setOpen(false);
        setFileName(null);
        setRows([])
    }

    const handleDeleteFile = () => {
        setFileName(null);
        setRows([]);
    }


    const handleSubmit = async () => {
        const data = rows.map((item) => {
            item.password = "123456";
            return item;
        })
        const res = await callBulkCreateUser(data);
        if (res && res.data) {
            setReload(!reload);
            openToast("success", `Upload thành công. Success: ${res.data.countSuccess}, Erorr: ${res.data.countError} `);
            handleClose();
        }
        else {
            openToast("error", `Có lỗi xảy ra!`);
        }
    }

    return (
        <>
            <Modal
                keepMounted
                open={open}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 700,
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    boxShadow: 24,
                    p: 3,
                }}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant='h6'>Import data user</Typography>
                    </Box>
                    <DragDropFileUpload onFileUpload={handleFileUpload} />
                    {fileName ?
                        <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
                            <Box sx={{ display: "flex", m: 2 }}>
                                <AttachFileIcon />  <Typography >{fileName}</Typography>
                            </Box>
                            <IconButton onClick={handleDeleteFile} sx={{ mr: 1 }}>
                                <DeleteOutlinedIcon />
                            </IconButton>
                        </Box>
                        :
                        <></>
                    }
                    <Divider />
                    <Box sx={{ width: '100%', overflow: 'hidden', mt: 3, border: "0.5px solid #808080" }}>
                        <TableContainer sx={{ height: 300 }}>
                            <Table
                                stickyHeader
                                sx={{ minWidth: 650 }}
                            >
                                <TableHead >
                                    <TableRow>
                                        <TableCell
                                            sx={{ fontWeight: 600 }}
                                        >
                                            Tên hiển thị
                                        </TableCell>
                                        <TableCell
                                            sx={{ fontWeight: 600 }}
                                        >
                                            Email
                                        </TableCell>
                                        <TableCell
                                            sx={{ fontWeight: 600 }}
                                        >

                                            Số điện thoại

                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => {

                                        return (
                                            <TableRow
                                                key={`row-${index}`}
                                                hover
                                            >
                                                <TableCell >{row.fullName}</TableCell>
                                                <TableCell >{row.email}</TableCell>
                                                <TableCell >{row.phone}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: 'flex-end', mt: 3, gap: 2 }}>
                        <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                        <Button variant='contained' onClick={handleSubmit}>Import data</Button>
                    </Box>
                </Box >
            </Modal>
            <Snackbar open={toast.open} autoHideDuration={2500} onClose={() => { setToast({ ...toast, open: false }) }} anchorOrigin={{ vertical: "top", horizontal: "center" }}  >
                <Alert onClose={() => { setToast({ ...toast, open: false }) }} severity={toast.type} sx={{ width: '175%' }}>
                    {toast.type === "error" ? <>{toast.message}</> : <>{toast.message}</>}
                </Alert>
            </Snackbar >
        </ >
    );
}