const { getDB } = require('../connection/MongoConnection')
const _db = getDB()
const projects = _db.collection('projects')
const { Project } = require('../model/Project')


/**
 *
 * @param {import('../model/Project').Project} project
 */
exports.createProject = async (project) => {
    try {
        await projects.insertOne(project)
    } catch (error) {
        throw error
    }
}

/**
 *
 * @param {import('../model/User').User} user
 */
 exports.findAllUserProjects = async (user) => {
    try {
        const query = { userUuid: user.uuid }
        let userProjects = await projects.find(query, { _id: 0 }).toArray()
        var returnedProjects = []
        for (let index = 0; index < userProjects.length; index++) {
            const c = userProjects[index];
            let project = new Project({
                uuid: c.uuid,
                userUuid: c.userUuid,
                title: c.title
            })
            returnedProjects.push(project)
        }
        return returnedProjects
    } catch (error) {
        throw new createError(401, error)
    }
}


