const { getAuth } = require("../modules/user/auth")

exports.getAuth = async (req, res) => {
    const data = await getAuth();
    res.status(201).json(data);

}