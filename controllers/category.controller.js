import CategoryModel from '../models/CategoryModel.js';

export async function createOne(req, res) {
  try {
    if (!req.body.title || req.body.title.length < 3)
      return res.sendStatus(400);

    if (req.user.level < 2) return res.sendStatus(403);

    await CategoryModel.create({ title: req.body.title });
    res.sendStatus(200);
  } catch (error) {
    console.log('[Error] Category create error!!!');
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deleteOne(req, res) {
  try {
    if (req.user.level < 2) return res.sendStatus(403);

    await CategoryModel.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    console.log('[Error] Category create error!!!');
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getAll(req, res) {
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (error) {
    console.log('[Error] Get all category error!!!');
    console.log(error);
    res.sendStatus(500);
  }
}

export async function updateOne(req, res) {
  try {
    if (req.user.level < 2) return res.sendStatus(403);

    const { id } = req.params;

    if (!req.body.title) return res.sendStatus(400);

    await CategoryModel.findByIdAndUpdate(id, { title: req.body.title });

    return res.sendStatus(200);
  } catch (error) {
    console.log('[Error] Update one category error!!!');
    console.log(error);
    res.sendStatus(500);
  }
}
