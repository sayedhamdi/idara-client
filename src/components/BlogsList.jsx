import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function BlogsList({blogs,setLoading}) {
   async function deleteBlog(id){
    try{
      let res = await fetch("http://localhost:8000/blogs/"+id,{method:"DELETE"});
      let data = await res.json()
      toast.success("deleted element ! sahit")
      console.log(data)
      setLoading(true)
    }catch(e){
      toast.error("error while deleting")
      console.log(e)
    }
    
   }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Content</th>
            <th>Author</th>
            <th>Image</th>
            <th>Content</th>
            <th>Created At</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.length == 0
            ? "No blogs"
            : blogs?.map((blog) => (
                <tr key={blog.key}>
                  <td>{blog._id}</td>
                  <td>{blog.title}</td>
                  <td>{blog.content}</td>
                  <td>{blog.author}</td>
                  <td><img width="200px" src={blog.image} /></td>
                  <td>{blog.createdAt}</td>
                  <td>
                    <Link to={`blogs/edit/${blog._id}`}><button>Update</button></Link>
                  </td>
                  <td>
                    <button onClick = {()=>deleteBlog(blog._id)} style={{background:"red"}}>Delete</button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
