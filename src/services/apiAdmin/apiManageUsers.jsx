import axios from "../../utils/axiosCustomize"

export const fetchUser = (query) => {
    return axios.get(`/api/v1/user?${query}`);
}

export const fetchAllUser = () => {
    return axios.get(`/api/v1/user`);
}

export const createUser = (fullName, password, email, phone) => {
    return axios.post(`/api/v1/user`, { fullName, password, email, phone });
}

export const callBulkCreateUser = (data) => {
    return axios.post(`/api/v1/user/bulk-create`, data);
}

export const callDeleteUser = (id) => {
    return axios.delete(`/api/v1/user/${id}`);
}

export const callUpdateUser = (_id, fullName, phone) => {
    return axios.put("/api/v1/user", { _id, fullName, phone })
}