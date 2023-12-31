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
import { callBookCategory, callDeleteBook, callListBook } from "../../../services/apiAdmin/apiManageBooks";
import ModalAddNewBook from "./ModalAddNewBook";
import ModalUpdateBook from "./ModalUpdateBook";
import { toast } from "react-toastify";
import _ from "lodash"

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
    const [listCategory, setListCategory] = useState([]);


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

    useEffect(() => {
        fetchCategory();
    }, [])

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

    const handleReloadTable = () => {
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

    const handleDeleteBook = async (id) => {
        const res = await callDeleteBook(id);
        if (res && res.data) {
            handleReloadTable();
            setReload(!reload)
            toast.success("Xóa sách thành công");
        }
        else {
            toast.error("Không thể xóa sách này")
        }
    }

    const handleUpdateBook = (value) => {
        setDataUpdate(value);
        setOpenModalUpdateBook(true)
    }

    const formatPrice = value => {
        return `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const handleExportBook = () => {
        if (rows.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(rows);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "ExportBook.csv");
        }
    }

    const fetchCategory = async () => {
        const res = await callBookCategory();
        if (res && res.data) {
            setListCategory(res.data);
        }
    }

    console.log(rows);


    return (
        <>

            <ModalAddNewBook
                open={openModalAddNewBook}
                setOpen={setOpenModalAddNewBook}
                reload={reload}
                setReload={setReload}
                listCategory={listCategory}

            />

            {!_.isEmpty(dataUpdate) &&
                <ModalUpdateBook
                    open={openModalUpdateBook}
                    setOpen={setOpenModalUpdateBook}
                    data={dataUpdate}
                    setData={setDataUpdate}
                    listCategory={listCategory}
                />
            }

            <DetailBook book={currentBook} open={openDetailBook} setOpen={setOpenDetailBook} />

            <Box sx={{ width: '100%' }}>
                <TableContainer component={Paper}>
                    <Box sx={{ display: "flex", justifyContent: 'space-between', p: 2, borderBottom: 1 }}>
                        <Typography variant='h5'>Table List Books</Typography>
                        <Box sx={{ display: "flex", gap: 3 }}>
                            <Button onClick={() => handleExportBook()} variant="contained" color='primary'>
                                <ExitToAppOutlinedIcon sx={{ mr: 1 }} />
                                Export</Button>
                            <Button onClick={() => handleAddNewBook()} variant="contained" color='primary'>
                                <AddOutlinedIcon sx={{ mr: 1 }} />
                                Thêm mới</Button>
                            <IconButton onClick={handleReloadTable} sx={{ color: 'text.icon', mr: 3 }} >
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
                            {_.isEmpty(rows) ?
                                <TableRow sx={{ height: 200 }}>
                                    <TableCell colSpan={6} align="center" >
                                        <Typography variant="h5">
                                            No records found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                :
                                <></>
                            }
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
                                            <IconButton sx={{ p: 0, m: 0.5 }} onClick={() => handleDeleteBook(row._id)}>
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
