"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Form, Button } from "react-bootstrap";
import CKEditorWrapper from "@/components/CKEditorWrappers";
import JoditCDNEditor from "@/components/JoditCDNEditor";

// ✅ Load CKEditor only on client
// const CKEditorWrapper = dynamic(() => import("@/components/CKEditorWrappers"), {
//   ssr: false,
//   loading: () => <p>Loading editor...</p>,
// });

export default function BrandEditor({ searchParams }) {
  const id = searchParams?.id;
  const router = useRouter();

  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);

  // ✅ Initial form state with missing fields added
  const [formData, setFormData] = useState({
    brandName: "",
    brandh2Title: "",
    pageSlug: "",
    brandTitle: "",
    brandUrl: "",
    brandLogo: "",
    category: "",
    categoryTitle: "",
    country: "",
    featuredBrand: false,
    popularBrand: false,
    trendingBrand: false,
    status: "Active",
    aboutCompany: "",
    seoTitle: "",
    seoKeywords: "",
    seoDescription: "",
    whyChoose: [""],
    bestDeals: [""],
    latestCoupons: [{ code: "", discount: "" }],
    stepsToUse: [""],
    plans: [{ plan: "", price: "" }],
    seasonalSales: "",
    paymentMethods: [],
    customerSupport: [""],
    faqs: [],
    brandEditor: [],
  });

  // ✅ Fetch countries & categories
  useEffect(() => {
    const loadData = async () => {
      try {
        const [countryRes, categoryRes] = await Promise.all([
          fetch("/api/countries"),
          fetch("/api/categories"),
        ]);

        if (countryRes.ok) setCountries(await countryRes.json());
        if (categoryRes.ok) setCategories(await categoryRes.json());
      } catch (err) {
        console.error("Failed to load data", err);
      }
    };
    loadData();
  }, []);

  // ✅ Fetch brand if editing
  useEffect(() => {
    if (id) {
      fetch(`/api/admin/brands/${id}`)
        .then((res) => res.json())
        .then((data) =>
          setFormData({
            ...formData,
            ...data,
            brandEditor: Array.isArray(data.brandEditor)
              ? data.brandEditor.map((ed) =>
                  typeof ed === "string"
                    ? { content: ed, position: "default" }
                    : { content: ed.content || "", position: ed.position || "default" }
                )
              : [{ content: data.brandEditor || "", position: "default" }],
          })
        )
        .catch((err) => console.error("Error loading brand", err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ✅ Helpers
  const addField = (field, obj = null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], obj || ""],
    }));
  };

  const handleArrayChange = (e, field, index, key = null) => {
    const newArray = [...formData[field]];
    if (key) {
      newArray[index][key] = e.target.value;
    } else {
      newArray[index] = e.target.value;
    }
    setFormData({ ...formData, [field]: newArray });
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "brandName") {
      setFormData({
        ...formData,
        brandName: value,
        pageSlug: generateSlug(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = id ? "PUT" : "POST";
    const url = id ? `/api/admin/brands/${id}` : `/api/admin/brands`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Brand saved successfully!");
        router.push("/admin/brands");
      } else {
        alert("Error saving brand");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong while saving");
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Edit Brand" : "Add New Brand"}</h2>

      <form onSubmit={handleSubmit} className="mt-3">
        {/* SEO Details */}
        <fieldset className="mt-4">
          <legend>SEO Details</legend>
          <div className="row">
            <Form.Group className="col-md-6">
              <Form.Label>SEO Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="SEO Title"
                name="seoTitle"
                value={formData.seoTitle}
                onChange={handleChange}
                className="mb-2"
              />
            </Form.Group>
            <Form.Group className="col-md-6">
              <Form.Label>SEO Keyword</Form.Label>
              <Form.Control
                type="text"
                placeholder="SEO Keywords"
                name="seoKeywords"
                value={formData.seoKeywords}
                onChange={handleChange}
                className="mb-2"
              />
            </Form.Group>
            <Form.Group className="col-md-12">
              <Form.Label>SEO Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="SEO Description"
                name="seoDescription"
                value={formData.seoDescription}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
        </fieldset>

        {/* Country + Category + BrandName */}
        <div className="row">
          <div className="mb-3 col-md-4">
            <label className="form-label">Select Country</label>
            <select
              name="country"
              className="form-control"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">-- Select Country --</option>
              {countries.map((country) => (
                <option key={country.countryCode} value={country.countryCode}>
                  {country.countryName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3 col-md-4">
            <label className="form-label">Select Categories</label>
            <select
              name="category"
              className="form-control"
              value={formData.category}
              onChange={(e) => {
                const selectedOption = e.target.options[e.target.selectedIndex];
                const categoryId = selectedOption.value;
                const categoryTitle = selectedOption.getAttribute("data-title");

                setFormData((prev) => ({
                  ...prev,
                  category: categoryId,
                  categoryTitle: categoryTitle,
                }));
              }}
            >
              <option value="">-- Select Categories --</option>
              {categories.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                  data-title={category.categoryTitle}
                >
                  {category.categoryTitle}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3 col-md-4">
            <label className="form-label">Brand Name</label>
            <input
              type="text"
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>
 <div className="mb-3 col-md-12">
            <label className="form-label">Brand H2 Title</label>
            <input
              type="text"
              name="brandh2Title"
              value={formData.brandh2Title}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        {/* Featured Image */}
        <div className="mb-3 col-md-4">
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

              try {
                const res = await fetch("/api/upload", {
                  method: "POST",
                  body: formDataImg,
                });

                const data = await res.json();
                if (data.url) {
                  setFormData((prev) => ({ ...prev, brandLogo: data.url }));
                }
              } catch (err) {
                console.error("Upload failed", err);
                alert("Image upload failed");
              }
            }}
          />
          <input
            type="text"
            name="brandLogo"
            className="form-control"
            value={formData.brandLogo}
            onChange={handleChange}
          />
          {formData.brandLogo && (
            <div className="mt-2">
              <img
                src={formData.brandLogo}
                alt="Featured"
                style={{ maxWidth: "200px", borderRadius: "8px" }}
              />
            </div>
          )}
        </div>

        {/* Slug / Title / URL */}
        <div className="row">
          <div className="mb-3 col-md-4">
            <label className="form-label">Page Slug</label>
            <input
              type="text"
              name="pageSlug"
              value={formData.pageSlug}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3 col-md-4">
            <label className="form-label">Brand Title</label>
            <input
              type="text"
              name="brandTitle"
              value={formData.brandTitle}
              onChange={handleChange}
              className="form-control"
            />
          </div>
 

          <div className="mb-3 col-md-4">
            <label className="form-label">Brand URL</label>
            <input
              type="url"
              name="brandUrl"
              value={formData.brandUrl}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        {/* About Company */}
        {/* <div className="mb-3">
          <label className="form-label">About Company</label>
          <textarea
            name="aboutCompany"
            className="form-control"
            rows="4"
            value={formData.aboutCompany}
            onChange={handleChange}
          ></textarea>
        </div> */}

       

        {/* -- KEEP REST OF YOUR FIELDS (whyChoose, deals, coupons, etc.) -- */}
        {/* Your existing JSX for arrays (whyChoose, bestDeals, coupons, steps, plans, sales, paymentMethods, customerSupport, faqs) stays unchanged */}

        {/* Featured / Popular / Trending */}
        <div className="form-check mb-3 col-md-4">
          <input
            className="form-check-input"
            type="checkbox"
            name="featuredBrand"
            checked={formData.featuredBrand}
            onChange={handleChange}
          />
          <label className="form-check-label">Featured Brand</label>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="popularBrand"
            checked={formData.popularBrand}
            onChange={handleChange}
          />
          <label className="form-check-label">Popular Brand</label>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="trendingBrand"
            checked={formData.trendingBrand}
            onChange={handleChange}
          />
          <label className="form-check-label">Trending Brand</label>
        </div>
 {/* CKEditor - Multiple Editors */}
        <div className="col-md-12">
          {formData.brandEditor.map((editor, index) => (
            <div key={index} className="mb-3 border rounded p-2">
              {/* <CKEditorWrapper
                value={editor.content}
                onChange={(value) => {
                  const newEditors = [...formData.brandEditor];
                  newEditors[index].content = value;
                  setFormData({ ...formData, brandEditor: newEditors });
                }}
              /> */}
             
                 {/* <JoditCDNEditor
      value={editor.content}
      onChange={(value) => {
        const newEditors = [...formData.brandEditor];
        newEditors[index].content = value;
        setFormData({ ...formData, brandEditor: newEditors });
      }}
    /> */}
    <JoditCDNEditor
  value={editor.content}
  onChange={(value) => {
    // ✅ Use 'prev' to ensure you don't overwrite other fields
    setFormData((prev) => {
      const newEditors = [...prev.brandEditor];
      newEditors[index] = { ...newEditors[index], content: value };
      return { ...prev, brandEditor: newEditors };
    });
  }}
/>
              <div className="mt-2">
                <label className="form-label me-2">Position:</label>
                <select
                  value={editor.position}
                  onChange={(e) => {
                    const newEditors = [...formData.brandEditor];
                    newEditors[index].position = e.target.value;
                    setFormData({ ...formData, brandEditor: newEditors });
                  }}
                  className="form-select w-auto d-inline-block"
                >
                  <option value="default">Default</option>
                  <option value="right">Right</option>
                </select>
              </div>
              <Button
                variant="danger"
                size="sm"
                className="mt-2"
                onClick={() =>
                  setFormData({
                    ...formData,
                    brandEditor: formData.brandEditor.filter((_, i) => i !== index),
                  })
                }
                disabled={formData.brandEditor.length === 1}
              >
                Remove
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              setFormData({
                ...formData,
                brandEditor: [...formData.brandEditor, { content: "", position: "default" }],
              })
            }
          >
            + Add Editor
          </Button>
        </div>

           {/* FAQs */}
        <div className="mb-3">
          <label className="form-label">FAQs</label>
       {formData.faqs.map((faq, i) => (
  <div className="mb-4 p-3 border rounded" key={i}>
    {/* Question Input */}
    <input
      type="text"
      placeholder="Question"
      className="form-control mb-2"
      value={faq.question}
      onChange={(e) =>
        handleArrayChange(e, "faqs", i, "question")
      }
    />

    {/* Answer CKEditor */}
    {/* <JoditCDNEditor
      value={faq.answer || ""}
      onChange={(value) => {
        const newFaqs = [...formData.faqs];
        newFaqs[i].answer = value;
        setFormData({ ...formData, faqs: newFaqs });
      }}
    /> */}

<JoditCDNEditor
  value={faq.answer || ""}
  onChange={(value) => {
    // ✅ Use 'prev' here too
    setFormData((prev) => {
      const newFaqs = [...prev.faqs];
      newFaqs[i] = { ...newFaqs[i], answer: value };
      return { ...prev, faqs: newFaqs };
    });
  }}
/>
    <label className="form-label mt-2">Answer Preview:</label>
    <div
      className="mt-2 p-2 border rounded bg-light"
      dangerouslySetInnerHTML={{ __html: faq.answer || "" }}
    />

    {/* Remove Button */}
    <button
      type="button"
      className="btn btn-danger btn-sm mt-2"
      onClick={() => {
        const newFaqs = formData.faqs.filter((_, index) => index !== i);
        setFormData({ ...formData, faqs: newFaqs });
      }}
    >
      Remove FAQ
    </button>
  </div>
))}

{/* Add FAQ Button */}
<button
  type="button"
  className="btn btn-primary btn-sm mt-3"
  onClick={() =>
    setFormData({
      ...formData,
      faqs: [...formData.faqs, { question: "", answer: "" }],
    })
  }
>
  Add FAQ
</button>

  {/* <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={() => addField("faqs", { question: "", answer: "" })}
          >
            + Add FAQ
          </button> */}
        </div>
        {/* Status */}
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-select"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success">
          {id ? "Update Brand" : "Add Brand"}
        </button>
      </form>
    </div>
  ); 
}
