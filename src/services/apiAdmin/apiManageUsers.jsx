import axios from "../../utils/axiosCustomize"

export const fetchUser = (query) => {
    return axios.get(`/api/v1/user?${query}`);
}

export const fetchAllUser = () => {
    return axios.get(`/api/v1/user`);
}