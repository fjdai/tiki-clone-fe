import { useCallback, useState } from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import templateFile from "./template.xlsx?url"
function DragDropFileUpload({ onFileUpload }) {
    const [dragOver, setDragOver] = useState(false);

    const handleDragOver = useCallback((event) => {
        event.preventDefault();
        setDragOver(true);
    }, []);

    const handleDragLeave = useCallback((event) => {
        event.preventDefault();
        setDragOver(false);
    }, []);

    const handleDrop = useCallback(
        (event) => {
            event.preventDefault();
            setDragOver(false);
            if (event.dataTransfer.files && event.dataTransfer.files[0]) {
                onFileUpload(event.dataTransfer.files[0]);
                setFlag(!flag);
            }
        },
        [onFileUpload]
    );

    const handleChange = useCallback(
        (event) => {
            if (event.target.files && event.target.files[0]) {
                onFileUpload(event.target.files[0]);
                event.target.value = null;
            }
        },
        [onFileUpload]
    );


    return (
        <Paper
            variant="outlined"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
                border: dragOver ? '2px dashed #000' : '2px dashed #aaa',
                padding: 20,
                textAlign: 'center',
                cursor: 'pointer',
                background: dragOver ? '#eee' : '#fafafa',
            }}
        >
            <input
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                style={{ display: 'none' }}
                id="raised-button-file"
                // multiple
                type="file"
                onChange={handleChange}

            />
            <label htmlFor="raised-button-file">
                <Box display="flex" flexDirection="column" alignItems="center">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <CloudUploadIcon style={{ fontSize: 60 }} />
                    </IconButton>
                    <Typography variant='h5'>Drag and drop files here or click to select files</Typography>
                    <Typography sx={{ color: "#808080" }}>Support for a single upload. Only accept .csv, .xls, .xlsx or <a style={{ textDecoration: "none" }} download onClick={e => e.stopPropagation()} href={templateFile} >Download Sample File</a></Typography>

                </Box>
            </label>
        </Paper>
    );
}

export default DragDropFileUpload;