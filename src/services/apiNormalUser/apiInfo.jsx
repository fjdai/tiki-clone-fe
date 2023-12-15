import axios from "../../utils/axiosCustomize";

export const callUploadAvt = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", fileImg);
    return axios({
        method: "post",
        url: "/api/v1/file/upload",
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "avatar"
        },
    })
}

export const callUpdateUserInfo = (_id, phone, fullName, avatar) => {
    return axios.put(`/api/v1/user`, { _id, phone, fullName, avatar })
}

export const changePassword = (email, oldpass, newpass) => {
    return axios.post(`/api/v1/user/change-password`, { email, oldpass, newpass });
}