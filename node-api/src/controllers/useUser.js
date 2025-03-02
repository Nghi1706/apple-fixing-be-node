const { getUser, createUser } = require("../modules/user/user")
const bcrypt = require("bcryptjs");

exports.getUser = async (req, res) => {
    
    const email = req.user.email
    const id_user = req.user.id
    // const data = await getUser(email);
    res.status(200).json({id_user, email});

}
exports.createUser = async (req, res) => {
    const {fullname, email, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await createUser(fullname, email, hashedPassword);
    res.status(200).json(data);
}