const jwt = require("jsonwebtoken");
const getUser = (req, res, next) => {
  try {
    const reqHeader = req.headers["authorization"];
    if (reqHeader) {
      const token = reqHeader.split(" ")[1];
      if (token) {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN);
        if (user) {
          req.user = user;
        } else {
          req.user = null;
        }
      } else {
        req.user = null;
      }
    } else {
      req.user = null;
    }
  } catch (error) {}
  next();
};
const verifyToken = (req, res, next) => {
  getUser(req, res, () => {
    if (req && req.user) {
      next();
    } else {
      return res.status(401).json("Not authorization");
    }
  });
};

const verifyTokenAndUser = (req, res, next) => {
  verifyToken(req, res, () => {
    // console.log(req.params.userId === "" + req.user.id);
    if (
      req.params.userId === "" + req.user.id ||
      req.body.userId === "" + req.user.id
    ) {
      next();
    } else {
      return res.status(401).json("Not authorization");
    }
  });
};

const verifyTokenUserAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.params.userId === "" + req.user.id ||
      req.body.userId === req.user.id ||
      req.user.role === "admin"
    ) {
      next();
    } else {
      return res.status(401).json("Not authorization");
    }
  });
};
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(401).json("Not authorization");
    }
  });
};
module.exports = {
  getUser,
  verifyToken,
  verifyTokenAndUser,
  verifyTokenUserAndAdmin,
  verifyAdmin,
};
