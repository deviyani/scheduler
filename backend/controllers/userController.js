module.exports = {
    login
}

function login(req, res, next){
    return res.status(200).send("true");
}

