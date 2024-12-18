const jwt = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (userData) => {
    return jwt.sign(
      {
        id: userData.id,
        roleId: userData?.Role.id
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: '360d' },
    );
  },
  generateRefreshToken: (userData) => {
    return jwt.sign(
      {
        id: userData.id,
        roleId: userData?.Role.id,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: '360d' },
    );
  },
};
