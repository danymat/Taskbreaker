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
    /** @type {import('mongodb').Db} */
    let db;
    /** @type {import('mongodb').Collection} */
    let users;

    beforeAll(async () => {
        await mongoConnection.connectToMongoAtlas(process.env.MONGO_URL)
        UsersMiddleware = require('../../middlewares/UsersMiddleware')
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
        // await users.deleteMany({});
    })

    afterAll(async () => {
        await users.deleteMany({});
        await mongoConnection.closeDB()
    });

    describe('Create User', () => {
        test('Missing body parameters', async () => {
            mockRequest.body = {}
            const expectedResponse = {
                "message": "Missing arguments"
            }
            await UsersMiddleware.createUser(mockRequest, mockResponse, nextFunction)
            expect(mockResponse.json).toBeCalledWith(expectedResponse)
            expect(mockResponse.status).toBeCalledWith(401)
            expect(nextFunction).toBeCalledTimes(0);
        })

        test('User already taken', async () => {
            mockRequest.body = {
                "username": "testUsername",
                "email": "testUsername@test.com",
                "password": "testPassword",
                "passwordconf": "testPassword"
            }
            const expectedResponse = {
                "message": "User already taken"
            }
            await UsersMiddleware.createUser(mockRequest, mockResponse, nextFunction)
            expect(mockResponse.json).toBeCalledWith(expectedResponse)
            expect(mockResponse.status).toBeCalledWith(401)
            expect(nextFunction).toBeCalledTimes(0);
        })

        test('New user created and inserted in DB', async () => {
            mockRequest.body = {
                "username": "testUsername2",
                "email": "testUsername2@test.com",
                "password": "testPassword",
                "passwordconf": "testPassword"
            }
            await UsersMiddleware.createUser(mockRequest, mockResponse, nextFunction)
            expect(nextFunction).toBeCalledTimes(1);
            let allUsers = await users.find({}).toArray()
            expect(allUsers.length).toBe(2)

        })
    })

    describe('Verify Login', () => {
        test('Missing body parameters', async () => {
            mockRequest.body = {}
            const expectedResponse = {
                "message": "Missing arguments"
            }
            await UsersMiddleware.verifyLogin(mockRequest, mockResponse, nextFunction)
            expect(mockResponse.json).toBeCalledWith(expectedResponse)
            expect(mockResponse.status).toBeCalledWith(401)
            expect(nextFunction).toBeCalledTimes(0);
        })

        test('Unexistent user', async () => {
            mockRequest.body = { email: "unexistentEmail", password: "unexistentPassword" }
            const expectedResponse = {
                "message": "Wrong email or password"
            }
            await UsersMiddleware.verifyLogin(mockRequest, mockResponse, nextFunction)
            expect(mockResponse.json).toBeCalledWith(expectedResponse)
            expect(mockResponse.status).toBeCalledWith(401)
            expect(nextFunction).toBeCalledTimes(0);
        })

        test('Wrong password', async () => {
            mockRequest.body = { email: "testUsername2@test.com", password: "wrongPassword" }
            const expectedResponse = {
                "message": "Wrong email or password"
            }

            await UsersMiddleware.verifyLogin(mockRequest, mockResponse, nextFunction)
            expect(mockResponse.json).toBeCalledWith(expectedResponse)
            expect(mockResponse.status).toBeCalledWith(401)
            expect(nextFunction).toBeCalledTimes(0);
        })

        test('Correct login', async () => {
            mockRequest.body = { email: "testUsername2@test.com", password: "testPassword" }
            await UsersMiddleware.verifyLogin(mockRequest, mockResponse, nextFunction)
            expect(nextFunction).toBeCalledTimes(1);
        })
    })

    describe('Get user from decoded', () => {
        test('User non existent in decoded', async () => {
            mockResponse.locals = {
                decoded: { email: "notAnUsername@test.com" }
            }
            const expectedResponse = {
                "message": "User not existent"
            }

            await UsersMiddleware.getUserFromDecoded(mockRequest, mockResponse, nextFunction)
            expect(nextFunction).toBeCalledTimes(0)
            expect(mockResponse.json).toBeCalledWith(expectedResponse)
            expect(mockResponse.status).toBeCalledWith(400)
        })
        test('User existent in decoded', async () => {
            mockResponse.locals = {
                decoded: { email: "testUsername@test.com" }
            }
            await UsersMiddleware.getUserFromDecoded(mockRequest, mockResponse, nextFunction)
            expect(nextFunction).toBeCalledTimes(1)
        })

    })

})