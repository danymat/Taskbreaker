const { getDB } = require('../connection/MongoConnection')
const { createError } = require('../constants/Error')
const { Task } = require('../model/Task')

const _db = getDB()
const tasks = _db.collection('tasks')

/**
 *
 * @param {import('../model/Task').Task} task
 */
exports.createTask = async (task) => {
    try {
        await tasks.insertOne(task)
    } catch (error) {
        throw new createError(401, error)
    }
}

/**
 *
 * @param {import('../model/User').User} user
 */
exports.findAllUserTasks = async (user) => {
    try {
        const query = { userUuid: user.uuid }
        let userTasks = await tasks.find(query, { _id: 0 }).toArray()
        var returnedTasks = []
        for (let index = 0; index < userTasks.length; index++) {
            const t = userTasks[index];
            let task = new Task({
                uuid: t.uuid,
                userUuid: t.userUuid,
                description: t.description,
                createdDate: t.createdDate,
                project: t.project,
                contexts: t.contexts,
                priority: t.priority
            })
            returnedTasks.push(task)
        }
        return returnedTasks
    } catch (error) {
        throw new createError(401, error)
    }
}

exports.deleteTask = async (task, email) => {
    try {
        const query = {
            description: task.description,
            project: task.project,
            contexts: task.contexts,
            priority: task.priority,
            userEmail: email
        }
        var result = await tasks.deleteOne(query)
        var count = result['deletedCount']
        return count
    } catch (error) {
        throw error
    }
}

