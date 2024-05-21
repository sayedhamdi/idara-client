import { useState } from "react";
import { toast } from "react-toastify";
export default function CreateBlog({setLoading}) {
    let [title,setTitle] = useState("");
    let [author,setAuthor]= useState("");
    let [image,setImage] = useState("");
    let [content,setContent] =useState("")

    function createBlog(e){
        e.preventDefault()
        let newBlog = {title,author,image,content}
        fetch("http://localhost:8000/blogs",{
            method:"POST",
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
        <button type="submit" onClick={createBlog}>Submit</button>
      </form>
    </div>
  );
}
