import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { fetchAllUser, fetchUser } from '../../../services/apiAdmin/apiManageUsers';

const FormSearch = (props) => {
    const { countPageSearch, user, setUser, setCurrentPage, setListUsers, setPages } = props;


    const handleOnChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    const handleClearUser = async () => {
        setUser({
            name: "",
            email: "",
            phone: ""

        });
        const query = `pageSize=${5}&current=${1}`;
        const res = await fetchAllUser();
        const count = await fetchUser(query);
        if (res && res.data && count && count.data) {
            setListUsers(res.data);
            setPages(count.data.meta.pages)
        }
    }

    const handleSearchUserPages = async () => {
        const queryList = `fullName=/${user.name}/i&pageSize=10000&current=1&email=/${user.email}/i&phone=/${user.phone}/i`;
        const list = await fetchUser(queryList);
        if (list && list.data) {
            setListUsers(list.data.result);
            countPageSearch()
            setCurrentPage(0);
        }
    }

    return (
        <>
            <Box component={Paper} sx={{ display: 'flex', flexDirection: "column", mb: 5, padding: 3, gap: 3 }}>
                <Box sx={{ ml: 3.5 }}>
                    <Typography variant='h4'>Filter</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: "space-around" }}>
                    <TextField
                        autoFocus
                        onChange={(event) => handleOnChange(event)}
                        label="Tên hiển thị"
                        autoComplete='off'
                        value={user.name}
                        name="name"
                        type='text'
                        sx={{ width: 400 }}
                    />
                    <TextField
                        value={user.email}
                        autoComplete='off'
                        label="Email"
                        onChange={(event) => handleOnChange(event)}
                        name="email"
                        type='text'
                        sx={{ width: 400 }}

                    />
                    <TextField
                        value={user.phone}
                        autoComplete='off'
                        label="Số điện thoại"
                        onChange={(event) => handleOnChange(event)}
                        name="phone"
                        type='text'
                        sx={{ width: 400 }}

                    />
                </Box>
                <Box
                    sx={{ display: "flex", justifyContent: "flex-end", px: 3.7, gap: 3 }}
                >
                    <Button
                        sx={{ width: 100 }}
                        variant="contained"
                        color='primary'
                        onClick={handleSearchUserPages}
                    >
                        Search
                    </Button>
                    <Button
                        sx={{ width: 100 }}
                        color='primary'
                        variant="outlined"
                        onClick={handleClearUser}

                    >
                        Clear
                    </Button>
                </Box>
            </Box >
        </>
    )
}

export default FormSearch;