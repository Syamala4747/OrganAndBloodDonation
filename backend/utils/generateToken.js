import jwt from 'jsonwebtoken';

const generateToken = (id, category) => {
  return jwt.sign({ id, category }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export default generateToken;