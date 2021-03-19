const mongoConnection = require('../../connection/MongoConnection');
const { Task } = require('../../model/Task');
const { User } = require('../../model/User');
const { mockSingleUser, mockSingleTask } = require('../mocks')
let TasksController;

describe('Tasks Controller', () => {

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
    /** @type {import('mongodb').Collection} */
    let tasks;

    beforeAll(async () => {
        await mongoConnection.connectToMongoAtlas(process.env.MONGO_URL)
        TasksController = require('../../controllers/TasksController')

        db = await mongoConnection.getDB();
        users = db.collection('users');
        tasks = db.collection('tasks');

        await users.insertOne(mockSingleUser);
        await tasks.insertOne(mockSingleTask);
    });

    beforeEach(async () => {
        mockRequest = {}
        mockResponse = {}
        mockResponse.json = jest.fn().mockReturnValue(mockResponse)
        mockResponse.status = jest.fn().mockReturnValue(mockResponse)
        let user = new User({
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
        await tasks.deleteMany({});
        await mongoConnection.closeDB()
    })

    describe('Get all user tasks', () => {
        test('Retrieving tasks', async () => {
            delete mockSingleTask._id
            mockSingleTask.uuid = expect.anything()
            const expectedResponse = {
                message: "All user tasks",
                tasks: [mockSingleTask]
            }
            await TasksController.getAllUserTasks(mockRequest, mockResponse)
            expect(mockResponse.json).toBeCalledWith(expectedResponse)
            expect(mockResponse.status).toBeCalledWith(200)
            expect(nextFunction).toBeCalledTimes(0);
        })
    })

    describe('Create Task', () => {
        test('No arguments in body', async () => {
            mockRequest.body = {}
            const expectedResponse = {
                "message": "Missing arguments"
            }
            await TasksController.createTask(mockRequest, mockResponse, nextFunction)
            expect(mockResponse.json).toBeCalledWith(expectedResponse)
            expect(mockResponse.status).toBeCalledWith(401)
            expect(nextFunction).toBeCalledTimes(0);
        })

        test('Incomplete arguments in body', async () => {
            mockRequest.body = {
                contexts: "home"
            }
            const expectedResponse = {
                "message": "Missing arguments"
            }
            await TasksController.createTask(mockRequest, mockResponse, nextFunction)
            expect(mockResponse.json).toBeCalledWith(expectedResponse)
            expect(mockResponse.status).toBeCalledWith(401)
            expect(nextFunction).toBeCalledTimes(0);
        })

        test('Test created', async () => {
            mockRequest.body = {
                description: "Manger des pâtes",
                project: "Healthy lifestyle",
                contexts: ["home"]
            }


            const expectedResponse = {
                message: "Task created",
                task: new Task({
                    description: mockRequest.body.description,
                    userEmail: mockResponse.locals.user.email,
                    project: mockRequest.body.project,
                    contexts: mockRequest.body.contexts,
                    priority: mockRequest.body.priority
                })
                ._id = expect.anything()
                .created = expect.anything()
                .uuid = expect.anything()
            }

            await TasksController.createTask(mockRequest, mockResponse, nextFunction)
            expect(mockResponse.json).toBeCalledWith(expectedResponse)
            expect(mockResponse.status).toBeCalledWith(200)
            expect(nextFunction).toBeCalledTimes(0);
        })
    })
})