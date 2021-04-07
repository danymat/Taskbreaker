const { createError } = require('../constants/Error')
const { Task } = require('../model/Task')
const tasksService = require('../service/tasksService')
const contextsService = require('../service/contextsService')
const projectsService = require('../service/projectsService')
const { Context } = require('../model/Context')
const { Project } = require('../model/Project')


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
        let projects = await projectsService.findAllUserProjects(res.locals.user)
        let contexts = await contextsService.findAllUserContexts(res.locals.user)
        res.status(200).json({
            message: "All user tasks",
            data: {
                tasks: tasks,
                projects: projects,
                contexts: contexts
            }
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
            createdDate: Date.now(),
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

/**
 * @summary delete a task
 *
 * Must be called after getUserFromDecoded
 * @typedef {Object} userLocals
 * @property {import('../model/User').User} user

 *
 * @param {import('express').Request} req
 * @param {import('express').Response<{}, userLocals>} res
 */
exports.deleteTask = async (req, res) => {
    try {
        const neededKeys = ['uuid'];

        if (!neededKeys.every(key => Object.keys(req.body).includes(key))) {
            throw new createError(401, "Missing arguments")
        }
        let count_delete = await tasksService.deleteTask(req.body.uuid, res.locals.user.uuid)
        res.status(200).json({
            message: "Task deleted",
            count: count_delete
        })
    } catch (error) {
        res.status(error.status).json({
            message: error.message
        })
    }
}

/**
 * @summary Create a new context
 *
 * Must be called after getUserFromDecoded
 * @typedef {Object} userLocals
 * @property {import('../model/User').User} user

 *
 * @param {import('express').Request} req
 * @param {import('express').Response<{}, userLocals>} res
 */
 exports.createContext = async (req, res) => {
    try {
        const neededKeys = ['context'];
        if (!neededKeys.every(key => Object.keys(req.body).includes(key))) {
            throw new createError(401, "Missing arguments")
        }
        if (req.body.context == "" || req.body.context == 'Maybe' || req.body.context == 'Waiting For') {
            throw new createError(401, "Incorrect Name")
        }
        let context = new Context({
            userUuid: res.locals.user.uuid,
            title: req.body.context
        })
        await contextsService.createContext(context)
        res.status(200).json({
            message: "Context created",
            context: context
        })
    } catch (error) {
        res.status(error.status).json({
            message: error.message
        })
    }
}

/**
 * @summary Complete a task
 *
 * Must be called after getUserFromDecoded
 * @typedef {Object} userLocals
 * @property {import('../model/User').User} user

 *
 * @param {import('express').Request} req
 * @param {import('express').Response<{}, userLocals>} res
 */
exports.completeTask = async (req, res) => {
    try {
        const neededKeys = ['uuid'];

        if (!neededKeys.every(key => Object.keys(req.body).includes(key))) {
            throw new createError(401, "Missing arguments")
        }
        await tasksService.completeTask(req.body.uuid, res.locals.user.uuid)
        res.status(200).json({
            message: "Task completed"
        })
    } catch (error) {
        res.status(error.status).json({
            message: error.message
        })
    }
}

/**
 * @summary Get all user projects
 *
 * Must be called after getUserFromDecoded
 * @typedef {Object} userLocals
 * @property {import('../model/User').User} user

 *
 * @param {import('express').Request} req
 * @param {import('express').Response<{}, userLocals>} res
 */
 exports.getProjects = async (req, res) => {
    try {
        let projects = await projectsService.findAllUserProjects(res.locals.user)
        res.status(200).json({
            message: "User contexts",
            projects: projects
        })
    } catch (error) {
        res.status(error.status).json({
            message: error.message
        })
    }
}

/**
 * @summary Create a new project
 *
 * Must be called after getUserFromDecoded
 * @typedef {Object} userLocals
 * @property {import('../model/User').User} user

 *
 * @param {import('express').Request} req
 * @param {import('express').Response<{}, userLocals>} res
 */
 exports.createProject = async (req, res) => {
    try {
        const neededKeys = ['project'];
        if (!neededKeys.every(key => Object.keys(req.body).includes(key))) {
            throw new createError(401, "Missing arguments")
        }
        let project = new Project({
            userUuid: res.locals.user.uuid,
            title: req.body.project
        })
        await projectsService.createProject(project)
        res.status(200).json({
            message: "Project created",
            project: project
        })
    } catch (error) {
        res.status(error.status).json({
            message: error.message
        })
    }
}
