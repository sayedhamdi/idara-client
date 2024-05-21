import { useEffect, useState } from "react";

export default function BlogsList({blogs}) {
  
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
                  <td>{blog.id}</td>
                  <td>{blog.title}</td>
                  <td>{blog.content}</td>
                  <td>{blog.author}</td>
                  <td><img width="200px" src={blog.image} /></td>
                  <td>{blog.createdAt}</td>
                  <td>
                    <button>Update</button>
                  </td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
