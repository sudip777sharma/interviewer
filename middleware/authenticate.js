const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const Authenticate = async(req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const user_id = req.cookies.user_id;
        console.log("---authenticate.js------------------------------------");
        console.log("token: ", token);
        console.log("------------------------------------authenticate.js---");

        console.log("---authenticate.js------------------------------------");
        console.log("user_id: ", user_id);
        console.log("------------------------------------authenticate.js---");

        // const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({ _id: user_id });
        console.log("---authenticate.js------------------------------------");
        console.log("user: ", user);
        console.log("------------------------------------authenticate.js---");

        const session_token_arr = user.tokens
        console.log("---authenticate.js------------------------------------");
        console.log("session_token_arr: ", session_token_arr);
        console.log("------------------------------------authenticate.js---");

        const filtered_session_token = session_token_arr.filter(({ token: dbtoken }) => dbtoken === token);
        console.log("---authenticate.js------------------------------------");
        console.log("filtered_session_token: ", filtered_session_token);
        console.log("------------------------------------authenticate.js---");

        // const rootUser = await User.findOne({ _id: verifyToken.id, "tokens.token": token });

        if (!filtered_session_token) {
            console.log("user not found")
            throw new Error('User Not Found')
        } else {
            req.token = token;
            req.rootUser = user;
            req.userID = user._id;
            console.log("about.js")
            next();
        }

    } catch (err) {
        console.log("---authenticate.js------------------------------------");
        // console.log("authentication error ==========> ", err);
        console.log("------------------------------------authenticate.js---");
        res.status(401).send("unauthorized: No token provided");
    }
}

module.exports = Authenticate;