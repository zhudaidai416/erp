const multer = require("multer");

module.exports = {
  /* 文件上传函数 */
  file_load() {
    // 配置存储位置
    const fileDir = "./public/funds/others_uploads"; // 前提：必须保证该目录存在
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        // 存储地址
        cb(null, fileDir);
      },
      filename: function (req, file, cb) {
        // 配置文件名
        console.log("上传文件：", file);
        // file.originalname 可以获取前端传递的图片名及其后缀，比如 10.small.jpg
        const filenameArr = file.originalname.split("."); // ['10', 'small', 'jpg']
        const ext = filenameArr[filenameArr.length - 1]; // 数组最后一位，数组长度长度-1，后缀名 - 'jpg'

        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // 随机名字
        // file.fieldname 上传图片时约定的字段名
        cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext); // 必须上传后对图片重新命名
      },
    });
    const upload = multer({ storage: storage });

    return upload;
  },
};
