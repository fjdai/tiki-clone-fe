import { useCallback } from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
function FileUpload(props) {
    const { onFileUpload } = props;
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
            style={{
                display: "flex",
                width: 150,
                height: 150,
                border: '2px dashed #aaa',
                padding: 20,
                borderRadius: 15,
                textAlign: 'center',
                cursor: 'pointer',
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                multiple={false}
                onChange={handleChange}

            />
            <label htmlFor="raised-button-file">
                <Box display="flex" flexDirection="column" alignItems="center">
                    <IconButton color="primary" component="span">
                        <AddIcon style={{ fontSize: 35 }} />
                    </IconButton>
                    <Typography >Upload</Typography>
                </Box>
            </label>
        </Paper>
    );
}

export default FileUpload;