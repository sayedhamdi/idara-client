const router = require("express").Router()
const {getAllBlogs, getBlogById, createBlog, updateBlogById, deleteBlogById} = require("../controllers/blogs")

router.get("/",getAllBlogs)
router.get("/:id",getBlogById)
router.post("/",createBlog)
router.put("/:id",updateBlogById)
router.delete("/:id",deleteBlogById)

module.exports = router