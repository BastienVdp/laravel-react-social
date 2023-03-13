import axios from "axios"
import router from "./router"

const axiosClient = axios.create({
    baseURL: `http://laravel-react-social.test/api`
})

axiosClient.interceptors.request.use(config => {
    // config.headers.post["Access-Control-Allow-Origin"] = "*"
    config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`
    return config
})

axiosClient.interceptors.response.use(response => response, error => {
    if(error.response?.status === 401) {
        localStorage.clear()
        router.navigate('/login')
        return error
    }
    throw error
})

export default axiosClient
