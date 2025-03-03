const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  console.log("Middleware is running !");

  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Relogin" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "renew access_token with refresh_token" });
  }
};
