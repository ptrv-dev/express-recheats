import AnnonModel from '../models/AnnonModel.js';

export async function get(req, res) {
  const result = await AnnonModel.findOne();
  return res.json(result);
}

export async function create(req, res) {
  try {
    const announcement = await (
      await AnnonModel.create({
        text: req.body.text,
      })
    ).save();
    return res.json(announcement);
  } catch (error) {
    console.log('[Error] Create announcement error!!!');
    console.log(error);
    res.sendStatus(500);
  }
}

export async function update(req, res) {
  try {
    await AnnonModel.findOneAndUpdate({}, { text: req.body.text });
    res.sendStatus(200);
  } catch (error) {
    console.log('[Error] Update announcement error!!!');
    console.log(error);
    res.sendStatus(500);
  }
}
