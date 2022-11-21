const db = require("../models");
const bcrypt = require("bcryptjs");
const { getUserInclude } = require("../utils/includes");
const { REFRESH_TOKEN_COOKIE_NAME } = require("../constants");
const jwt = require("jsonwebtoken");

const login = async (body) => {
  try {
    const { email } = body;
    const _password = body.password;
    const item = await db.User.findOne({
      where: { email },
      include: getUserInclude(),
      nest: true,
    });

    if (!item) {
      return { status: 403, data: { message: `Email's wrong` } };
    }
    const encoded = bcrypt.compareSync(_password, item.password);

    if (!encoded) {
      return { status: 403, data: { message: `Password's wrong` } };
    }

    const { password, ...others } = item;

    return { status: 200, data: { item: others } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};
const register = async (body) => {
  try {
    const { email, password, telephone } = body;
    let item = await db.User.findOne({
      where: { email },
    });
    if (item) {
      return { status: 403, data: { message: `Email's wrong` } };
    }
    item = await db.User.findOne({
      where: { telephone },
    });
    if (item) {
      return { status: 403, data: { message: `Telephone's wrong` } };
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await db.User.create({ ...body, password: hashedPassword });
    return { status: 200, data: { item } };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

const refreshToken = async (req) => {
  try {
    if (req.cookies) {
      const rfToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];
      if (!rfToken) {
        return {
          status: 403,
          data: { message: `Refresh token is not exists` },
        };
      }
      const decoded = jwt.verify(rfToken, process.env.REFRESH_TOKEN);
      if (decoded) {
        const { id, role, cartId } = decoded;
        const accessToken = jwt.sign(
          { id, role, cartId },
          process.env.ACCESS_TOKEN,
          {
            expiresIn: "5m",
          }
        );
        return { status: 200, data: { item: { accessToken } } };
      } else {
        return { status: 403, data: { message: `Token is expired` } };
      }
    } else {
      return { status: 403, data: { message: `Token is invalid` } };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, data: { message: `Something's wrong` } };
  }
};

module.exports = { login, register, refreshToken };
