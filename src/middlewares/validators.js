const patchValidator = (req, res, next) => {
    const { title, description, isDone } = req.body;
    if (typeof title == "undefined" ||
        typeof description == "undefined" ||
        typeof isDone == "undefined") { 
        return res.status(404).json({message:'falta información'})
        }
    if (typeof title !== 'string') {
        return res.status(404).json({message:'el tipo del title debe ser tipo string'})
    }
    if (typeof isDone !== 'boolean') {
        return res.status(404).json({message:'isDone debe ser tipo boolean'})
    }
    next()
}

module.exports = {
    patchValidator
}