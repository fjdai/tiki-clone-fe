import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Divider } from '@mui/material';
import { callUpdateUser } from '../../../services/apiAdmin/apiManageUsers';

export default function ModalUpdateUser(props) {
    const { open, setOpen, reload, setReload, toast, openToast, setToast, user, setUser } = props;

    const handleOnSubmit = async () => {
        const res = await callUpdateUser(user._id, user.fullName, user.phone)
        if (res && res.data) {
            setReload(!reload);
            openToast("success", "Updated success");
            handleCancel();
        }
        else {
            openToast("erorr", `${res.message}`);
            handleCancel();
        }
    }

    const handleCancel = () => {
        setUser({});
        setOpen(false);
    }

    const handleOnChange = (event) => {
        if (user) {
            setUser({ ...user, [event?.target?.name]: event?.target?.value })
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
                    p: 4,
                }}>
                    <Box sx={{ mx: 2, mb: 3 }}>
                        <Typography variant='h5'>Chỉnh sửa người dùng</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: "flex", flexDirection: "column", mt: 2, gap: 2 }} >
                        <Typography variant='body1'>Tên hiển thị:</Typography>
                        <TextField
                            required
                            fullWidth
                            name="fullName"
                            autoComplete='off'
                            value={user.fullName}
                            type='text'
                            onChange={handleOnChange}

                        />

                        <Typography mvariant='body1'>Email</Typography>

                        <TextField
                            fullWidth
                            autoComplete='off'
                            disabled
                            value={user.email}

                        />
                        <Typography variant='body1'>Số điện thoại</Typography>

                        <TextField
                            required
                            fullWidth
                            name="phone"
                            type="text"
                            autoComplete='off'
                            value={user.phone}
                            onChange={handleOnChange}
                        />
                        <Box sx={{ mt: 2, display: "flex", justifyContent: 'flex-end', gap: 2 }}>
                            <Button sx={{ width: 110 }} onClick={handleCancel} variant='outlined'>Hủy</Button>
                            <Button sx={{ width: 110 }} onClick={handleOnSubmit} variant='contained'>Update</Button>
                        </Box>
                    </Box>
                </Box >
            </Modal>
        </ >
    );
}