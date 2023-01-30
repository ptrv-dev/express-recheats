import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import { extname } from 'path';

import routes from './routes.js';

dotenv.config();

const PORT = process.env.PORT || 4444;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
  },
});

export const upload = multer({ storage });

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: ['http://localhost:8080'] }));
app.use(cookieParser());
app.use('/static', express.static('./static/'));
routes(app);

app.listen(PORT, () => {
  console.log(`[Successfully] Server started at port ${PORT}`);
});

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) {
    console.log('[Error] MongoDB connection error!!!');
    console.log(err);
  } else {
    console.log(`[Successfully] MongoDB connected`);
  }
});
