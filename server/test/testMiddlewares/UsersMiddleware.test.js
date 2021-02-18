
const mongoConnection = require('../../connection/MongoConnection')
const { mockSingleUser } = require('../mocks')
let UsersMiddleware;

describe('Users Middleware', () => {
    /** @type {import('express').Request} */
    let mockRequest;
    /** @type {import('express').Response} */
    let mockResponse;
    /** @type {import('express').NextFunction} */
    let nextFunction = jest.fn();

    beforeAll(async () => {
        await mongoConnection.connectToMongoAtlas(process.env.MONGO_URL)
        UsersMiddleware = require('../../middlewares/UsersMiddleware')
        let db = await mongoConnection.getDB();
        const users = db.collection('users');
        await users.insertOne(mockSingleUser);
    });

    afterAll(async () => {
        await mongoConnection.closeDB()
    });

    beforeEach(() => {
        mockRequest = {}
        mockResponse = {}
        mockResponse.json = jest.fn().mockReturnValue(mockResponse)
        mockResponse.status = jest.fn().mockReturnValue(mockResponse)
        mockResponse.locals = {}
    })

    describe('Create User', () => {
        test('Missing body parameters', async () => {
            mockRequest.body = {}
            const expectedResponse = {
                "message": "Missing arguments"
            }
            await UsersMiddleware.createUser(mockRequest, mockResponse, nextFunction)
            expect(mockResponse.json).toBeCalledWith(expectedResponse)
            expect(mockResponse.status).toBeCalledWith(401)
        })

        test('User already taken', async () => {
            mockRequest.body = {
                "username": "testUsername",
                "email": "testUsername@test.com",
                "password": "testPassword"
            }
            const expectedResponse = {
                "message": "User already taken"
            }
            await UsersMiddleware.createUser(mockRequest, mockResponse, nextFunction)
            expect(mockResponse.json).toBeCalledWith(expectedResponse)
            expect(mockResponse.status).toBeCalledWith(403)
        })
    })

})