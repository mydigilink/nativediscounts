"use client";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { Form, Button } from "react-bootstrap";
export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/admin/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure?")) {
      await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      setBlogs(blogs.filter((b) => b._id !== id));
    }
  };

  return (
    <div className="container my-5">
      <h1>Blog Posts</h1>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Featured Image</th>
            <th>Title</th>
            <th>Country</th>
            <th>Status</th>
            <th style={{textAlign:"right"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td>
                  <Image
      src={blog.featuredImage}
      width={50}
      height={50}
      alt={blog.featuredImageAlt}
    /></td>
              <td>{blog.title}</td>
              <td>{blog.country}</td>
              <td>{blog.status}</td>
              <td  style={{textAlign:"right"}}>
                <a href={`/admin/blog-editor?id=${blog._id}`} className="btn btn-sm btn-warning me-2">
                  Edit
                </a>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
