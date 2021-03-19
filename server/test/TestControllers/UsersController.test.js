const mongoConnection = require('../../connection/MongoConnection');
const { mockSingleUser } = require('../mocks');
const { User } = require('../../model/User');
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
        mockSingleUser.uuid = "testUuid";
        await users.insertOne(mockSingleUser);
    });

    beforeEach(async () => {
        mockRequest = {}
        mockResponse = {}
        mockResponse.locals = {}
        mockResponse.json = jest.fn().mockReturnValue(mockResponse)
        mockResponse.status = jest.fn().mockReturnValue(mockResponse)
        var user = new User({
            uuid: "testUuid",
            username: mockSingleUser.username,
            email: mockSingleUser.email,
            password: mockSingleUser.password,
            authorities: mockSingleUser.authorities,
            created: mockSingleUser.created
        })

        mockResponse.locals = {
            user: user
        }
        
    })

    afterAll(async () => {
        await users.deleteMany({});
        await mongoConnection.closeDB()
    })

    describe('Get all users', () => {
        test('Retrieving users', async () => {
            delete mockSingleUser._id
            mockSingleUser.uuid = expect.anything()
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

    describe('Get User Info', () => {
        test('Get Info', async () => {
            const expectedResponse = {
                message: "Account info :",
                account: expect.anything()
            }
            await UsersController.getUserInfo(mockRequest, mockResponse, nextFunction)
            expect(mockResponse.json).toBeCalledWith(expectedResponse)
            expect(mockResponse.status).toBeCalledWith(200)
        })
    })

    describe('Change Password', () => {
        test('Body Malformed', async () => {
            mockRequest.body = {}
            const expectedResponse = {
                message: "Missing arguments"
            }
            await UsersController.changePassword(mockRequest, mockResponse, nextFunction)
            expect(mockResponse.json).toBeCalledWith(expectedResponse)
            expect(mockResponse.status).toBeCalledWith(401)
        })

        test('Password Mismatch', async () => {
            mockRequest.body = {
                oldpassword: 'testPasswordWrong',
                password: 'azerty'
            }
            const expectedResponse = {
                message: "Wrong password"
            }
            await UsersController.changePassword(mockRequest, mockResponse, nextFunction)
            expect(mockResponse.json).toBeCalledWith(expectedResponse)
            expect(mockResponse.status).toBeCalledWith(401)
        })
    })

})