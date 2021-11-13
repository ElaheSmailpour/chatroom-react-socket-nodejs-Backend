const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {


        const token = req.headers.token;
        if (!token)
            return res.status(401).send("no access")
        console.log("process.env.JWT=", process.env.JWT)
        const user = jwt.verify(token, process.env.JWT)

        if (user) {
            req.user = user;
            next();
        }
        else
            res.status(401).send("no access")
    }
    catch (error) {
        res.status(401).send("error catch")
       
    }
}