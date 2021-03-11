const { jwtSecret, jwtExpiration } = require('../../constants/Auth');
const AuthController = require('../../controllers/AuthController')
const jwt = require('jsonwebtoken')

describe('Authorization Controller', () => {

    /** @type {import('express').Request} */
    let mockRequest;
    /** @type {import('express').Response} */
    let mockResponse;
    /** @type {import('express').NextFunction} */
    let nextFunction = jest.fn();

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

    describe('Create Token', () => {
        test('Correct token creation', () => {
            let login = { email: 'testemail@test.com', password: 'testPassword'}
            mockRequest.body = login
            AuthController.createToken(mockRequest, mockResponse, nextFunction)
            let jwtToken = jwt.sign(login, jwtSecret, { expiresIn: jwtExpiration });
            let expectedResponse = {
                message: `New token, expiration: ${jwtExpiration / 60} minutes`,
                token: jwtToken
            }
            expect(mockResponse.json).toBeCalledWith(expectedResponse)
            expect(mockResponse.status).toBeCalledWith(200)
            expect(nextFunction).toBeCalledTimes(0);
        })
    })
})