const { getUser } = require("../modules/user/user")

exports.getUser = async (req, res) => {
    const data = await getUser(req.body.email, req.body.password);
    res.status(200).json(data);

}