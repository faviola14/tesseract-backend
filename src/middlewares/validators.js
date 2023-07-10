const patchValidator = (req, res, next) => {
    const { title, description, isDone } = req.body;
    
    //if (typeof title == "undefined") {
        //console.log(title)
    //    if (typeof description == "undefined") {
            //console.log(description)
    //        if (typeof isDone == "undefined") {
                //console.log(isDone)
    //            return res.status(404).json({ message: 'falta información' })
    //        }
    //    }
    //}
    if (typeof title !== "undefined") {
        if (typeof title !== 'string') {
            return res.status(404).json({ message: 'el tipo del title debe ser tipo string' })
        }
    }
    if (typeof isDone !== "undefined") {
        if (typeof isDone !== 'boolean') {
            return res.status(404).json({ message: 'isDone debe ser tipo boolean' })
        }
    }
    next()
};
const postValidator = (req, res, next) => {
    const { title, description } = req.body;
    if (typeof title=="undefined"|| typeof description== undefined) {
        return res.status(400).json({ message: "falta información" });
    }
    if (typeof title!="string") {
        return res.status(400).json({ message: "el title debe ser de tipo string" });
    }
    if (typeof description!=="string") {
        return res.status(400).json({ message: "la descripción debe ser de tipo string" });
    }
    next();
}

module.exports = {
    patchValidator,
    postValidator
}