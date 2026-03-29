import jwt from "jsonwebtoken";

function authentication(req, res, next) {
  try {
    let token;

    // 1. Check Authorization header (Bearer token)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 2. Check cookie (set by cookie-parser middleware in index.js)
    else if (req.cookies && req.cookies.authToken) {
      token = req.cookies.authToken;
    }

    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.name = decoded.UserName;
    req.role = decoded.UserRole;

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
}

export { authentication };
