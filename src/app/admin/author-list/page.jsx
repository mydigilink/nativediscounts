"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from 'next/image';
export default function AuthorList() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetch("/api/admin/authors")
      .then((res) => res.json())
      .then((data) => setAuthors(data));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this author?")) return;

    const res = await fetch(`/api/admin/authors/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setAuthors(authors.filter((a) => a._id !== id));
    } else {
      alert("Error deleting author");
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>Authors</h3>
        <Link href="/admin/authors-editor" className="btn btn-primary">
          Add Author
        </Link>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Author Image</th>
            <th>Name</th>
            <th>Status</th>
            <th>Sort Order</th>
            <th>Last Updated</th>
            <th  style={{textAlign:"right"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No authors found
              </td>
            </tr>
          ) : (
            authors.map((a) => (
              <tr key={a._id}>
                   <td>
                                 <Image
                     src={a.profilePhoto}
                     width={50}
                     height={50}
                     alt={a.profilePhoto}
                   /></td>
                <td>{a.authorName}</td>
                <td>{a.profileStatus}</td>
                <td>{a.sortOrder}</td>
                <td>{new Date(a.lastUpdated).toLocaleDateString()}</td>
                <td  style={{textAlign:"right"}}>
                  <Link
                    href={`/admin/authors-editor?id=${a._id}`}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(a._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
