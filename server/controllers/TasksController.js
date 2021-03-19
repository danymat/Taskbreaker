const { createError } = require('../constants/Error')
const { Task } = require('../model/Task')
const tasksService = require('../service/tasksService')


/**
 * @summary Return all of the user tasks
 *
 * Must be called after getUserFromDecoded
 * @typedef {Object} userLocals
 * @property {import('../model/User').User} user

 *
 * @param {import('express').Request} req
 * @param {import('express').Response<{}, userLocals>} res
 */
 exports.getAllUserTasks = async (req, res) => {
    try {
        let tasks = await tasksService.findAllUserTasks(res.locals.user)
        res.status(200).json({
            message: "All user tasks",
            tasks: tasks
        })
    } catch (error) {
        res.status(error.status).json({
            message: error.message
        })
    }
}

/**
 * @summary Create a new task
 *
 * Must be called after getUserFromDecoded
 * @typedef {Object} userLocals
 * @property {import('../model/User').User} user

 *
 * @param {import('express').Request} req
 * @param {import('express').Response<{}, userLocals>} res
 */
exports.createTask = async (req, res) => {
    try {
        const neededKeys = ['description'];

        if (! neededKeys.every(key => Object.keys(req.body).includes(key)) ) {
            throw new createError(401, "Missing arguments")
        }
        //TODO verify contexts, project priority, description
        let task = new Task({
            description: req.body.description,
            userUuid: res.locals.user.uuid,
            createdDate: new Date(),
            project: req.body.project,
            contexts: req.body.contexts,
            priority: req.body.priority
        })
        await tasksService.createTask(task)
        res.status(200).json({
            message: "Task created",
            task: task
        })

    } catch (error) {
        res.status(error.status).json({
            message: error.message
        })
    }
}