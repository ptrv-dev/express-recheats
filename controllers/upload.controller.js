export async function upload(req, res) {
  try {
    if (!req.files) {
      res.sendStatus(400);
      throw 'Files upload error!';
    }

    return res.json({ files: req.files.map((file) => file.path) });
  } catch (error) {
    console.log('[Error] Files upload error error!!!');
    console.log(error);
    res.sendStatus(500);
  }
}
