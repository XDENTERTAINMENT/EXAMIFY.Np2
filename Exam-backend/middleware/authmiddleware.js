const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "No token, unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    // ✅ OPTIONAL SAFETY CHECK
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    } 

    next();
  } catch (error) {
    console.error("JWT ERROR:", error.message);
    return res.status(401).json({ message: "Token invalid" });
  }
};

module.exports = protect;
