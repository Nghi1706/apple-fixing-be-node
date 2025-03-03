const jwt = require("jsonwebtoken");
exports.generateIdToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    // role: user.role,
  };
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secretKey, {
    expiresIn: "1h",
  });
  return token;
};

exports.generateRefreshToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secretKey, {
    expiresIn: "7d",
  });
  return token;
};

exports.generateAccessToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secretKey, {
    expiresIn: "2h",
  });
  return token;
};
