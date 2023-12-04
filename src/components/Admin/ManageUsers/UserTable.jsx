import { useMemo, useState } from 'react';
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
import DetailUser from './DetailUser';
import Typography from '@mui/material/Typography';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ModalAddNewUser from './ModalAddNewUser';
import moment from 'moment-timezone';
import DragDropFileUpload from './DragDropFileUpload';
import ModalUploadFile from './ModalUploadFile';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export default function TableUser(props) {
    const { listUsers,
        currentPage, setCurrentPage,
        rowsPerPage, setRowsPerPage,
        pages, open,
        reload, setReload,
    } = props

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState("fullName");
    const [user, setUser] = useState({});
    const [openDetailUser, setOpenDetailUser] = useState(false);
    const [openModalAddNewUser, setOpenModalAddNewUser] = useState(false);
    const [openModalUploadFile, setOpenModalUploadFile] = useState(false);



    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const visibleRows = useMemo(
        () =>
            stableSort(listUsers, getComparator(order, orderBy)).slice(
                currentPage * rowsPerPage,
                currentPage * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, currentPage, rowsPerPage, listUsers],
    );

    const handleOnChange = (event) => {
        setRowsPerPage(event.target.value)
    }

    const handleDetailUser = (value) => {
        setUser(value);
        setOpenDetailUser(true);
    }

    const handleReloadTable = async () => {
        setReload(!reload);
        setCurrentPage(0);
    }



    const handleAddNewUser = () => {
        setOpenModalAddNewUser(true);
    }

    const handleImportUser = () => {
        setOpenModalUploadFile(true);
    }

    return (
        <Box sx={{ width: '100%' }}>

            <ModalUploadFile
                open={openModalUploadFile}
                setOpen={setOpenModalUploadFile} />

            <ModalAddNewUser
                open={openModalAddNewUser}
                setOpen={setOpenModalAddNewUser}
                reload={reload}
                setReload={setReload}
            />

            <DetailUser user={user} open={openDetailUser} setOpen={setOpenDetailUser} />

            <TableContainer component={Paper}>
                <Box sx={{ display: "flex", justifyContent: 'space-between', p: 2, borderBottom: 1 }}>
                    <Typography variant='h5'>Table List Users</Typography>
                    <Box sx={{ display: "flex", gap: 3 }}>
                        <Button variant="contained" color='primary'>
                            <ExitToAppOutlinedIcon sx={{ mr: 1 }} />
                            Export</Button>
                        <Button onClick={handleImportUser} variant="contained" color='primary' >
                            <FileUploadOutlinedIcon sx={{ mr: 1 }} />
                            Import</Button>
                        <Button onClick={handleAddNewUser} variant="contained" color='primary'>
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
                                sortDirection={orderBy === "id" ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === "id"}
                                    direction={orderBy === "id" ? order : 'asc'}
                                    onClick={() => { handleRequestSort("id") }}
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
                                sortDirection={orderBy === "fullName" ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === "fullName"}
                                    direction={orderBy === "fullName" ? order : 'asc'}
                                    onClick={() => { handleRequestSort("fullName") }}
                                >
                                    Tên hiển thị
                                    {orderBy === "fullName" ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: 600 }}
                                sortDirection={orderBy === "email" ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === "email"}
                                    direction={orderBy === "email" ? order : 'asc'}
                                    onClick={() => { handleRequestSort("email") }}
                                >
                                    Email
                                    {orderBy === "email " ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: 600 }}
                                sortDirection={orderBy === "phone" ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === "phone"}
                                    direction={orderBy === "phone" ? order : 'asc'}
                                    onClick={() => { handleRequestSort("phone") }}
                                >
                                    Số điện thoại
                                    {orderBy === "phone" ? (
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
                        {visibleRows.map((row, index) => {

                            return (
                                <TableRow
                                    key={`row-${index}`}
                                    hover
                                    tabIndex={-1}
                                >
                                    <TableCell>
                                        <Button color='info' sx={{ p: 0 }} onClick={() => { handleDetailUser(row) }}>
                                            {row._id}
                                        </Button>
                                    </TableCell>
                                    <TableCell >{row.fullName}</TableCell>
                                    <TableCell >{row.email}</TableCell>
                                    <TableCell >{row.phone}</TableCell>
                                    <TableCell >
                                        <IconButton sx={{ p: 0 }}>
                                            <DeleteOutlinedIcon color='error' />
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
        </Box>
    );
}
