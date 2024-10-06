const DB_MODELS = require("../model")

const createTask = async (title, desciption, status) => {
    try {
        const task = new DB_MODELS.TASK({
            title: title,
            description: desciption,
            status: status,
        })

        await task.save()
        return task
    } catch (error) {
        console.error("Error creating task: ", error)
        throw new Error("Error creating task: "+error.message)
    }
}

const getTasks = async () => {
    try {
        const tasks = await DB_MODELS.TASK.find();

        return tasks;
    } catch (error) {
        console.log("Error getting tasks: ", error)
        throw new Error("Error getting tasks"+error.message)
    }
}

const updateTask = async (id, updateObject) => {
    try {
        const updatedTask = await DB_MODELS.TASK.findByIdAndUpdate(id, updateObject);

        return updatedTask;
    } catch (error) {
        console.log("Error updating task: ", error)
        throw new Error("Error updating task: "+error.message)
    }
}

const deleteTask = async (id) => {
    try {
        const deleteTask = await DB_MODELS.TASK.findByIdAndDelete(id);

        return deleteTask;
    } catch (error) {
        console.log("Error deleting task: ", error)
        throw new Error(
            "Error deleting task with id: " + id + ". " + error.message
        )
    }
}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
}