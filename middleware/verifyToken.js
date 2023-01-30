import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';

export async function verifyToken(req, res, next) {
  try {
    const { access_token } = req.cookies;
    if (!access_token) return res.sendStatus(401);

    const _id = jwt.decode(access_token);

    const user = await UserModel.findById(_id);

    if (!user) return res.sendStatus(401);

    req.user = { _id: user._id.toString(), level: user.level };

    next();
  } catch (error) {
    console.log(`[Error] Verify token error!\n\t${error}`);
    return res.status(500).json({ message: 'Verify token error 500' });
  }
}
