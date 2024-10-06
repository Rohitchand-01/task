import {useState} from "react";
import axios from "axios";
import { axios_instance } from "../lib/axios";

const useTask = () => {
    const [taskLoading, setTaskLoading] = useState(false);

    const getTasks = async (callback) => {
        try {
            setTaskLoading(true);
            const response = await axios_instance.get("/tasks");
            
            if (![200, 201].includes(response?.status || response?.data?.status)) {
                console.log(
                    `Error fetching tasks: ${error?.message || response?.data?.error}`
                )
            }

            callback(response?.data, null)
        } catch (error) {
            console.log(
                `Error fetching tasks: ${error?.message || response?.data?.error}`
            )
            callback(null, error)
        } finally {
            setTaskLoading(false);
        }
    }

    const addTask = async (payload, callback) => {
        try {
            setTaskLoading(true);
            const response = await axios_instance.post("/tasks/create", payload);

            if (![200,201].includes(response?.status || response?.data?.status)) {
                console.log(
                    `Error adding task: ${error?.message || response?.data?.error}`
                )
            }

            callback(response?.data, null)
        } catch (error) {
            console.log(
                `Error adding task: ${error?.message || response?.data?.error}`
            )
            callback(null, error)
        } finally {
            setTaskLoading(false);
        }
    }

    const updateTask = async (payload, id, callback) => {
        try {
            setTaskLoading(true);
            const response = await axios_instance.put(`/tasks/update/${id}`, payload);
            
            if (![200,201].includes(response?.status || response?.data?.status)) {
                console.log(
                    `Error updating task: ${error?.message || response?.data?.error}`
                )
            }
            
            callback(response?.data, null)
        } catch (error) {
            console.log(
                `Error updating task: ${error?.message || response?.data?.error}`
            )
            callback(null, error)
        } finally {
            setTaskLoading(false);
        }
    }

    const deleteTask = async (id, callback) => {
        try {
            setTaskLoading(true);
            const response = await axios_instance.delete(`/tasks/delete/${id}`);

            if (![200,201].includes(response?.status || response?.data?.status)) {
                console.log(
                    `Error deleting task: ${error?.message || response?.data?.error}`
                )
            }

            callback(response?.data, null);
        } catch (error) {
            console.log(`Error deleting task: ${error?.message || response?.message}`)
            callback(null, error);
        } finally {
            setTaskLoading(false);
        }
    }

    return {
        getTasks,
        addTask,
        updateTask,
        deleteTask,
        taskLoading,
    }
}

export default useTask