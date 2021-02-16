const { getDB } = require('../connection/MongoConnection')
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
        throw error
    }

}

/**
 *
 * @param {import('../model/User').User} user
 */
exports.findAllUserTasks = async (user) => {
    try {
        const query = { userEmail: user.email }
        return await tasks.find(query).toArray()
    } catch (error) {
        throw error
    }
}

