import * as XLSX from "xlsx";
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DetailBook from './DetailBook';
import Typography from '@mui/material/Typography';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { callDeleteUser } from "../../../services/apiAdmin/apiManageUsers";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { callListBook } from "../../../services/apiAdmin/apiManageBooks";
import moment from "moment-timezone";
import ModalAddNewBook from "./ModalAddNewBook";
import ModalUpdateBook from "./ModalUpdateBook";

export default function BookTable(props) {
    const { currentPage, setCurrentPage,
        rowsPerPage, setRowsPerPage,
        pages, setPages,
        book, setBook,
        open,
    } = props

    const [rows, setRows] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState("mainText");

    const [openDetailBook, setOpenDetailBook] = useState(false);
    const [currentBook, setCurrentBook] = useState({});

    const [reload, setReload] = useState(false);

    const [openModalAddNewBook, setOpenModalAddNewBook] = useState(false);

    const [openModalUpdateBook, setOpenModalUpdateBook] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({})

    const [toast, setToast] = useState({
        open: false,
        type: "success",
        message: ""
    });

    const fetchListBooks = async () => {
        if (order === "asc") {
            const res = await callListBook(currentPage + 1, rowsPerPage, `+${orderBy}`, book.mainText, book.author, book.category);
            if (res && res.data) {
                setRows(res.data.result);
                setPages(res.data.meta.pages);
            }
        }
        if (order === "desc") {
            const res = await callListBook(currentPage + 1, rowsPerPage, `-${orderBy}`, book.mainText, book.author, book.category);
            if (res && res.data) {
                setRows(res.data.result);
                setPages(res.data.meta.pages);
            }
        }
    }

    useEffect(() => {
        fetchListBooks();
    }, [order, orderBy, currentPage, rowsPerPage, book, reload])

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleOnChange = (event) => {
        setRowsPerPage(event.target.value)
        setCurrentPage(0);
    }

    const handleDetailBook = (value) => {
        setCurrentBook(value);
        setOpenDetailBook(true);
    }

    const handleReloadTable = async () => {
        setOrder("asc");
        setOrderBy("mainText")
        setRowsPerPage(5)
        setCurrentPage(0);
        setBook({
            mainText: "",
            author: "",
            category: ""
        })
    }

    const handleAddNewBook = () => {
        setOpenModalAddNewBook(true);
    }

    const handleDeleteUser = async (id) => {
        const res = await callDeleteUser(id);
        if (res && res.data) {
            handleReloadTable();
            setReload(!reload);
            openToast("success", "Xóa người dùng thành công")
        }
        else {
            openToast("error", "Không thể xóa người dùng này")
        }
    }

    const openToast = (type, message,) => {
        setToast({ open: true, type: type, message, message })
    }

    const handleUpdateBook = (value) => {
        setDataUpdate(value);
        setOpenModalUpdateBook(true)
    }

    const formatPrice = value => {
        return `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return (
        <>

            <ModalAddNewBook
                open={openModalAddNewBook}
                setOpen={setOpenModalAddNewBook}
                reload={reload}
                setReload={setReload}
            />

            <ModalUpdateBook
                open={openModalUpdateBook}
                setOpen={setOpenModalUpdateBook}
                reload={reload}
                setReload={setReload}
                data={dataUpdate}
                setData={setDataUpdate}
            />

            <DetailBook book={currentBook} open={openDetailBook} setOpen={setOpenDetailBook} />

            <Box sx={{ width: '100%' }}>
                <TableContainer component={Paper}>
                    <Box sx={{ display: "flex", justifyContent: 'space-between', p: 2, borderBottom: 1 }}>
                        <Typography variant='h5'>Table List Books</Typography>
                        <Box sx={{ display: "flex", gap: 3 }}>
                            <Button variant="contained" color='primary'>
                                <ExitToAppOutlinedIcon sx={{ mr: 1 }} />
                                Export</Button>
                            <Button onClick={() => handleAddNewBook()} variant="contained" color='primary'>
                                <AddOutlinedIcon sx={{ mr: 1 }} />
                                Thêm mới</Button>
                            <IconButton onClick={handleReloadTable} color='primary' sx={{ mr: 3 }}>
                                <RefreshIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Table
                        sx={{ minWidth: 750 }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{ fontWeight: 600 }}
                                    sortDirection={orderBy === "_id" ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === "_id"}
                                        direction={orderBy === "_id" ? order : 'asc'}
                                        onClick={() => { handleRequestSort("_id") }}
                                    >
                                        Id
                                        {orderBy === "id" ? (
                                            <Box component="span" sx={visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </Box>
                                        ) : null}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: 600 }}
                                    sortDirection={orderBy === "mainText" ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === "mainText"}
                                        direction={orderBy === "mainText" ? order : 'asc'}
                                        onClick={() => { handleRequestSort("mainText") }}
                                    >
                                        Tên sách
                                        {orderBy === "mainText" ? (
                                            <Box component="span" sx={visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </Box>
                                        ) : null}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: 600 }}
                                    sortDirection={orderBy === "category" ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === "category"}
                                        direction={orderBy === "category" ? order : 'asc'}
                                        onClick={() => { handleRequestSort("category") }}
                                    >
                                        Thể loại
                                        {orderBy === "category " ? (
                                            <Box component="span" sx={visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </Box>
                                        ) : null}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: 600 }}
                                    sortDirection={orderBy === "author" ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === "author"}
                                        direction={orderBy === "author" ? order : 'asc'}
                                        onClick={() => { handleRequestSort("author") }}
                                    >
                                        Tác giả
                                        {orderBy === "author" ? (
                                            <Box component="span" sx={visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </Box>
                                        ) : null}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: 600 }}
                                    sortDirection={orderBy === "price" ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === "price"}
                                        direction={orderBy === "price" ? order : 'asc'}
                                        onClick={() => { handleRequestSort("price") }}
                                    >
                                        Giá tiền
                                        {orderBy === "price" ? (
                                            <Box component="span" sx={visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </Box>
                                        ) : null}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => {
                                return (
                                    <TableRow
                                        key={`row-${index}`}
                                        hover
                                    >
                                        <TableCell>
                                            <Button color='info' sx={{ p: 0 }} onClick={() => { handleDetailBook(row) }}>
                                                {row._id}
                                            </Button>
                                        </TableCell>
                                        <TableCell >{row.mainText}</TableCell>
                                        <TableCell >{row.category}</TableCell>
                                        <TableCell >{row.author}</TableCell>
                                        <TableCell >{formatPrice(row.price)}</TableCell>
                                        <TableCell >
                                            <IconButton sx={{ p: 0, m: 0.5 }} onClick={() => handleDeleteUser(row._id)}>
                                                <DeleteOutlinedIcon color='error' />
                                            </IconButton>
                                            <IconButton sx={{ p: 0, m: 0.5 }} onClick={() => handleUpdateBook(row)}>
                                                <EditOutlinedIcon color='warning' />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "right", mt: 3 }}>
                    <Pagination count={pages} page={currentPage + 1}
                        onChange={(event, value) => {
                            setCurrentPage(value - 1);
                        }}
                        color="primary" shape="rounded" />
                    {open ?
                        <Select
                            sx={{ width: 115 }}
                            size='small'
                            value={rowsPerPage}
                            onChange={handleOnChange}
                        >
                            <MenuItem value={1}>1 / page</MenuItem>
                            <MenuItem value={5}>5 / page</MenuItem>
                            <MenuItem value={10}>10 / page</MenuItem>
                            <MenuItem value={20}>20 / page</MenuItem>
                        </Select>
                        :
                        <></>}
                </Box>
            </Box >

        </>

    );
}
