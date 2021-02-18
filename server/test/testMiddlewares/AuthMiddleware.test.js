const AuthMiddleware = require('../../middlewares/AuthMiddleware')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../constants/Auth')


describe('Authorization middleware', () => {
    /** @type {import('express').Request} */
    let mockRequest;
    /** @type {import('express').Response} */
    let mockResponse;
    /** @type {import('express').NextFunction} */
    let nextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {}
        mockResponse = {}
        mockResponse.json = jest.fn().mockReturnValue(mockResponse)
        mockResponse.status = jest.fn().mockReturnValue(mockResponse)
        mockResponse.locals = {}
    })

    test('without token', async () => {
        const expectedResponse = {
            "message": "Header Malformed"
        };
        AuthMiddleware.verifyJwt(mockRequest, mockResponse, nextFunction)

        expect(mockResponse.json).toBeCalledWith(expectedResponse);
        expect(mockResponse.status).toBeCalledWith(403);
    })

    test('without "authorization" header', async () => {
        mockRequest.headers = {}
        const expectedResponse = {
            "message": "Header Malformed"
        };
        AuthMiddleware.verifyJwt(mockRequest, mockResponse, nextFunction)

        expect(mockResponse.json).toBeCalledWith(expectedResponse);
        expect(mockResponse.status).toBeCalledWith(403);
    })

    test('with "authorization" header but incorrect token', async () => {
        mockRequest.headers = { authorization: "Bearer token" }
        const expectedResponse = {
            "message": "Forbidden"
        };
        AuthMiddleware.verifyJwt(mockRequest, mockResponse, nextFunction)

        expect(mockResponse.json).toBeCalledWith(expectedResponse);
        expect(mockResponse.status).toBeCalledWith(403);
    })

    test('with "authorization" header and correct token', async () => {
        let token = jwt.sign("token", jwtSecret)
        mockRequest.headers = { authorization: `Bearer ${token}` }

        AuthMiddleware.verifyJwt(mockRequest, mockResponse, nextFunction)
        expect(nextFunction).toBeCalledTimes(1);
    })

})