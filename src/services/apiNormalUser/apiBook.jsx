import axios from "../../utils/axiosCustomize";

export const callDetailBookById = (id) => {
    return axios.get(`/api/v1/book/${id}`)
}

export const callOrder = (data) => {
    return axios.post(`/api/v1/order`, data)
}

export const callHistory = () => {
    return axios.get(`/api/v1/history`);
}