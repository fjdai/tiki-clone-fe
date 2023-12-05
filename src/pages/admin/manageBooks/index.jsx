import { useEffect, useState } from "react";
import FormSearch from "../../../components/Admin/ManageBooks/FormSearch";
import BookTable from "../../../components/Admin/ManageBooks/BookTable";

const ManageBooks = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [pages, setPages] = useState(1);

    const [open, setOpen] = useState(true);

    const [book, setBook] = useState({
        mainText: "",
        author: "",
        category: ""
    });

    return (
        <>
            <FormSearch
                setCurrentPage={setCurrentPage}
                setBook={setBook}
            />
            <BookTable
                pages={pages}
                setPages={setPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                book={book}
                setBook={setBook}
                open={open}
            />
        </>
    )
}

export default ManageBooks;