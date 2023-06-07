const express = require("express");
const multer = require("multer");
const router = express.Router();
const saleController = require('../../controller/sale/sale');



let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "./public/uploads");
    cb(null, "./public/sale_uploads");
  },

  filename: function (req, file, cb) {
    var fileFormat = file.originalname.split(".");
    cb(
      null,
      file.fieldname +
      "-" +
      Date.now() +
      "." +
      fileFormat[fileFormat.length - 1]
    );
    console.log(file);
  },
});

let upload = multer({
  storage: storage,
});
// 活动分类
// router.get("/type", function (req, res) {
//   res.render("index", { title: "Express" });
// });

// 参与活动
// router.get("/join", activityController.join);




// 获取商品
router.get("/list", saleController.list);

// 活动详情
// router.get("/detail", activityController.detail);

// 删除活动
// router.post("/del", function (req, res) {
//   res.render("index", { title: "Express" });
// });

// 添加商品
router.post("/add", saleController.add);


// 商品图片上传
router.post(
  "/uploadpreview",
  upload.single("img"),
  saleController.uploadpreview
);


// 添加订单数据
router.post("/addOrder", saleController.addOrder);

// 添加订单编号数据
router.post("/addOrderNumber", saleController.addOrderNumber);





// 获取订单数据
router.get("/orderList", saleController.orderList);


// 删除订单数据
router.post("/delOrder", saleController.delOrder);

// 查询订单列表
router.get("/selectOrder", saleController.selectOrder);

//审核状态
router.post("/auditDataApi", saleController.auditDataApi);

// 活动通知
// router.get('/activityjoinnotify', activityController.activityJoinNotify);

// 编辑活动
// router.post("/edit", function (req, res) {
//   res.render("index", { title: "Express" });
// });



 //``````````````````````````````````````
//  router.get("/check", activityController.check);
 
 //``````````````````````````````````````
module.exports = router;
