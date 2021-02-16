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
     * @param {Number} [data.completionDate]
     * @param {Number} [data.priority]
     */
    constructor(data) {
        let range = [...Array(3).keys(), undefined]
        if (!range.includes(data.priority)) {
            throw Error(`Priority must be in (${range})`)
        }
        this.description = data.description
        this.userEmail = data.userEmail
        this.priority = data.priority || null
        this.project = data.project || null
        this.contexts = data.contexts
        this.createdDate = Date.now()
        this.completionDate = null
        this.optionals = { }

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





