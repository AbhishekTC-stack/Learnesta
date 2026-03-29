function adminCheck(req, res, next) {
  if (req.role === "admin") {
    next();
  } else {
    return res.status(401).json({ msg: "Unauthorized access" });
  }
}

export default adminCheck;