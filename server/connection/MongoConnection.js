const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:jTlMqF2WzheOlnFz@cluster0.rk83u.mongodb.net/test_taskbreaker_db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

let _db;

exports.connectToMongoAtlas = async () => {
    try {
        await client.connect()
        _db = client.db()
    } catch (e) {
        throw e
    }
}

exports.getDB = () => { return _db }

exports.closeDB = async () => { await client.close() }