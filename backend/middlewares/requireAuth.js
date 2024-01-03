const jwt = require("jsonwebtoken");
const User = require("../models/users.models");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  // console.log(authorization);

  if (!authorization) {
    res.status(401).json({ error: "Please Signup/Login to continue !!" });
  }
  const authToken = authorization?.split(" ")[1];
  // console.log(authToken);

  if (authToken === undefined) {
    res.status(400).json({ error: " Please Sign in to continue!!" }).end();
    throw Error(" Please Sign in to continue!!");
  }

  try {
    const { id } = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    // console.log("id inside try",id);
    req.user = await User.findOne({ _id: id }).select("_id");

    next();
  } catch (error) {
    // console.log(error);
    res
      .status(401)
      .json({ error: "Sorry!! Your are not authorized to make requests." });
  }
};

module.exports = { requireAuth };
