const auth = require("../modules/user/auth");

exports.authenicate = async (req, res) => {
  const { email, password } = req.body;
  const [data, refresh_token] = await auth.authenticate(email, password);
  if (!data.data_response) {
    res.status(500).json({ message: "Server error" });
  }
  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    // secure: true,   // Only sent over HTTPS (remove if testing locally)
    sameSite: "Strict", // Prevent CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  res.status(200).json(data);
};

exports.renewAccessToken = async (req, res) => {
  const refresh_Token = req.cookies.refresh_token;
  const id_token = req.body.id_token;
  const data = await auth.renewAccessToken(refresh_Token, id_token);
  res.status(data.status).json(data.data);
};
