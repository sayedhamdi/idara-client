import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import BlogsList from "./components/BlogsList";
import CreateBlog from "./components/CreateBlog";
import { useEffect, useState } from 'react';

function App(){
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
      {loading ? "....." : <BlogsList blogs={blogs} />}
    </div>
  )
}
export default App