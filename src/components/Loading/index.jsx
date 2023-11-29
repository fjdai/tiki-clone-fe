import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
    return (
        <div className='loading-container' style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress size="7rem" />
        </div>
    )
}

export default Loading;