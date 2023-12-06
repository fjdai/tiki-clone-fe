import axios from "../../utils/axiosCustomize"

export const callListBook = (current, limit, sort, mainText, author, category) => {
    return axios.get(`/api/v1/book?current=${current}&pageSize=${limit}&sort=${sort}&mainText=/${mainText}/i&author=/${author}/i&category=/${category}/i`);
}


export const callBookCategory = () => {
    return axios.get("/api/v1/database/category");
}

export const callUploadBookImg = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "book"
        },
    });
}


export const callDeleteBookImg = () => {
    return axios.post("/api/v1/file/delete-image");
}


export const callCreateNewBook = (data) => {
    return axios.post("/api/v1/book", data);
}