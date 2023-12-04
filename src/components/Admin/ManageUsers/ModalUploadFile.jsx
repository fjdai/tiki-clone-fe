import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Divider } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { createUser } from '../../../services/apiAdmin/apiManageUsers';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import DragDropFileUpload from './DragDropFileUpload';




export default function ModalUploadFile(props) {
    const { open, setOpen, reload, setReload } = props;

    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        fullName: "",
        password: "",
        email: "",
        phone: ""
    });
    const [toast, setToast] = useState({
        open: false,
        type: "success"
    });

    const handleFileUpload = (file) => {
        console.log(file);
    };

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
                    <Divider />
                    <DragDropFileUpload onFileUpload={handleFileUpload} />
                    <Box>

                    </Box>
                </Box >
            </Modal>
            <Snackbar open={toast.open} autoHideDuration={2500} onClose={() => { setToast({ ...toast, open: false }) }} anchorOrigin={{ vertical: "top", horizontal: "center" }}  >
                <Alert onClose={() => { setToast({ ...toast, open: false }) }} severity={toast.type} sx={{ width: '175%' }}>
                    {toast.type === "error" ? <>{toast.message}</> : <>Thêm mới người dùng thành công!</>}
                </Alert>
            </Snackbar >
        </ >
    );
}