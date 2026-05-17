"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // categories per page
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCategories();
  }, [search, page, statusFilter]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        search,
        page,
        limit,
        status: statusFilter,
      });

      const res = await fetch(`/api/admin/categories?${params.toString()}`);
      const data = await res.json();

      setCategories(data.categories || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchCategories();
      } else {
        const errorData = await res.json();
        alert("Error deleting category: " + errorData.error);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Manage Categories</h2>
        <Link href="/admin/category-editor" className="btn btn-primary">
          + Add Category
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            placeholder="Search by Title or Slug..."
            className="form-control"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading categories...</p>
      ) : categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>SEO Title</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id}>
                  <td>{cat.categoryTitle}</td>
                  <td>{cat.seoTitle}</td>
                  <td>{cat.pageSlug}</td>
                  <td>
                    <span
                      className={`badge ${
                        cat.status === "Active"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {cat.status}
                    </span>
                  </td>
                  <td>
                    {cat.lastUpdated
                      ? new Date(cat.lastUpdated).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    <Link
                      href={`/admin/category-editor?id=${cat._id}`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteCategory(cat._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <nav>
            <ul className="pagination">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(page - 1)}>
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${page === i + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${page === totalPages ? "disabled" : ""}`}
              >
                <button className="page-link" onClick={() => setPage(page + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
