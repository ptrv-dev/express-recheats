import * as AuthController from './controllers/auth.controller.js';
import * as PostController from './controllers/post.controller.js';
import * as CategoryController from './controllers/category.controller.js';
import * as AnnouncementController from './controllers/annon.controller.js';
import * as UploadController from './controllers/upload.controller.js';
import * as UserController from './controllers/user.controller.js';

import { upload } from './app.js';

import { verifyToken } from './middleware/verifyToken.js';

export default function (app) {
  app.post('/login', AuthController.login);
  app.get('/get-me', verifyToken, AuthController.getMe);

  app.post(
    '/upload',
    verifyToken,
    upload.array('images'),
    UploadController.upload
  );

  app.get('/user', verifyToken, UserController.getAll);
  app.post('/user', verifyToken, UserController.createOne);
  app.delete('/user/:id', verifyToken, UserController.removeOne);
  app.patch('/user/:id', verifyToken, UserController.updateOne);

  app.get('/post', PostController.getAll);
  app.get('/post/:id', PostController.getOne);

  app.post('/post', verifyToken, PostController.createOne);
  app.patch('/post/:id', verifyToken, PostController.updateOne);
  app.delete('/post/:id', verifyToken, PostController.deleteOne);

  app.post('/category', verifyToken, CategoryController.createOne);
  app.patch('/category/:id', verifyToken, CategoryController.updateOne);
  app.delete('/category/:id', verifyToken, CategoryController.deleteOne);
  app.get('/category', CategoryController.getAll);

  app.get('/announcement', AnnouncementController.get);
  app.post('/announcement', verifyToken, AnnouncementController.create);
  app.patch('/announcement', verifyToken, AnnouncementController.update);
}
