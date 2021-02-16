

exports.testController = (req, res, next) => {
    try {
        res.send('Successfuly Try')
    } catch (error) {
        next(error)
    }

}