import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  //console.log('todo: tee kuvakäsittely', req.file);
  if (!req.file) {
    next();
    return;
  }

  let extension = 'jpg';
  if (req.file.mimetype === 'image/png') {
    // if (req.file.mimetype.includes('/png')) {
    extension = 'png';
  } else if (req.file.mimetype === 'image/gif') {
    extension = 'gif';
  } else if (req.file.mimetype === 'image/webp') {
    extension = 'webp';
  }

  await sharp(req.file.path)
    .resize(160, 160)
    .toFile(`${req.file.path}_thumb.${extension}`);

  next();
};

export {createThumbnail};
