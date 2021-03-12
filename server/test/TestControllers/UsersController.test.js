const mongoConnection = require('../../connection/MongoConnection');
const { mockSingleUser } = require('../mocks')
let UsersController;

describe('Users Controller', () => {

    /** @type {import('express').Request} */
    let mockRequest;
    /** @type {import('express').Response} */
    let mockResponse;
    /** @type {import('express').NextFunction} */
    let nextFunction = jest.fn();
    /** @type {import('mongodb').Db} */
    let db;
    /** @type {import('mongodb').Collection} */
    let users;

    beforeAll(async () => {
        await mongoConnection.connectToMongoAtlas(process.env.MONGO_URL)
        UsersController = require('../../controllers/UsersController')

        db = await mongoConnection.getDB();
        users = db.collection('users');

        await users.insertOne(mockSingleUser);
    });

    beforeEach(async () => {
        mockRequest = {}
        mockResponse = {}
        mockResponse.json = jest.fn().mockReturnValue(mockResponse)
        mockResponse.status = jest.fn().mockReturnValue(mockResponse)
        mockResponse.locals = {}
    })

    afterAll(async () => {
        await users.deleteMany({});
        await mongoConnection.closeDB()
    })

    describe('Get all users', () => {
        test('Retrieving users', async () => {
            delete mockSingleUser._id
            const expectedResponse = {
                message: "All DB Users",
                users: [mockSingleUser]
            }
            await UsersController.getAllUsers(mockRequest, mockResponse, nextFunction)
            expect(mockResponse.json).toBeCalledWith(expectedResponse)
            expect(mockResponse.status).toBeCalledWith(200)
            expect(nextFunction).toBeCalledTimes(0);
        })
    })
})