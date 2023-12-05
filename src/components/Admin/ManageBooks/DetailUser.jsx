import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Clear from '@mui/icons-material/Clear';
import moment from 'moment-timezone';

const DetailUser = (props) => {
    const { user, open, setOpen } = props;

    return (
        <>
            <Drawer
                sx={{
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: { xs: 400, md: 600 },
                        paddingTop: 8,

                    },
                }}
                anchor={'right'}
                open={open}
            >
                <Box sx={{ mt: 1 }}>
                    <Box sx={{ ml: 1, marginBottom: { xs: 3, md: 14 } }}>
                        <IconButton onClick={() => { setOpen(false) }}>
                            <Clear />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, ml: { xs: 8, md: 3.5 } }}>
                        <Box>
                            <Typography>ID</Typography>
                            <TextField
                                margin="normal"
                                variant='standard'
                                value={user._id}
                                disabled
                                sx={{ width: "30ch" }}

                            />
                        </Box>
                        <Box>
                            <Typography>Tên hiển thị</Typography>
                            <TextField
                                margin="normal"
                                variant='standard'
                                value={user.fullName}
                                disabled
                                sx={{ width: "30ch" }}
                            />
                        </Box>
                        <Box>
                            <Typography>Email</Typography>
                            <TextField
                                margin="normal"
                                variant='standard'
                                value={user.email}
                                type='text'
                                disabled
                                sx={{ width: "30ch" }}
                            />
                        </Box>
                        <Box>

                            <Typography>Số điện thoại</Typography>
                            <TextField
                                margin="normal"
                                variant='standard'
                                value={user.phone}
                                type='text'
                                disabled
                                sx={{ width: "30ch" }}
                            />
                        </Box>
                        <Box>
                            <Typography>Role</Typography>
                            <TextField
                                margin="normal"
                                variant='standard'
                                value={user.role}
                                type='text'
                                disabled
                                sx={{ width: { xs: "30ch", md: "62ch" } }}

                            />
                        </Box>
                        <Box>
                            <Typography>Created At</Typography>
                            <TextField
                                margin="normal"
                                variant='standard'
                                value={moment(user.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                                type='text'
                                disabled
                                sx={{ width: "30ch" }}
                            />
                        </Box>
                        <Box>
                            <Typography>Updated At</Typography>
                            <TextField
                                margin="normal"
                                variant='standard'
                                value={moment(user.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
                                type='text'
                                color='primary'
                                disabled
                                sx={{ width: "30ch" }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Drawer >
        </>
    )
}

export default DetailUser;