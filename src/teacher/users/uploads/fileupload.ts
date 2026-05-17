import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {

  storage: diskStorage({
    destination: './uploads',
    filename: (req:any, file, callback) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = extname(file.originalname);
      callback(null, `${req.user.id}-${uniqueSuffix}${ext}`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
  fileFilter: (req, file, callback) => {
  
    callback(null, true);
  },
};
