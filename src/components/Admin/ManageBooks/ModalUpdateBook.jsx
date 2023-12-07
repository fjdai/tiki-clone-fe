import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Divider } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { NumericFormat } from 'react-number-format';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { callBookCategory, callDeleteBookImg, callUpdateBook, callUploadBookImg } from '../../../services/apiAdmin/apiManageBooks';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Clear from '@mui/icons-material/Clear';
import { v4 as uuidv4 } from 'uuid';
import FileUpdate from './FileUpdate';
import MultiFileUpdate from './MultiFileUpdate';




export default function ModalUpdateBook(props) {
    const { open, setOpen, reload, setReload, data, setData } = props;
    const [listCategory, setListCategory] = useState([]);
    const [openModalPreview, setOpenModalPreview] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const [rawThumbnail, setRawThumbnail] = useState("");
    const [rawSlider, setRawSlider] = useState([]);
    const [dataSlider, setDataSlider] = useState([]);



    const fetchCategory = async () => {
        const res = await callBookCategory();
        if (res && res.data) {
            setListCategory(res.data);
        }
    }
    const [toast, setToast] = useState({
        open: false,
        type: "success"
    });

    useEffect(() => {
        fetchCategory();
    }, [])

    const handleOnChange = (event) => {
        if (event.target.name === "price") {
            setData({ ...data, slider: [...data.slider], [event.target.name]: (event.target.value).replace(/,/g, "") })
        }
        else {
            setData({ ...data, slider: [...data.slider], [event.target.name]: event.target.value })
        }
    }

    const handleCancel = () => {
        setRawSlider([]);
        setDataSlider([])
        setRawThumbnail("")
        setData("");
        setOpen(false);
    }


    const handleOnSubmit = async () => {
        const temp = dataSlider.map(e => {
            return e.sever;
        })

        const res = await callUpdateBook(data._id, {
            mainText: data.mainText,
            slider: [...data.slider, ...temp],
            category: data.category,
            author: data.author,
            thumbnail: data.thumbnail,
            price: +data.price,
            quantity: +data.quantity,
            sold: +data.sold
        })

        if (res && res.data) {
            setToast({ open: true, type: "success" })
            handleCancel();
        }
        else {
            setToast({ open: true, type: "error", message: res.message[0] })

        }
    }


    const handlePreviewImage = (value) => {
        setImagePreview(value);
        setOpenModalPreview(true);
    }

    const handleDeleteThumbnail = (value, type) => {
        setData({ ...data, slider: [...data.slider], thumbnail: "" })
        if (type === "sever") {
        }
        else {
            setRawThumbnail(null);
        }
    }

    const handleDeleteSlider = (value, type) => {
        if (type === "sever") {
            const temp = data.slider.filter(e => e != value);
            setData({ ...data, slider: [...temp] });
        }
        else {
            const temp = rawSlider.filter(e => e.id != value);
            const temp1 = dataSlider.filter(e => e.id != value);
            setRawSlider(temp);
            setDataSlider(temp1);
        }
    }


    const handleOnChangeThumbnail = async (file) => {
        const res = await callUploadBookImg(file);
        if (res && res.data && deleteThumbnail) {
            setRawThumbnail(URL.createObjectURL(file));
            setData({ ...data, slider: [...data.slider], thumbnail: res.data.fileUploaded })
        }
        if (res && res.data && !deleteThumbnail) {
            setDeleteThumbnail(data.thumbnail)
            setRawThumbnail(URL.createObjectURL(file));
            setData({ ...data, slider: [...data.slider], thumbnail: res.data.fileUploaded })
        }
    }

    const handleOnChangeSlider = (files) => {
        let temp = [...rawSlider];
        let temp1 = [...dataSlider];
        Array.from(files).forEach(async (e) => {
            let id = uuidv4();
            temp.push({ local: e, id });
            const res = await callUploadBookImg(e);
            if (res && res.data) {
                temp1.push({ sever: res.data.fileUploaded, id });
            }
        })
        setRawSlider(temp);
        setDataSlider(temp1);
    }

    return (
        <>
            <Modal
                open={openModalPreview}
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
                        <IconButton onClick={() => { setOpenModalPreview(false); setImagePreview("") }}>
                            <Clear />
                        </IconButton>
                    </Box>
                    <Box component="img"
                        sx={{
                            height: "100%",
                            width: "100%",
                        }}
                        src={imagePreview}
                    ></Box>
                </Box>
            </Modal >


            <Modal
                keepMounted
                open={open}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 900,
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Box sx={{ mx: 2, mb: 3 }}>
                        <Typography variant='h5'>Update sách</Typography>
                    </Box>
                    <Divider />
                    <Box component="form" sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 3, justifyContent: "center" }}>
                        <Box sx={{ width: "46.9%" }}>
                            <Typography variant='body1'>Tên sách</Typography>
                            <TextField
                                type='text'
                                autoComplete='off'
                                fullWidth
                                name='mainText'
                                value={data.mainText}
                                onChange={handleOnChange}
                                required

                            />
                        </Box>
                        <Box sx={{ width: "46.9%" }}>
                            <Typography variant='body1'>Tác giả</Typography>
                            <TextField
                                type='text'
                                autoComplete='off'
                                fullWidth
                                name='author'
                                value={data.author}
                                onChange={handleOnChange}
                                required

                            />
                        </Box>
                        <Box sx={{ width: "22%" }}>
                            <Typography variant='body1'>Giá tiền</Typography>
                            <NumericFormat
                                customInput={TextField}
                                type="text"
                                thousandSeparator=","
                                value={data.price}
                                onChange={handleOnChange}
                                fullWidth
                                name='price'
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                                }}
                                required

                            />
                        </Box>
                        <Box variant="formControl" sx={{ width: "22%" }}>
                            <Typography variant='body1'>Thể loại</Typography>
                            <Select
                                fullWidth
                                value={data.category}
                                name="category"
                                onChange={handleOnChange}
                            >
                                {listCategory.map((item, index) => {
                                    return (
                                        <MenuItem key={`category-${index}`} value={item}>{item}</MenuItem>
                                    )
                                })}

                            </Select>
                        </Box>
                        <Box sx={{ width: "22% " }}>
                            <Typography Typography variant='body1' > Số lượng</Typography>
                            <TextField
                                type='number'
                                fullWidth
                                autoComplete='off'
                                value={data.quantity}
                                name='quantity'
                                onChange={handleOnChange}
                                required
                            />
                        </Box>
                        <Box sx={{ width: "22%" }}>
                            <Typography variant='body1'>Đã bán</Typography>
                            <TextField
                                type='number'
                                name='sold'
                                value={data.sold}
                                onChange={handleOnChange}
                                autoComplete='off'
                                required
                                defaultValue={0}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", width: "100%", mt: 2, mx: 2, justifyContent: "space-between" }}>
                        <Box sx={{ width: "48%" }}>
                            <Typography variant='body1' sx={{ mb: 1 }}>Thumbnail</Typography>
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, width: "100%", maxHeight: 300, overflow: 'scroll' }}>
                                {data?.thumbnail && !rawThumbnail &&
                                    <Box Box
                                        component="div"
                                        sx={{
                                            display: "flex",
                                            position: "relative",
                                            width: 150,
                                            height: 150,
                                        }}
                                    >
                                        <Box
                                            style={{
                                                width: 150,
                                                height: 150,
                                                border: '2px #aaa',
                                                borderRadius: 15,
                                                background: '#fafafa',
                                            }}
                                            component="img"
                                            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${data.thumbnail}`}
                                        />
                                        <ImageListItemBar
                                            actionPosition="left"
                                            sx={{
                                                width: 150,
                                                height: 150,
                                                borderRadius: "15px",
                                                background: "rgb(0, 0, 0, 0)",
                                                '&:hover': {
                                                    background: "rgb(0, 0, 0, 0.3)",
                                                    "&:hover button": {
                                                        color: 'rgba(255, 255, 255, 0.8)'
                                                    }
                                                },
                                                pl: 4.3
                                            }}
                                            actionIcon={
                                                <>
                                                    <IconButton
                                                        onClick={() => handlePreviewImage(`${import.meta.env.VITE_BACKEND_URL}/images/book/${data.thumbnail}`)}
                                                        sx={{
                                                            color: 'rgba(0, 0, 0, 0)',
                                                            "& :hover": { color: 'rgba(55, 255, 255, 0.9)' }
                                                            ,
                                                            p: 0,
                                                            m: 1
                                                        }}

                                                    >
                                                        <VisibilityOutlinedIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        sx={{
                                                            color: 'rgba(0, 0, 0, 0)',
                                                            "& :hover": { color: 'rgba(255, 0, 0, 0.9)' }
                                                            ,
                                                            p: 0,
                                                            m: 1

                                                        }}
                                                        onClick={() => { handleDeleteThumbnail(data.thumbnail, "sever") }}
                                                    >
                                                        <DeleteOutlineOutlinedIcon />
                                                    </IconButton>
                                                </>

                                            }
                                        />

                                    </Box>
                                }
                                {rawThumbnail &&
                                    <Box
                                        component="div"
                                        sx={{
                                            display: "flex",
                                            position: "relative",
                                            width: 150,
                                            height: 150,
                                        }}
                                    >
                                        <Box
                                            style={{
                                                width: 150,
                                                height: 150,
                                                border: '2px #aaa',
                                                borderRadius: 15,
                                                background: '#fafafa',
                                            }}
                                            component="img"
                                            src={rawThumbnail}
                                        />
                                        <ImageListItemBar
                                            actionPosition="left"
                                            sx={{
                                                width: 150,
                                                height: 150,
                                                borderRadius: "15px",
                                                background: "rgb(0, 0, 0, 0)",
                                                '&:hover': {
                                                    background: "rgb(0, 0, 0, 0.3)",
                                                    "&:hover button": {
                                                        color: 'rgba(255, 255, 255, 0.8)'
                                                    }
                                                },
                                                pl: 4.3
                                            }}
                                            actionIcon={
                                                <>
                                                    <IconButton
                                                        onClick={() => handlePreviewImage(rawThumbnail)}
                                                        sx={{
                                                            color: 'rgba(0, 0, 0, 0)',
                                                            "& :hover": { color: 'rgba(55, 255, 255, 0.9)' }
                                                            ,
                                                            p: 0,
                                                            m: 1
                                                        }}

                                                    >
                                                        <VisibilityOutlinedIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        sx={{
                                                            color: 'rgba(0, 0, 0, 0)',
                                                            "& :hover": { color: 'rgba(255, 0, 0, 0.9)' }
                                                            ,
                                                            p: 0,
                                                            m: 1

                                                        }}
                                                        onClick={() => { handleDeleteThumbnail(rawThumbnail, "local") }}
                                                    >
                                                        <DeleteOutlineOutlinedIcon />
                                                    </IconButton>
                                                </>

                                            }
                                        />

                                    </Box>
                                }
                                <FileUpdate onFileUpload={handleOnChangeThumbnail} />
                            </Box>
                        </Box>
                        <Box sx={{ width: "48%" }}>
                            <Typography variant='body1' sx={{ mb: 1 }}>Slider</Typography>
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, width: "100%", maxHeight: 300, overflow: 'scroll' }}>
                                {data.slider && data.slider.map((item, index) => {
                                    return (
                                        <Box
                                            key={`slider-${index}`}
                                            component="div"
                                            sx={{
                                                display: "flex",
                                                position: "relative",
                                                width: 150,
                                                height: 150,
                                            }}
                                        >
                                            <Box
                                                style={{
                                                    width: 150,
                                                    height: 150,
                                                    border: '2px #aaa',
                                                    borderRadius: 15,
                                                    background: '#fafafa',
                                                }}
                                                component="img"
                                                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`}
                                            />
                                            <ImageListItemBar
                                                actionPosition="left"
                                                sx={{
                                                    width: 150,
                                                    height: 150,
                                                    borderRadius: "15px",
                                                    background: "rgb(0, 0, 0, 0)",
                                                    '&:hover': {
                                                        background: "rgb(0, 0, 0, 0.3)",
                                                        "&:hover button": {
                                                            color: 'rgba(255, 255, 255, 0.8)'
                                                        }
                                                    },
                                                    pl: 4.3
                                                }}
                                                actionIcon={
                                                    <>
                                                        <IconButton
                                                            onClick={() => handlePreviewImage(`${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`)}
                                                            sx={{
                                                                color: 'rgba(0, 0, 0, 0)',
                                                                "& :hover": { color: 'rgba(55, 255, 255, 0.9)' }
                                                                ,
                                                                p: 0,
                                                                m: 1
                                                            }}

                                                        >
                                                            <VisibilityOutlinedIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            sx={{
                                                                color: 'rgba(0, 0, 0, 0)',
                                                                "& :hover": { color: 'rgba(255, 0, 0, 0.9)' }
                                                                ,
                                                                p: 0,
                                                                m: 1

                                                            }}
                                                            onClick={() => { handleDeleteSlider(item, "sever") }}
                                                        >
                                                            <DeleteOutlineOutlinedIcon />
                                                        </IconButton>
                                                    </>

                                                }
                                            />

                                        </Box>
                                    )
                                })}
                                {rawSlider && rawSlider.map((item, index) => {
                                    return (
                                        <Box
                                            key={`slider-${index}raw`}
                                            component="div"
                                            sx={{
                                                display: "flex",
                                                position: "relative",
                                                width: 150,
                                                height: 150,
                                            }}
                                        >
                                            <Box
                                                style={{
                                                    width: 150,
                                                    height: 150,
                                                    border: '2px #aaa',
                                                    borderRadius: 15,
                                                    background: '#fafafa',
                                                }}
                                                component="img"
                                                src={URL.createObjectURL(item.local)}
                                            />
                                            <ImageListItemBar
                                                actionPosition="left"
                                                sx={{
                                                    width: 150,
                                                    height: 150,
                                                    borderRadius: "15px",
                                                    background: "rgb(0, 0, 0, 0)",
                                                    '&:hover': {
                                                        background: "rgb(0, 0, 0, 0.3)",
                                                        "&:hover button": {
                                                            color: 'rgba(255, 255, 255, 0.8)'
                                                        }
                                                    },
                                                    pl: 4.3
                                                }}
                                                actionIcon={
                                                    <>
                                                        <IconButton
                                                            onClick={() => handlePreviewImage(URL.createObjectURL(item.local))}
                                                            sx={{
                                                                color: 'rgba(0, 0, 0, 0)',
                                                                "& :hover": { color: 'rgba(55, 255, 255, 0.9)' }
                                                                ,
                                                                p: 0,
                                                                m: 1
                                                            }}

                                                        >
                                                            <VisibilityOutlinedIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            sx={{
                                                                color: 'rgba(0, 0, 0, 0)',
                                                                "& :hover": { color: 'rgba(255, 0, 0, 0.9)' }
                                                                ,
                                                                p: 0,
                                                                m: 1

                                                            }}
                                                            onClick={() => { handleDeleteSlider(item.id, "local") }}
                                                        >
                                                            <DeleteOutlineOutlinedIcon />
                                                        </IconButton>
                                                    </>

                                                }
                                            />

                                        </Box>
                                    )
                                })}
                                <MultiFileUpdate onMultiFileUpload={handleOnChangeSlider} />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "end", mt: 3 }}>
                        <Button variant='outlined' onClick={handleCancel}>Hủy</Button>
                        <Button variant='contained' onClick={handleOnSubmit} sx={{ ml: 3 }}>Update</Button>

                    </Box>
                </Box >
            </Modal >
            <Snackbar open={toast.open} autoHideDuration={2500} onClose={() => { setToast({ ...toast, open: false }) }} anchorOrigin={{ vertical: "top", horizontal: "center" }}  >
                <Alert onClose={() => { setToast({ ...toast, open: false }) }} severity={toast.type} sx={{ width: '175%' }}>
                    {toast.type === "error" ? <>{toast.message}</> : <>Update sách thành công!</>}
                </Alert>
            </Snackbar >
        </ >
    );
}