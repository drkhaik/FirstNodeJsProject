import jwt from "jsonwebtoken";

const middlewareController = {
    // verify token   // doctor
    verifyToken: (req, res, next) => {
        const token = req.headers['authorization'];
        let key = process.env.JWT_ACCESS_KEY;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, key, (err, user) => {
                if (err) {
                    return res.status(403).json({ message: "Token is not valid!" }); // 403
                }
                req.user = user;
                next();
            });
        }
        else {
            return res.status(200).json({ message: "You're not authenticated!" }) // 401
        }
    },

    // admin
    verifyTokenAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.role === 'R1') {
                next();
                // let ex = `${req.user.id} + ${req.body.id} + ${req.params.id} + ${req.user.role}`
                // return res.status(200).json(ex)
            } else {
                return res.status(403).json("You are not allowed to access!")
            }
        })
    }
}

module.exports = middlewareController;