const { tasksController } = require("../controller")
const express = require("express")

const router = express.Router()

router.post("/create", tasksController.createTask)

router.get("/", tasksController.getAllTasks)

router.put("/update/:id", tasksController.updateTask)

router.delete("/delete/:id", tasksController.deleteTask)

module.exports = router