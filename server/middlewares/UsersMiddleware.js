


exports.testMiddleware = function (req, res, next)  {
    console.log('I tested the middleware')
    next()
}