import axios from 'axios'
import {store} from '@/redux/store'
axios.defaults.baseURL = 'https://backoffice.nodemy.vn/api'
axios.defaults.headers['Content-Type'] = 'application/json'
axios.interceptors.request.use(config => {
    let token = store.getState().auth.token
    config.headers['Authorization'] = `Bearer ${token}`
    return config
}) 