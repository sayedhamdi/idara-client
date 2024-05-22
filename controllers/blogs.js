const blogSchema = require("../models/Blogs")
  



const createBlog = async (req,res)=>{
    // verify that data passes through
    // validation
    for (const key of Object.keys(req.body)){
        if(req.body[key] ==""){
            return res.status(400).json({message:"verify blog content one or more elements are empty"})
        }
    }
    try{
        let newBlog = await blogSchema.create(req.body)
        res.status(201).json(newBlog)

    }catch(e){
        console.log(e)
        res.status(500).json({message:"error while creating Blog"})
    }
    
}


const getAllBlogs = async (req,res)=>{
    try{
        let blogs = await blogSchema.find()
        res.status(200).json(blogs);
    }catch(e){
        res.status(500).json({message:"error retrieving blogs"})
    }

}


const getBlogById = (req,res)=>{
    let blogId = req.params.id

    let blog = blogs.find((b=>b.id == blogId))
    if(!blog){
        return res.status(400).json({message:"No blog with id "+blogId})
    }
    res.status(200).json(blog);
}

const updateBlogById = (req,res)=>{
    // verification de l'existence de l'element 
    const blogId = req.params.id;

    const blogIndex = blogs.findIndex(b =>b.id ==blogId);
    if (!blogIndex){
        return res.status(404).json({message: "Blog not found wrong id"});
    }

    // verification mtaa el body 
    for (const key of Object.keys(req.body)){
        if(req.body[key] ==""){
            return res.status(400).json({message:"verify blog content one or more elements are empty"})
        }
    }


    // update  
    blogs[blogIndex] = {id: blogs[blogIndex].id,...req.body}

    res.json(blogs[blogIndex]);

    

    // verification des champs
    
}

const deleteBlogById = (req,res)=>{
    let blogId = req.params.id;
    let blogIndex = blogs.findIndex(b=>b.id==blogId);
    if(!blogIndex){
        return res.status(404).json({message:"Blog not found !"})
    }
    let blogtoDelete = blogs[blogIndex]


    blogs.splice(blogIndex,1);

    res.json(blogtoDelete)

}



module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    deleteBlogById,
    updateBlogById
}