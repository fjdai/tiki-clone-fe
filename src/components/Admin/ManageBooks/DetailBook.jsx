import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Clear from '@mui/icons-material/Clear';
import moment from 'moment-timezone';
import Divider from '@mui/material/Divider';
import { useState } from 'react';

const DetailBook = (props) => {
    const { book, open, setOpen } = props;
    let listBook = [];
    if (book.slider) { listBook = [book.thumbnail, ...book?.slider]; }

    const [openModal, setOpenModal] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handlePreviewImage = (image) => {
        setImagePreview(image);
        setOpenModal(true);
    }

    return (
        <>
            <Modal
                open={openModal}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 0
                }}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", m: 1 }}>

                        <IconButton onClick={() => { setOpenModal(false) }}>
                            <Clear />
                        </IconButton>
                    </Box>
                    <Box component="img"
                        sx={{
                            height: "100%",
                            width: "100%",
                        }}
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${imagePreview}`}
                    ></Box>
                </Box>
            </Modal >
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
                <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 1, marginBottom: 2 }}>
                        <IconButton onClick={() => { setOpen(false) }}>
                            <Clear />
                        </IconButton>
                        <Typography variant='h5'>Thông tin Book</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, ml: { xs: 8, md: 3.5 }, mt: 2.5 }}>
                        <Box>
                            <Typography>ID</Typography>
                            <TextField
                                margin="normal"
                                variant='standard'
                                value={book._id}
                                disabled
                                multiline
                                sx={{ width: "30ch" }}

                            />
                        </Box>
                        <Box>
                            <Typography>Tên sách</Typography>
                            <TextField
                                margin="normal"
                                variant='standard'
                                multiline
                                value={book.mainText}
                                disabled
                                sx={{ width: "30ch" }}
                            />
                        </Box>
                        <Box>
                            <Typography>Tác giả</Typography>
                            <TextField
                                margin="normal"
                                variant='standard'
                                value={book.author}
                                type='text'
                                disabled
                                multiline
                                sx={{ width: "30ch" }}
                            />
                        </Box>
                        <Box>

                            <Typography>Giá tiền</Typography>
                            <TextField
                                margin="normal"
                                variant='standard'
                                value={book.price}
                                type='text'
                                disabled
                                multiline

                                sx={{ width: "30ch" }}
                            />
                        </Box>
                        <Box>
                            <Typography>Thể loại</Typography>
                            <TextField
                                multiline

                                margin="normal"
                                variant='standard'
                                value={book.category}
                                type='text'
                                disabled
                                sx={{ width: { xs: "30ch", md: "62ch" } }}

                            />
                        </Box>
                        <Box>
                            <Typography>Created At</Typography>
                            <TextField
                                multiline
                                margin="normal"
                                variant='standard'
                                value={moment(book.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                                type='text'
                                disabled
                                sx={{ width: "30ch" }}
                            />
                        </Box>
                        <Box>
                            <Typography>Updated At</Typography>
                            <TextField
                                multiline
                                margin="normal"
                                variant='standard'
                                value={moment(book.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
                                type='text'
                                color='primary'
                                disabled
                                sx={{ width: "30ch" }}
                            />
                        </Box>
                        {listBook?.length > 0 &&
                            <Box >
                                {listBook.map((item, index) => {
                                    return (
                                        <Box component="img" onClick={() => { handlePreviewImage(item) }} key={`image-${index}`}
                                            sx={{
                                                height: "9rem",
                                                width: "8rem",
                                                mr: 2,
                                                cursor: "pointer",
                                                border: "1px solid",
                                                flexWrap: "wrap"
                                            }}
                                            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`}
                                        ></Box>
                                    );
                                })}
                            </Box>
                        }
                    </Box>
                </Box>
            </Drawer >
        </>
    )
}

export default DetailBook;