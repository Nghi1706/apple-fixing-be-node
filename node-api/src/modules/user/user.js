const pool = require("../../config/db")

exports.getUser = async(email, password) => {
    result = await pool.query("SELECT id_user FROM public.users where email = $1 and password = $2", [email, password])
    return result.rows
}
