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
        pages,
    } = props

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState("fullName");




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

    return (
        <Box sx={{ width: '100%' }}>
            <TableContainer component={Paper}>
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
                                        {row._id}
                                    </TableCell>
                                    <TableCell >{row.fullName}</TableCell>
                                    <TableCell >{row.email}</TableCell>
                                    <TableCell >{row.phone}</TableCell>
                                    <TableCell ><button>ad</button></TableCell>
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
            </Box>
        </Box>
    );
}
