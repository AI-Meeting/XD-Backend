import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import HttpError from '../error/HttpError';
import uuidRandom from './uuidRandom';

export const multerOptions = {
  filterFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(null, true);
    } else {
      callback(new HttpError(400, '지원하지 않는 이미지 형식입니다.'));
    }
  },

  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = '';

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }

      callback(null, uploadPath);
    },
    filename: (request, file, callback) => {
      callback(null, uuidRandom(file));
    },
  }),
};

export const createImageURL = (file) => {
  const serverAddress: string = process.env.SERVER_ADDRESS;

  return `${serverAddress}/${file.filename}`;
};
