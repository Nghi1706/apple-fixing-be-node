const token = require("./token");
const user = require("./user");
const jwt = require("jsonwebtoken");

exports.authenticate = async (email, password) => {
  id_user = await user.getUserID(email);
  id_user = id_user.id_user;
  isCorrectPW = await user.checkPassword(id_user, password);
  if (isCorrectPW) {
    id_token = token.generateIdToken({ id: id_user, email: email });
    access_token = token.generateAccessToken({ id: id_user, email: email });
    refresh_token = token.generateRefreshToken({ id: id_user, email: email });
    data_response = await user.updateToken(
      id_token,
      refresh_token,
      access_token,
      id_user
    );

    return [
      { isCorrectPW, id_token, access_token, id_user, data_response },
      refresh_token,
    ];
  } else return { isCorrectPW };
};

exports.renewAccessToken = async (refresh_token, id_token) => {
  try {
    const { id, email, iat, exp } = jwt.verify(
      refresh_token,
      process.env.SECRET_KEY
    );

    id_token = token.generateIdToken({ id: id, email: email });
    access_token = token.generateAccessToken({ id: id, email: email });
    data_response = await user.updateToken(
      id_token,
      refresh_token,
      access_token,
      id
    );
    if (!data_response) {
      return { status: 500, data: "Server error" };
    }
    return { status: 200, data: { id_token, access_token } };
  } catch (error) {
    return { status: 403, data: "relogin" };
  }
};
