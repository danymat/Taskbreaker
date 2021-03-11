const AUTHORITIES = exports.AUTHORITIES = {
    ADMIN: 'ADMIN',
    USER: 'USER'
}

exports.User = class {
    /**
     *
     * @param {Object} data
     * @param {String} data.username
     * @param {String} data.email
     * @param {String} data.password
     * @param {AUTHORITIES} data.authorities
     * @param {Number} [data.created]
     */
    constructor(data) {
        this.username = data.username || '';
        this.email = data.email || '';
        this.password = data.password;
        this.created = data.created || Date.now();
        this.authorities = data.authorities
    }
}
