const { taskService } = require("../service")

const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        if (!title ||!description ||!status) {
            return res.status(400).json({ message: "Title and description are required" });
        }
        const newTask = await taskService.createTask(title, description, status);
        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating task"+error.message });
    }
}

const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getTasks()
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting tasks"+error.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Task id is required" });
        }
        const { title, description, status } = req.body;
        const updatedTask = await taskService.updateTask(id, { title, description, status });
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating task"+error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Task id is required" });
        }
        const deletedTask = await taskService.deleteTask(id);

        res.json(deletedTask)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting task"+error.message });
    }
}

module.exports = {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
}