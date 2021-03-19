const { v4: uuidv4 } = require('uuid');


const AUTHORITIES = exports.AUTHORITIES = {
    ADMIN: 'ADMIN',
    USER: 'USER'
}

exports.User = class {
    /**
     *
     * @param {Object} data
     * @param {String} data.username
     * @param {String} [data.uuid]
     * @param {String} data.email
     * @param {String} data.password
     * @param {AUTHORITIES} data.authorities
     * @param {Number} [data.created]
     */
    constructor(data) {
        this.username = data.username || '';
        this.uuid = data.uuid || uuidv4();
        this.email = data.email || '';
        this.password = data.password;
        this.created = data.created || Date.now();
        this.authorities = data.authorities
    }
}
