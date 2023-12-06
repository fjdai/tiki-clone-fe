import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const FormSearch = (props) => {
    const { setCurrentPage, setBook } = props;

    const [data, setData] = useState({
        mainText: "",
        author: "",
        category: ""
    })

    const handleOnChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    }

    const handleClearBook = () => {
        setData({
            mainText: "",
            author: "",
            category: ""
        });
        setBook({
            mainText: "",
            author: "",
            category: ""
        });
        // setCurrentPage(0);
    }

    const handleSearchBook = () => {
        setBook(data);
        setCurrentPage(0);
    }

    return (
        <>
            <Box component={Paper} sx={{ display: 'flex', flexDirection: "column", mb: 5, padding: 2.5, gap: 2.5 }}>
                <Box sx={{ ml: 3.5 }}>
                    <Typography variant='h4'>Filter</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: "space-around" }}>
                    <TextField
                        onChange={(event) => handleOnChange(event)}
                        label="Tên sách"
                        value={data.mainText}
                        name="mainText"
                        type='text'
                        sx={{ width: 400 }}
                        autoComplete='off'
                    />
                    <TextField
                        value={data.author}
                        label="Tác giả"
                        onChange={(event) => handleOnChange(event)}
                        name="author"
                        type='text'
                        autoComplete='off'
                        sx={{ width: 400 }}

                    />
                    <TextField
                        value={data.category}
                        label="Thể loại"
                        onChange={(event) => handleOnChange(event)}
                        name="category"
                        type='text'
                        autoComplete='off'
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
                        onClick={handleSearchBook}
                    >
                        Search
                    </Button>
                    <Button
                        sx={{ width: 100 }}
                        color='primary'
                        variant="outlined"
                        onClick={handleClearBook}

                    >
                        Clear
                    </Button>
                </Box>
            </Box >
        </>
    )
}

export default FormSearch;