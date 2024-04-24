import multer from 'multer';

const storage = multer.diskStorage({
  filename: function (req,file,cb) {
    console.log(file);
    cb(null, file.name);
  }
});

const upload = multer({storage: storage});

export default upload;