import axios from "axios";
import { upload } from '@/services/upload'
export const getTasksComplete = async (page, pageSize , signal) => {
    const response = await axios.get(`/tasks?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[complete]=true&sort[0]=createdAt:desc`, {signal});
    return response.data;
}
export const getTasksUnComplete = async (page, pageSize , signal) => {
    const response = await axios.get(`/tasks?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[complete]=false&sort[0]=createdAt:desc`, {signal});
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

export const updateTask = async (id, newTask) => {
    const response = await axios.put(`/tasks/${id}`, {
        "data": {
            "title": newTask.title,
            "complete": newTask.complete,
            "date": newTask.date
        }
    });
    return response.data;
}

export const deleteTask = async (id) => {
    const response = await axios.delete(`/tasks/${id}`);
    return response.data;
}

export const addImgTask = async (file, idTask) => {
    const response = await upload(file, 'api::task.task', idTask, 'image')
    return response.data;
}

