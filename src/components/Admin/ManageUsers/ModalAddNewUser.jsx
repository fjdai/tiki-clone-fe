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




export default function ModalAddNewUser(props) {
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


    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const res = await createUser(user.fullName, user.password, user.email, user.phone);
        if (res && res.data) {
            setReload(!reload);
            setToast({ open: true, type: "success" })
            handleCancel();
        }
        else {
            setToast({ open: true, type: "error", message: res.message })

        }
    }

    const handleCancel = () => {
        setUser({
            fullName: "",
            password: "",
            email: "",
            phone: ""
        });
        setOpen(false);

    }

    const handleOnChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
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
                    p: 4,
                }}>
                    <Box sx={{ mx: 2, mb: 3 }}>
                        <Typography variant='h5'>Thêm mới người dùng</Typography>
                    </Box>
                    <Divider />
                    <Box component="form" sx={{ mt: 1 }} onSubmit={handleOnSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            autoComplete='off'
                            label="Tên hiển thị"
                            name="fullName"
                            value={user.fullName}
                            type='text'
                            onChange={handleOnChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            autoComplete='current-password'
                            value={user.password}
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
                            onChange={handleOnChange}

                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            name="email"
                            autoComplete='off'
                            type="text"
                            value={user.email}
                            onChange={handleOnChange}

                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Số điện thoại"
                            name="phone"
                            autoComplete='off'
                            type="text"
                            onChange={handleOnChange}
                            value={user.phone}

                        />
                        <Box sx={{ mt: 2, display: "flex", justifyContent: 'flex-end', gap: 2 }}>
                            <Button sx={{ width: 110 }} onClick={handleCancel} variant='outlined'>Hủy</Button>
                            <Button sx={{ width: 110 }} type='submit' variant='contained'>Tạo mới</Button>
                        </Box>
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