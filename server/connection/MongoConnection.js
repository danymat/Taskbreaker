const MongoClient = require('mongodb').MongoClient;
exports.defaultUri = process.env.LOCAL == 'True' ? "mongodb://127.0.0.1:27017" :
"mongodb+srv://admin:jTlMqF2WzheOlnFz@cluster0.rk83u.mongodb.net/test_taskbreaker_db2?retryWrites=true&w=majority"

let client;

/**
 * @type {import('mongodb').Db}
 */
let _db;

exports.connectToMongoAtlas = async (uri) => {
    try {
        client = new MongoClient(uri, { useUnifiedTopology: true });
        await client.connect()
        _db = client.db()
    } catch (e) {
        throw e
    }
}

exports.getDB = () => { return _db }

exports.closeDB = async () => { await client.close() }