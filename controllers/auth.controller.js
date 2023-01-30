import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';

export async function login(req, res) {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) return res.sendStatus(403);
    if (user.password !== req.body.password) return res.sendStatus(403);
    const token = jwt.sign(user._id.toString(), process.env.JWT);

    res.cookie('access_token', token).sendStatus(200);
  } catch (error) {
    console.log('[Error] User login error!!!');
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getMe(req, res) {
  try {
    const user = await UserModel.findById(req.user._id);

    if (!user) return res.sendStatus(403);

    res.json(user);
  } catch (error) {
    console.log('[Error] User get me error!!!');
    console.log(error);
    res.sendStatus(500);
  }
}
