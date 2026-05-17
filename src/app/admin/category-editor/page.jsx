
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import {  useRouter } from "next/navigation";
export default function CategoryEditor({searchParams}) {
   const id = searchParams?.id;
  const router = useRouter();
  const [formData, setFormData] = useState({
    categoryTitle: "",
    seoTitle: "",
    seoKeywords: "",
    seoDescription: "",
    pageSlug: "",

    heroBannerImage: "",
    heroHeading: "",
    heroSubheading: "",

    featuredMerchantLogos: [],
    featuredStoresTitle: "",

    subCategoryBlocks: [{ name: "", icon: "", link: "" }],
    filterTitle: "",

    automatedDealsRules: "",
    manualFeaturedDeals: [{ dealTitle: "", url: "" }],

    introText: "",
    savingsTips: "",

    trustCopy: "",
    trustIconImage: "",

    dealsPerPage: 20,
    infiniteScrollEnabled: false,

    affiliateNetwork: "",
    defaultUtmParams: "",

    status: "Active",
    sortOrder: 0,
    lastUpdated: new Date().toISOString(),
  });

  const [loading, setLoading] = useState(false);

  // Load existing data if editing
  useEffect(() => {
    if (id) {
      axios.get(`/api/admin/categories/${id}`).then((res) => {
        setFormData({ ...formData, ...res.data });
      });
    }
  }, [id]);

  // Handle change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
     if (name === "categoryTitle") {
      setFormData((prev) => ({
        ...prev,
        categoryTitle: value,
        pageSlug: generateSlug(value), // auto-generate slug only when title changes

      }));

    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

    }

  };

  // Handle file upload
  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);

    const res = await axios.post(`/api/upload/category`, data);
    setFormData((prev) => ({ ...prev, [fieldName]: res.data.url }));
  };
    const generateSlug = (text) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "") // remove special chars
            .replace(/\s+/g, "-") // replace spaces with -
            .replace(/-+/g, "-"); // collapse multiple -
    };
  // Add item to repeater
  const addRepeater = (field, item) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], item],
    }));
  };

  // Update repeater item
  const updateRepeater = (field, index, key, value) => {
    const updated = [...formData[field]];
    updated[index][key] = value;
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  // Submit form
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     if (id) {
  //       await axios.put(`/api/admin/categories/${id}`, formData);
  //     } else {
  //       await axios.post("/api/admin/categories", formData);
  //     }
  //     router.push("/admin/categories");
  //   } catch (err) {
  //     console.error("Error saving category:", err);
  //   }
  //   setLoading(false);
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  const method = id ? "PUT" : "POST";
  const url = id ? `/api/admin/categories/${id}` : "/api/admin/categories";

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Category saved successfully!");
      router.push("/admin/categories");
    } else {
      const errorData = await res.json();
      alert(`Failed to save category: ${errorData.error || "Unknown error"}`);
    }
  } catch (err) {
    console.error("Error saving category:", err);
    alert("An unexpected error occurred.");
  }
};


  return (
    <div className="container mt-4">
      <h2>{id ? "Edit Category" : "Add Category"}</h2>
      <form onSubmit={handleSubmit} className="row g-3">
  <fieldset className="mt-4">
          <legend>SEO Details</legend>
          <div className="row">
            <Form.Group controlId="SEOTitle" className="col-md-6">
              <Form.Label >SEO Title</Form.Label>
              <Form.Control type="text" placeholder="SEO Title" name="seoTitle" value={formData.seoTitle} onChange={handleChange} className="mb-2" />
            </Form.Group>
            <Form.Group className="col-md-6">
              <Form.Label>SEO Keyword</Form.Label> <Form.Control type="text" placeholder="SEO Keywords" name="seoKeywords" value={formData.seoKeywords} onChange={handleChange} className="mb-2" />
            </Form.Group>
            <Form.Group className="col-md-12">
              <Form.Label>SEO Description</Form.Label>
              <Form.Control type="text" placeholder="SEO Description" name="seoDescription" value={formData.seoDescription} onChange={handleChange} />
            </Form.Group>
          </div>
        </fieldset>
        {/* Meta & SEO */}
        <div className="col-md-4">
          <label className="form-label">Category Title</label>
          <input
            name="categoryTitle"
            value={formData.categoryTitle}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      <div className="col-md-4">
          <label className="form-label">Category Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => handleFileUpload(e, "categoryImage")}
          />
          {formData.categoryImage && (
            <img src={formData.categoryImage} alt="Hero" width="150" />
          )}
        </div>
          <input
          type="hidden"
            name="pageSlug"
            value={formData.pageSlug}
            onChange={handleChange}
            className="form-control"
          />
        
      

        {/* Hero Header */}
        <div className="col-md-4">
          <label className="form-label">Hero Banner</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => handleFileUpload(e, "heroBannerImage")}
          />
          {formData.heroBannerImage && (
            <img src={formData.heroBannerImage} alt="Hero" width="150" />
          )}
        </div>
        <div className="col-md-12">
          <label className="form-label">Hero Heading</label>
          <input
            name="heroHeading"
            value={formData.heroHeading}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Featured Merchant Logos */}
        {/* <div className="col-12">
          <label className="form-label">Featured Merchant Logos</label>
          <button
            type="button"
            className="btn btn-sm btn-secondary mb-2"
            onClick={() => addRepeater("featuredMerchantLogos", "")}
          >
            Add Logo
          </button>
          {formData.featuredMerchantLogos.map((logo, i) => (
            <div key={i} className="mb-2">
              <input
                type="file"
                className="form-control"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const data = new FormData();
                  data.append("file", file);
                  const res = await axios.post(`/api/upload/category`, data);
                  const updated = [...formData.featuredMerchantLogos];
                  updated[i] = res.data.url;
                  setFormData((prev) => ({
                    ...prev,
                    featuredMerchantLogos: updated,
                  }));
                }}
              />
              {logo && <img src={logo} alt="logo" width="80" />}
            </div>
          ))}
        </div> */}

        {/* Sub-Categories */}
        {/* <div className="col-12">
          <h5>Sub Categories</h5>
          {formData.subCategoryBlocks.map((sub, i) => (
            <div key={i} className="row g-2 mb-2">
              <div className="col-md-3">
                <input
                  placeholder="Name"
                  value={sub.name}
                  className="form-control"
                  onChange={(e) =>
                    updateRepeater("subCategoryBlocks", i, "name", e.target.value)
                  }
                />
              </div>
              <div className="col-md-3">
                <input
                  placeholder="Icon URL"
                  value={sub.icon}
                  className="form-control"
                  onChange={(e) =>
                    updateRepeater("subCategoryBlocks", i, "icon", e.target.value)
                  }
                />
              </div>
              <div className="col-md-4">
                <input
                  placeholder="Link"
                  value={sub.link}
                  className="form-control"
                  onChange={(e) =>
                    updateRepeater("subCategoryBlocks", i, "link", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() =>
              addRepeater("subCategoryBlocks", { name: "", icon: "", link: "" })
            }
          >
            Add Sub-Category
          </button>
        </div> */}

        {/* Status & Submit */}
        <div className="col-md-4 hidden">
          <label className="form-label">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-select"
          >
            <option selected value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>

        <div className="col-12">
          <button className="btn btn-success" disabled={loading}>
            {loading ? "Saving..." : "Save Category"}
          </button>
        </div>
      </form>
    </div>
  );
}
