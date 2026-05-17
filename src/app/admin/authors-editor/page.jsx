"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "bootstrap/dist/css/bootstrap.min.css";
//import { CKEditor } from "@ckeditor/ckeditor5-react";
//import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// ✅ Dynamically import CKEditor
const CKEditor = dynamic(() => import("@ckeditor/ckeditor5-react").then(mod => mod.CKEditor), { ssr: false });
const ClassicEditor = dynamic(() => import("@ckeditor/ckeditor5-build-classic"), { ssr: false });

export default function AuthorEditor({ searchParams }) {
  const id = searchParams?.id;
  const router = useRouter();

  const [formData, setFormData] = useState({
    authorName: "",
    userName: "",
    password: "",
    profilePhoto: "",
    authorBio: "",
    
    verifiedBadge: false,
    
   
    profileStatus: "Active",
    sortOrder: 0,
    featuredVideoUrl: "",
    videoText: "",
  });

  const [loading, setLoading] = useState(false);

  // Load data if editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`/api/admin/authors/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData((prev) => ({ ...prev, ...data }));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };
    const handleCkChange = (field, event, editor) => {
        const data = editor.getData();
        setFormData({ ...formData, [field]: data });
    };

const handleSubmit = async (e) => {
  e.preventDefault();

  const method = id ? "PUT" : "POST";
  const url = id ? `/api/admin/authors/${id}` : `/api/admin/authors`;

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData), // ✅ send as JSON
    });

    if (!res.ok) {
      const err = await res.json();
      alert("Error: " + (err.error || "Failed to save author"));
      return;
    }

    alert(id ? "Author updated successfully!" : "Author created successfully!");
    router.push("/admin/author-list");
  } catch (error) {
    console.error("Save failed:", error);
    alert("Something went wrong!");
  }
};


  if (loading) return <div className="container py-4">Loading...</div>;

  return (
    <div className="container py-4">
      <h3>{id ? "Edit Author" : "Add Author"}</h3>
      <form onSubmit={handleSubmit}>
        {/* Author Name */}
     <div className="row">   <div className="mb-3 col-md-6">
          <label>Author Name</label>
          <input
            type="text"
            name="authorName"
            className="form-control"
            value={formData.authorName}
            onChange={handleChange}
          />
        </div>
 <div className="mb-3 col-md-6">
          <label>Author Designation</label>
          <input
            type="text"
            name="authorDisignation"
            className="form-control"
            value={formData.authorDisignation}
            onChange={handleChange}
          />
        </div></div> 
        {/* User Name */}
        <div className="row">
        <div className="mb-3 col-md-4">
          <label>User Name</label>
          <input
            type="text"
            name="userName"
            className="form-control"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>
 <div className="mb-3 col-md-4">
          <label>Email</label>
          <input
            type="email"
            name="userEmail"
            className="form-control"
            value={formData.userEmail}
            onChange={handleChange}
          />
        </div>
        {/* Password */}
        <div className="mb-3 col-md-4">
          <label>Password</label>
          <input
            type="password"
            name="password"  autoComplete="off"   
  autoCorrect="off"
  autoCapitalize="off"
  spellCheck={false}
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        </div>

        {/* Profile Photo */}
        <div className="mb-3">
          <label className="form-label">Featured Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;

              const formDataImg = new FormData();
              formDataImg.append("file", file);

              const res = await fetch("/api/upload-author", {
                method: "POST",
                body: formDataImg,
              });

              const data = await res.json();
              if (data.url) {
                setFormData({ ...formData, profilePhoto: data.url });
              }
            }}
          />
          <input
            type="text"
            name="profilePhoto"
            className="form-control mt-2"
            value={formData.profilePhoto}
            onChange={handleChange}
          />
          {formData.profilePhoto && (
            <div className="mt-2">
              <img
                src={formData.profilePhoto}
                alt="profilePhoto"
                style={{ maxWidth: "200px", borderRadius: "8px" }}
              />
            </div>
          )}
        </div>
   <div className="mb-3">
          <label className="form-label">Team Banner </label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;

              const formDataImg = new FormData();
              formDataImg.append("file", file);

              const res = await fetch("/api/upload-author", {
                method: "POST",
                body: formDataImg,
              });

              const data = await res.json();
              if (data.url) {
                setFormData({ ...formData, profileBanner: data.url });
              }
            }}
          />
          <input
            type="text"
            name="profileBanner"
            className="form-control mt-2"
            value={formData.profileBanner}
            onChange={handleChange}
          />
          {formData.profileBanner && (
            <div className="mt-2">
              <img
                src={formData.profileBanner}
                alt="profileBanner"
                style={{ maxWidth: "200px", borderRadius: "8px" }}
              />
            </div>
          )}
        </div>

        {/* Author Bio */}
        <div className="mb-3">
          <label>Author Bio</label>
          {typeof window !== "undefined" && (
         <CKEditor
         
                                     editor={ClassicEditor}
                                     data={formData.authorBio}
                                     onChange={(event, editor) =>
                                         handleCkChange("authorBio", event, editor)
                                     }
                                     config={{
                                         placeholder: "Start writing here...",
         
                                         // Use contentStyle to add inline CSS
                                         contentStyle: "body { min-height: 300px; }",
         
                                         // prevents React from trying to "fix" the raw DOM
                                         ignoreEmptyParagraph: true,
                                     }}
                                 />
                                 
          )}
        </div>
  <div className="mb-3">
          <label>Author Description</label>
          {typeof window !== "undefined" && (
         <CKEditor
         
                                     editor={ClassicEditor}
                                     data={formData.authorDescription}
                                     onChange={(event, editor) =>
                                         handleCkChange("authorDescription", event, editor)
                                     }
                                     config={{
                                         placeholder: "Start writing here...",
         
                                         // Use contentStyle to add inline CSS
                                         contentStyle: "body { min-height: 300px; }",
         
                                         // prevents React from trying to "fix" the raw DOM
                                         ignoreEmptyParagraph: true,
                                     }}
                                 />
                                 
          )}
        </div>
        {/* Status */}
        <div className="mb-3">
          <label>Status</label>
          <select
            className="form-control"
            name="profileStatus"
            value={formData.profileStatus}
            onChange={handleChange}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* Featured Video */}
        <div className="mb-3">
          <label>Featured Video URL</label>
          <input
            type="url"
            name="featuredVideoUrl"
            className="form-control"
            value={formData.featuredVideoUrl}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Video Description</label>
          <input
            type="text"
            name="videoText"
            className="form-control"
            value={formData.videoText}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? "Update Author" : "Save Author"}
        </button>
      </form>
    </div>
  );
}
