import UserModel from '../models/UserModel.js';

export async function getAll(req, res) {
  try {
    if (req.user.level < 2) return res.sendStatus(403);

    const users = await UserModel.find().sort({ createdAt: -1 });

    return res.json(users);
  } catch (error) {
    console.log('[Error] Users get all error!!!');
    console.log(error);
    res.sendStatus(500);
  }
}

export async function createOne(req, res) {
  try {
    if (req.user.level < 2) return res.sendStatus(403);

    if (!req.body.username || !req.body.password) return res.sendStatus(400);

    await UserModel.create({
      username: req.body.username,
      password: req.body.password,
      link: req.body.link,
    });

    return res.sendStatus(200);
  } catch (error) {
    console.log('[Error] User create error!!!');
    console.log(error);
    res.sendStatus(500);
  }
}

export async function removeOne(req, res) {
  try {
    if (req.user.level < 2) return res.sendStatus(403);

    const { id } = req.params;

    const user = await UserModel.findByIdAndRemove(id);

    if (!user) return res.sendStatus(404);

    return res.sendStatus(200);
  } catch (error) {
    console.log('[Error] User remove error!!!');
    console.log(error);
    res.sendStatus(500);
  }
}

export async function updateOne(req, res) {
  try {
    if (req.user.level < 2) return res.sendStatus(403);

    const { id } = req.params;

    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        username: req.body.username,
        password: req.body.password,
        link: req.body.link,
      },
      { returnDocument: 'after' }
    );

    if (!user) return res.sendStatus(404);

    return res.sendStatus(200);
  } catch (error) {
    console.log('[Error] User remove error!!!');
    console.log(error);
    res.sendStatus(500);
  }
}
