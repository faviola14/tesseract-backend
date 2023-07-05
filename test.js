const numero = 100;

const verification = (req, res, next) => {
    res.status(200).send(numero)
}

module.exports = {
    name: 'favi',
    verification
}