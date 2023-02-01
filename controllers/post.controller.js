import PostModel from '../models/PostModel.js';

export async function createOne(req, res) {
  try {
    const post = await (
      await PostModel.create({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        author: req.body.author,
      })
    ).save();
    res.json(post);
  } catch (error) {
    console.log('[Error] Post create error!!!');
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deleteOne(req, res) {
  try {
    const { id } = req.params;

    const post = await PostModel.findById(id);

    if (!post) return res.sendStatus(404);
    if (req.user.level < 2 && post.author.toString() !== req.user._id)
      return res.sendStatus(403);

    await post.deleteOne();
    res.sendStatus(200);
  } catch (error) {
    console.log('[Error] Post delete error!!!');
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getAll(req, res) {
  try {
    const { page = 1, limit = 20, search = '', category, author } = req.query;

    const count = await PostModel.find({
      title: { $regex: search, $options: 'i' },
      [category && 'category']: category,
      [author && 'author']: author,
    }).count();

    const posts = await PostModel.find({
      title: { $regex: search, $options: 'i' },
      [category && 'category']: category,
      [author && 'author']: author,
    })
      .populate('category')
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      data: posts,
      maxPage: Math.ceil(count / limit),
    });
  } catch (error) {
    console.log('[Error] Get all posts error!!!');
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getOne(req, res) {
  try {
    const post = await PostModel.findById(req.params.id)
      .populate('category')
      .populate('author', 'link');
    if (!post) return res.sendStatus(404);
    res.json(post);
  } catch (error) {
    console.log('[Error] Get one post error!!!');
    console.log(error);
    res.sendStatus(500);
  }
}

export async function updateOne(req, res) {
  try {
    const { id } = req.params;

    console.log(req.user.level, req.user._id);

    const post = await PostModel.findById(id);
    if (req.user.level < 2 && post.author.toString() !== req.user._id)
      return res.sendStatus(403);

    await post.updateOne({
      image: req.body.image,
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      category: req.body.category,
    });

    return res.sendStatus(200);
  } catch (error) {
    console.log('[Error] Update one post error!!!');
    console.log(error);
    res.sendStatus(500);
  }
}
