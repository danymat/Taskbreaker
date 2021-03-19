const { createError } = require("../constants/Error")
const { v4: uuidv4 } = require('uuid');

const CONTEXT = ['home', 'work']

exports.Task = class {
        /**
         *
         * @param {Object} data
         * @param {String} data.userUuid
         * @param {String} data.description
         * @param {String} [data.project]
         * @param {CONTEXT[]} [data.contexts]
         * @param {Number} [data.priority]
         * @param {Number} [data.createdDate]
         * @param {Number} [data.uuid]
         */
        constructor(data) {
            data.priority = data.priority || null
            let range = [...Array(3).keys(), null]
            if (!range.includes(data.priority)) {
                throw new createError(401, `Priority must be in (${range})`)
            }
            this.uuid = data.uuid || uuidv4();
            this.description = data.description
            this.userUuid = data.userUuid
            this.priority = data.priority || null
            this.project = data.project || null
            this.contexts = data.contexts || []
            this.createdDate = data.createdDate || Date.now()
            this.completionDate = data.completionDate || null
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





