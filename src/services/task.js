import axios from "axios";
import dayjs from 'dayjs';
export const getTasks = async (page, pageSize , signal) => {
    const response = await axios.get(`/tasks?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=createdAt:desc`, {signal});
    return response.data;
}

export const createTask = async (title) => {
    const response = await axios.post(`/tasks`, {
        "data": {
            "title": title,
            "date": new Date()
        }
    });
    return response.data;
}

export const updateTask = async (title) => {
    const response = await axios.post(`/tasks`, {
        "data": {
            "title": title
        }
    });
    return response.data;
}

