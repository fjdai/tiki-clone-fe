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
import { callBookCategory, callCreateNewBook, callUploadBookImg } from '../../../services/apiAdmin/apiManageBooks';
import FileUpload from './FileUpload';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Clear from '@mui/icons-material/Clear';
import MultiFileUpload from './MultiFileUpload';
import { v4 as uuidv4 } from 'uuid';





export default function ModalAddNewBook(props) {
    const { open, setOpen, reload, setReload } = props;

    const [listCategory, setListCategory] = useState([]);
    const [category, setCategory] = useState("");
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [sold, setSold] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [dataThumbnail, setDataThumbnail] = useState("");

    const [slider, setSlider] = useState([]);
    const [dataSlider, setDataSlider] = useState([]);

    const [openModalPreview, setOpenModalPreview] = useState(false);
    const [imagePreview, setImagePreview] = useState("");


    const [toast, setToast] = useState({
        open: false,
        type: "success"
    });

    const fetchCategory = async () => {
        const res = await callBookCategory();
        if (res && res.data) {
            setListCategory(res.data);
        }
    }

    const handleCancel = () => {
        setOpen(false);
        setAuthor("");
        setCategory([]);
        setMainText("")
        setPrice("");
        setQuantity("");
        setSold("");
        setThumbnail("");
        setDataThumbnail("");
        setSlider([]);
        setDataSlider([]);

    }

    const handleOnSubmit = async () => {
        const res = await callCreateNewBook({ thumbnail, slider: slider.map(e => { return e.severImg }), mainText, author, price: +price, sold: +sold, quantity: +quantity, category })
        if (res && res.data) {
            setToast({ ...toast, open: true });
            setReload(!reload);
            handleCancel();
        }
        else {
            setToast({ open: true, type: "error", message: res.message[0] })

        }
    }


    const handleDeleteThumbnail = () => {
        setDataThumbnail("");
        setThumbnail("");
    }

    const handleDeleteSlider = (item) => {
        const temp = dataSlider.filter(e => e.id != item);
        const temp1 = slider.filter(e => e.id != item);
        setDataSlider(temp);
        setSlider(temp1);
    }

    const handlePreviewImage = (value) => {
        setImagePreview(value);
        setOpenModalPreview(true);
    }

    const handleOnChangeThumbnail = async (file) => {
        const res = await callUploadBookImg(file);
        if (res && res.data) {
            setThumbnail(res.data.fileUploaded);
        }
        setDataThumbnail(URL.createObjectURL(file))
    }


    const handleOnChangeSlider = (files) => {
        let temp = [...dataSlider];
        let temp1 = [...slider];
        Array.from(files).forEach(async (file) => {
            let id = uuidv4();
            temp.push({ localImg: (URL.createObjectURL(file)), id });
            const res = await callUploadBookImg(file);
            if (res && res.data) {
                temp1.push({ severImg: res.data.fileUploaded, id });
            }
        });
        setSlider(temp1);
        setDataSlider(temp);
    }

    const handleOnChangeCategory = (value) => {
        setCategory(value);
    }

    const handleOnChangeAuthor = (event) => {
        setAuthor(event.target.value);
    }

    const handleOnChangePrice = (event) => {
        setPrice(event.target.value.replace(/,/g, ""));
    }

    const handleOnChangeQuantity = (event) => {
        setQuantity(event.target.value);
    }

    const handleOnChangeSold = (event) => {
        setSold(event.target.value);
    }

    const handleOnChangeMainText = (event) => {
        setMainText(event.target.value);
    }

    useEffect(() => {
        fetchCategory();
    }, [])

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
                        <IconButton onClick={() => { setOpenModalPreview(false) }}>
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
                        <Typography variant='h5'>Thêm sách mới</Typography>
                    </Box>
                    <Divider />
                    <Box component="form" sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 3, justifyContent: "center" }}>
                        <TextField
                            type='text'
                            sx={{ width: "46.9%" }}
                            label="Tên sách"
                            autoComplete='off'
                            value={mainText}
                            onChange={handleOnChangeMainText}
                            required
                        />
                        <TextField
                            type='text'
                            sx={{ width: "46.9%" }}
                            label="Tác giả"
                            autoComplete='off'
                            value={author}
                            onChange={handleOnChangeAuthor}
                            required
                        />
                        <NumericFormat
                            customInput={TextField}
                            label="Giá tiền"
                            type="text"
                            thousandSeparator=","
                            autoComplete='off'
                            value={price}
                            onChange={handleOnChangePrice}
                            sx={{ width: "22%" }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                            }}
                            required

                        />
                        <TextField
                            select
                            required
                            sx={{ width: "22%" }}
                            label="Thể loại"
                            value={category}
                        >
                            {listCategory.map((item, index) => {
                                return (
                                    <MenuItem key={`category-${index}`} onClick={() => handleOnChangeCategory(item)} value={item}>{item}</MenuItem>
                                )
                            })}
                        </TextField>
                        <TextField
                            type='number'
                            sx={{ width: "22%" }}
                            label="Số lượng"
                            autoComplete='off'
                            value={quantity}
                            onChange={handleOnChangeQuantity}
                            required
                        />
                        <TextField
                            type='number'
                            sx={{ width: "22%" }}
                            label="Đã bán"
                            value={sold}
                            onChange={handleOnChangeSold}
                            autoComplete='off'
                            required
                            defaultValue={0}
                        />
                    </Box>
                    <Box sx={{ display: "flex", mt: 2, mx: 2, justifyContent: "space-between" }}>
                        <Box sx={{ width: "48%" }}>

                            <Typography variant='body1' sx={{ mb: 1 }}>Thumbnail</Typography>
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, width: "100%", maxHeight: 300, overflow: 'scroll' }}>
                                {dataThumbnail &&
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
                                            src={dataThumbnail}
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
                                                        onClick={() => handlePreviewImage(thumbnail)}
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
                                                        onClick={handleDeleteThumbnail}
                                                    >
                                                        <DeleteOutlineOutlinedIcon />
                                                    </IconButton>
                                                </>

                                            }
                                        />

                                    </Box>
                                }
                                <FileUpload onFileUpload={handleOnChangeThumbnail} />
                            </Box>
                        </Box>
                        <Box sx={{ width: "48%" }}>
                            <Typography variant='body1' sx={{ mb: 1 }}>Slider</Typography>
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, width: "100%", maxHeight: 300, overflow: 'scroll' }}>
                                {dataSlider.map((item) => {
                                    return (
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
                                                src={item.localImg}
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
                                                            onClick={() => handlePreviewImage(item.localImg)}
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
                                                            onClick={() => { handleDeleteSlider(item.id) }}
                                                        >
                                                            <DeleteOutlineOutlinedIcon />
                                                        </IconButton>
                                                    </>

                                                }
                                            />

                                        </Box>
                                    )
                                })

                                }
                                <MultiFileUpload onMultiFileUpload={handleOnChangeSlider} />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "end", mt: 3 }}>
                        <Button variant='outlined' onClick={handleCancel}>Hủy</Button>
                        <Button variant='contained' onClick={handleOnSubmit} sx={{ ml: 3 }}>Tạo mới</Button>

                    </Box>
                </Box >
            </Modal >
            <Snackbar open={toast.open} autoHideDuration={2500} onClose={() => { setToast({ ...toast, open: false }) }} anchorOrigin={{ vertical: "top", horizontal: "center" }}  >
                <Alert onClose={() => { setToast({ ...toast, open: false }) }} severity={toast.type} sx={{ width: '175%' }}>
                    {toast.type === "error" ? <>{toast.message}</> : <>Thêm mới sách thành công!</>}
                </Alert>
            </Snackbar >
        </ >
    );
}