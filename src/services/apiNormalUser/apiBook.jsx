import axios from "../../utils/axiosCustomize";

export const callDetailBookById = (id) => {
    return axios.get(`/api/v1/book/${id}`)
}