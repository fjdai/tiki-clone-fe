import axios from "../utils/axiosCustomize";

const postRegister = (fullName, email, password, phone) => {
    return axios.post("/api/v1/user/register", { fullName, email, password, phone });
}

export { postRegister } 