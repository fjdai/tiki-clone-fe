import { useEffect, useState } from "react";
import FormSearch from "../../../components/Admin/ManageUsers/FormSearch";
import UserTable from "../../../components/Admin/ManageUsers/UserTable";
import { fetchAllUser, fetchUser } from "../../../services/apiAdmin/apiManageUsers";

const ManageUsers = () => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [pages, setPages] = useState(1);

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
    }, [rowsPerPage])

    const fetchListUser = async () => {
        const res = await fetchAllUser();
        if (res && res.data) {
            setListUsers(res.data);
        }
    }

    useEffect(() => {
        fetchListUser();
    }, [])

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
                pages={pages}
                setPages={setPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                listUsers={listUsers}
                open={open}
            />
        </>
    )
}

export default ManageUsers;