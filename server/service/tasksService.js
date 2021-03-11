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
        let userTasks = await tasks.find(query, { _id: 0 }).toArray()
        var returnedTasks = []
        for (let index = 0; index < userTasks.length; index++) {
            const t = userTasks[index];
            let task = new Task({
                description: t.description,
                userEmail: t.userEmail,
                createdDate: t.createdDate,
                project: t.project,
                contexts: t.contexts,
                priority: t.priority
            })
            returnedTasks.push(task)
        }
        return returnedTasks
    } catch (error) {
        throw error
    }
}

