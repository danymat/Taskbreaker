exports.createError = class extends Error {
    /**
    * @param {String} name
    * @param {Number} status
    */
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}