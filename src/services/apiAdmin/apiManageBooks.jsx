import axios from "../../utils/axiosCustomize"

export const callListBook = (current, limit, sort, mainText, author, category) => {
    return axios.get(`/api/v1/book?current=${current}&pageSize=${limit}&sort=${sort}&mainText=/${mainText}/i&author=/${author}/i&category=/${category}/i`);
}
