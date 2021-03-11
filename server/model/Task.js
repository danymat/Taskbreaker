const { createError } = require("../constants/Error")

const CONTEXT = module.exports.CONTEXT = {
    HOME: 'home',
    WORK: 'work'
}

exports.Task = class {
    /**
     *
     * @param {Object} data
     * @param {String} data.description
     * @param {Number} data.userEmail
     * @param {String} [data.project]
     * @param {CONTEXT[]} [data.contexts]
     * @param {Number} [data.priority]
     * @param {Number} [data.createdDate]
     */
    constructor(data) {
        data.priority = data.priority || null
        let range = [...Array(3).keys(), null]
        if (!range.includes(data.priority)) {

            throw new createError(401, `Priority must be in (${range})`)
        }
        this.description = data.description
        this.userEmail = data.userEmail
        this.priority = data.priority || null
        this.project = data.project || null
        this.contexts = data.contexts || []
        this.createdDate = data.createdDate || Date.now()
        this.completionDate = null
        this.optionals = {}
    }

    get completed() {
        return this.completionDate != null
    }

    /**
     *
     * @param {Date} date
     */
    createDueDate(date) {
        this.optionals.due = date.getTime()
    }

}





