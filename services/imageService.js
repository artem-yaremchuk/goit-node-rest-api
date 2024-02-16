import multer from "multer";
import jimp from "jimp";
import path from "path";
import { v4 } from "uuid";
import * as fse from "fs-extra";

import HttpError from "../helpers/HttpError.js";

export class ImageService {
  static initUploadImageMiddleware(name) {
    const multerStorage = multer.memoryStorage();

    const multerFilter = (req, file, cbk) => {
      if (file.mimetype.startsWith("image/")) {
        cbk(null, true);
      } else {
        cbk(HttpError(400, "Please, upload images only"), false);
      }
    };

    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
    }).single(name);
  }

  static async saveImage(file, options, ...pathSegments) {
    if (
      file.size >
      (options?.maxFileSize
        ? options.maxFileSize * 1024 * 1024
        : 1 * 1024 * 1024)
    ) {
      throw HttpError(400, "File is too large!");
    }

    const fileName = `${v4()}.jpeg`;

    const tempFilePath = path.join(process.cwd(), "tmp", fileName);
    await fse.outputFile(tempFilePath, file.buffer);

    const fullFilePath = path.join(process.cwd(), "public", ...pathSegments);
    await fse.ensureDir(fullFilePath);

    const avatar = await jimp.read(tempFilePath);
    await avatar
      .cover(options.width || 500, options.height || 500)
      .quality(90)
      .writeAsync(path.join(fullFilePath, fileName));

    return path.join(...pathSegments, fileName);
  }
}
