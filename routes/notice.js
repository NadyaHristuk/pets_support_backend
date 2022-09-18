const express = require("express");
const router = express.Router();

const NoticeController = require("../controllers/notice.js");
const { authMiddleware } = require("../middlewares/authMiddleware");

const uploadCloud = require("../middlewares/uploadMiddleware.js");

router.post(
  "/notice/",
  authMiddleware,
  uploadCloud.single("animals_photos"),
  NoticeController.noticeCreate
);
router.delete("/notice/:id", authMiddleware, NoticeController.noticeDelete);
router.get("/notice/:limit", authMiddleware, NoticeController.noticeOfUser);
router.get("/notice/:id", NoticeController.noticeByID);

router.get(
  "/notice/selected/",
  authMiddleware,
  NoticeController.noticeSelected
);
router.post(
  "/notice/selected/:id",
  authMiddleware,
  NoticeController.noticeSelectedCreate
);
router.delete(
  "/notice/selected/:id",
  authMiddleware,
  NoticeController.noticeSelectedDelete
);

router.get("/notice/category", NoticeController.noticeCategory);

module.exports = router;
