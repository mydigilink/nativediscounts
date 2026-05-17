"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function EditAuthor() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch(`/api/authors/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("data", JSON.stringify(formData));

    const res = await fetch(`/api/authors/${id}`, {
      method: "PUT",
      body: data,
    });

    if (res.ok) {
      alert("Author updated!");
      router.push("/admin/authors");
    } else {
      alert("Update failed!");
    }
  };

  if (!formData) return <div className="container py-4">Loading...</div>;

  return (
    <div className="container py-4">
      <h3>Edit Author</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Author Name</label>
          <input
            type="text"
            name="authorName"
            className="form-control"
            value={formData.authorName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Author Bio</label>
          <CKEditor
            editor={ClassicEditor}
            data={formData.authorBio}
            onChange={(event, editor) =>
              setFormData({ ...formData, authorBio: editor.getData() })
            }
          />
        </div>

        <div className="mb-3">
          <label>Status</label>
          <select
            name="profileStatus"
            className="form-control"
            value={formData.profileStatus}
            onChange={handleChange}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success">Update Author</button>
      </form>
    </div>
  );
}
