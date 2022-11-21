const { REFRESH_TOKEN_COOKIE_NAME } = require("../constants");
const authService = require("../services/auth.service");
const jwt = require("jsonwebtoken");

const controller = {
  login: async (req, res) => {
    const { data, status } = await authService.login(req.body);
    try {
      const { role, cart } = data.item;

      const tokenData = {
        id: data.item.dataValues.id,
        role: role.role,
        cartId: cart.id,
      };

      const rfToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN, {
        expiresIn: "3d",
      });

      const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN, {
        expiresIn: "5m",
      });

      res.cookie(REFRESH_TOKEN_COOKIE_NAME, rfToken, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return res.status(status).json({ item: { accessToken } });
    } catch (error) {
      console.log(error);
    }
    return res.status(status).json(data);
  },
  register: async (req, res) => {
    const { data, status } = await authService.register(req.body);
    res.status(status).json(data);
  },
  logout: (req, res) => {
    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME);
    res.status(200).json({ message: "Logged out" });
  },
  refreshToken: async (req, res) => {
    const { data, status } = await authService.refreshToken(req);
    res.status(status).json(data);
  },
};

module.exports = controller;
