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

function createData(id, name, email, phone) {
    return {
        id,
        name,
        email,
        phone,
    };
}

const rows = [
    createData(1, "d", "phangiadaizxc@gmail.com", 63),
    createData(2, "a", "adaizxc@gmail.com", 3),
    createData(3, "b", "phangiadzxc@gmail.com", 5),
    createData(4, "c", "iadaizxc@gmail.com", 6),


];

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


export default function TableUser() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState("name");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

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
                                sortDirection={orderBy === "name" ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === "name"}
                                    direction={orderBy === "name" ? order : 'asc'}
                                    onClick={() => { handleRequestSort("name") }}
                                >
                                    Tên hiển thị
                                    {orderBy === "name" ? (
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
                        {visibleRows.map((row) => {

                            return (
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                >
                                    <TableCell>
                                        {row.id}
                                    </TableCell>
                                    <TableCell >{row.name}</TableCell>
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
                <Pagination count={13} page={page + 1}
                    onChange={(event, value) => {
                        setPage(value - 1);
                    }}
                    color="primary" shape="rounded" />
                <Select
                    sx={{ width: 115 }}
                    size='small'
                    value={rowsPerPage}
                    onChange={event => {
                        setRowsPerPage(event.target.value)
                    }}
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
