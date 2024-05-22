import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from 'react-toastify';

import BlogsList from "./components/BlogsList";
import CreateBlog from "./components/CreateBlog";
import { useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

function Blogs(){
  const [blogs, setBlogs] = useState([]);
  const [loading,setLoading] =useState(true)
  useEffect(()=>{
    if(loading){
      fetch("http://localhost:8000/blogs")
      .then(res=>res.json())
      .then(data=>{
        setBlogs(data)
      })
      setLoading(false)

    }
    
  },[loading])
  return (
    <div >
      <ToastContainer />
      <CreateBlog setLoading={setLoading}/>
      <br/>
      {loading ? "....." : <BlogsList blogs={blogs} setLoading={setLoading} />}
    </div>
  )
}

function App(){
  return (
    <Routes>
      <Route path="/" element={<Blogs />}/>
      <Route path="/blogs/edit/:id" element={<EditBlog />}/>
    </Routes>
  )
}

function EditBlog({setLoading}) {
    let [title,setTitle] = useState("");
    let [author,setAuthor]= useState("");
    let [image,setImage] = useState("");
    let [content,setContent] =useState("")
    let {id}  = useParams();
    function editBlog(e){
        e.preventDefault()
        let newBlog = {title,author,image,content}
        fetch("http://localhost:8000/blogs/"+id,{
            method:"PUT",
            headers: {
                "content-type":"application/json",
            },
            body : JSON.stringify(newBlog)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.message){
                toast.error(data.message)
            }else{
                toast.success("Created a new blog "+title);
                setAuthor("")
                setContent("")
                setImage("")
                setTitle("")
                setLoading(true)
            }
        })
        
         
    }

    useEffect(()=>{
      fetch("http://localhost:8000/blogs/"+id)
      .then(res=>res.json())
      .then(data=>{
        setTitle(data.title);
        setAuthor(data.author)
        setImage(data.image)
        setContent(data.content)
      })
    },[])
  return (
    <div>
      <form>
      
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={(e)=>setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={image}
            onChange={(e)=>setImage(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e)=>setContent(e.target.value)}
          />
        </div>
        <button type="submit" onClick={editBlog}>Submit</button>
      </form>
    </div>
  );
}


export default App;