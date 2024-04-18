import axiosInstance from "./axios.service";

const loginAPI = async (email, password) => {
    const res = await axiosInstance.post("login ", { email, password })

    return res.data
}

const forgotAPI = async (email) => {
    const res = await axiosInstance.post("auth/forgot-password ", { email })

    return res.data.data
}

const resetAPI = async (token, password, confirmPassword) => {
    const res = await axiosInstance.put("auth/reset-password ", { token, password, confirmPassword })

    return res.data.data
}

const userAPI = async (username, email, password, roleName, facultyName) => {
    const res = await axiosInstance.post("register ", { username, email, password, roleName, facultyName })

    return res.data.data
}

const uploadAPI = async (user, faculty, originalname, filename) => {
    const res = await axiosInstance.post("upload ", { user, faculty, originalname, filename })

    return res.data.data
}

const getserviceAPI = async (name, description, minPrice, maxPrice) => {
    const res = await axiosInstance.get("/services ", { name, description, minPrice, maxPrice })

    return res.data.data
}

const updateUser = async (url, data) => {
    const res = await axiosInstance.put(url, data)

    return res.data.data
}

export { loginAPI, userAPI, forgotAPI, resetAPI, getserviceAPI, updateUser, uploadAPI };


