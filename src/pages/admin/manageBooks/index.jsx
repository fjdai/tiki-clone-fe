import { useEffect, useState } from "react";
import FormSearch from "../../../components/Admin/ManageBooks/FormSearch";
import UserTable from "../../../components/Admin/ManageBooks/UserTable";
import { fetchAllUser, fetchUser } from "../../../services/apiAdmin/apiManageUsers";

const ManageBooks = () => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [pages, setPages] = useState(1);
    const [reload, setReload] = useState(true);

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: ""

    })

    const [open, setOpen] = useState(true);

    const countPages = async () => {
        const query = `pageSize=${rowsPerPage}&current=${currentPage + 1}`;
        const res = await fetchUser(query);
        if (res && res.data) {
            setPages(res.data.meta.pages);
        }
    }

    const countPageSearch = async () => {
        const query = `fullName=/${user.name}/i&pageSize=${rowsPerPage}&current=${currentPage + 1}&email=/${user.email}/i&phone=/${user.phone}/i`;
        const res = await fetchUser(query);
        if (res && res.data) {
            setPages(res.data.meta.pages);
        }
    }

    useEffect(() => {
        countPages();
    }, [rowsPerPage, reload])

    const fetchListUser = async () => {
        const res = await fetchAllUser();
        if (res && res.data) {
            setListUsers(res.data);
        }
    }

    useEffect(() => {
        fetchListUser();
    }, [reload])

    return (
        <>
            <FormSearch
                setListUsers={setListUsers}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setPages={setPages}
                user={user}
                setUser={setUser}
                countPageSearch={countPageSearch}
                setOpen={setOpen}
            />
            <UserTable
                reload={reload}
                setReload={setReload}
                pages={pages}
                setPages={setPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                listUsers={listUsers}
                setListUsers={setListUsers}
                open={open}
            />
        </>
    )
}

export default ManageBooks;