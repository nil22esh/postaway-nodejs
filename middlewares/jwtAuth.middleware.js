import jwt from "jsonwebtoken";

export const jwtAuthentication = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("You are not Authorized!");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = payload.userID;
    req.email = payload.email;
  } catch (err) {
    console.log(err);
    return res.status(401).send("Unauthorized");
  }
  next();
};
