const { MongoClient } = require('mongodb');

describe('insert', () => {
  let connection;

  /**
  * @type {import('mongodb').Db}
  */
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });


    db = await connection.db();

  });

  // beforeEach(async () => {
  //   await db.collection('COLLECTION_NAME').deleteMany({});
  // });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');

    const mockUser = { _id: 'some-user-id', name: 'John' };
    await users.insertOne(mockUser);
    let allUsers = await users.find({}).toArray()

    const insertedUser = await users.findOne({ _id: 'some-user-id' });

    expect(insertedUser).toEqual(mockUser);
  });
});