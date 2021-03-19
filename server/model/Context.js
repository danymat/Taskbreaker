const { v4: uuidv4 } = require('uuid');
const { createError } = require('../constants/Error');

exports.Context = class {
    /**
     *
     * @param {Object} data
     * @param {String} [data.uuid]
     * @param {String} data.userUuid
     * @param {String} data.title
     */
    constructor(data) {
        if (data.title == null) {
            throw new createError(401, 'Context name cannot be empty')
        }
        this.uuid = data.uuid || uuidv4();
        this.title = data.title;
        this.userUuid = data.userUuid;
    }
}