const pool = require("../../config/db");
const bcrypt = require("bcryptjs");

exports.getUser = async (email) => {
  result = await pool.query(
    "SELECT id_user FROM public.users where email = $1",
    [email]
  );
  return result.rows;
};

exports.createUser = async (fullname, email, password) => {
  result = await pool.query(
    `
        WITH inserted_user AS (
            INSERT INTO users (fullname, email, created_time )
            VALUES ($1, $2, CURRENT_TIMESTAMP)
        RETURNING id_user)
        INSERT INTO user_login (id_user, password, created_time)
            values ((SELECT id_user FROM inserted_user), $3, CURRENT_TIMESTAMP)
        RETURNING *`,
    [fullname, email, password]
  );

  return result.rows[0];
};

exports.getUserID = async (email) => {
  result = await pool.query("select id_user from users where email=$1", [
    email,
  ]);
  return result.rows[0];
};

exports.checkPassword = async (id_user, password) => {
  result = await pool.query(
    `SELECT password FROM user_login where id_user=$1`,
    [id_user]
  );
  const isMatch = await bcrypt.compare(password, result.rows[0].password);
  return isMatch;
};

exports.updateToken = async (
  id_token,
  refresh_token,
  access_token,
  id_user
) => {
  try {
    result = await pool.query(
      `
              UPDATE public.users
                  SET id_token=$1, refresh_token=$2, acces_token=$3, created_time=CURRENT_TIMESTAMP
                  WHERE id_user=$4
                  RETURNING *`,
      [id_token, refresh_token, access_token, id_user]
    );
    return true;
  } catch (error) {
    return false;
  }
};
