"use client";

import {use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "bootstrap/dist/css/bootstrap.min.css";
import CKEditorWrapper from "@/components/CKEditorWrappers";
import JoditCDNEditor from "@/components/JoditCDNEditor";
// ✅ CKEditor – client only
const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
  { ssr: false }
);
const ClassicEditor = dynamic(
  () => import("@ckeditor/ckeditor5-build-classic"),
  { ssr: false }
);

export default function CouponForm({ searchParams }) {
  const router = useRouter();
 const params = use(searchParams);
  const id = params?.id;

  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [formData, setFormData] = useState({
    enabled: true,
    image: "",
    brand: "",
    offerType: "",
    couponCode: "",
    discount: "",
    inputType: "",
    headline: "",
    title: "",
    link: "",
    shortDescription: "",
    likes: 0,
    startDate: "",
    endDate: "",
    status: "",
    description: "",
    termsconditions: "",
    addedby: "",
    authors: "",
  });

  // ✅ Mount guard (fixes window undefined)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch brands & authors
  useEffect(() => {
    const loadData = async () => {
      const [brandsRes, authorsRes] = await Promise.all([
        fetch("/api/brands"),
        fetch("/api/authors"),
      ]);
      setBrands(await brandsRes.json());
      setAuthors(await authorsRes.json());
    };
    loadData();
  }, []);

  // Fetch coupon (edit mode)
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchCoupon = async () => {
      try {
        const res = await fetch(`/api/admin/coupons/${id}`);
        const data = await res.json();

        setFormData({
          ...data,
          startDate: data.startDate?.slice(0, 10) || "",
          endDate: data.endDate?.slice(0, 10) || "",
        });
      } catch (err) {
        console.error("Error fetching coupon:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupon();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCkChange = (field, event, editor) => {
    setFormData((prev) => ({
      ...prev,
      [field]: editor.getData(),
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const isEdit = Boolean(id);

    const res = await fetch(
      isEdit ? `/api/admin/coupons/${id}` : "/api/admin/coupons",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    if (!res.ok) {
      alert("Something went wrong");
      return;
    }

    alert(`Coupon ${isEdit ? "Updated" : "Created"} Successfully!`);

    // ✅ Redirect ONLY on PUT
    if (isEdit) {
      router.push("/admin/coupon-list");
    }
  } catch (err) {
    console.error(err);
    alert("Failed to save coupon");
  }
};


  if (!isMounted || loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  return (
    <div className="container mt-4">
          <h3>{id ? "Edit Coupon" : "Create Coupon"}</h3>
      <form onSubmit={handleSubmit} className="row g-3">

        {/* Enable/Disable */}
        <div className="col-12 form-check">
          <input
            type="checkbox"
            name="enabled"
            className="form-check-input"
            checked={formData.enabled}
            onChange={handleChange}
          />
          <label className="form-check-label">Enable Coupon</label>
        </div>

        {/* Image Upload */}
        <div className="col-md-4">
          <label className="form-label">Coupon Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const formDataImg = new FormData();
              formDataImg.append("file", file);

              const res = await fetch("/api/upload", {
                method: "POST",
                body: formDataImg,
              });

              const data = await res.json();
              if (data.url) {
                setFormData({ ...formData, image: data.url });
              }
            }}
          />
          <input
            type="text"
            name="image"
            className="form-control mt-2"
            value={formData.image}
            onChange={handleChange}
          />
          {formData.image && (
            <div className="mt-2">
              <img src={formData.image} alt="Featured" style={{ maxWidth: "200px", borderRadius: "8px" }} />
            </div>
          )}
        </div>

        {/* Brand */}
        <div className="col-md-4">
          <label className="form-label">Select Brand</label>
          <select
            name="brand"
            className="form-select"
            value={formData.brand}
            onChange={handleChange}
          >
            <option value="">-- Select Brand --</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand.pageSlug}>
                {brand.brandName} ({brand.country?.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        {/* Offer Type */}
        <div className="col-md-4">
          <label className="form-label">Offer Type</label>
          <select
            className="form-control"
            name="offerType"
            value={formData.offerType}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="1">Code</option>
            <option value="2">Sale</option>
            <option value="3">Discount</option>
            <option value="4">Mobile App</option>
            <option value="5">Cashback</option>
            <option value="6">Giftcard</option>
          </select>
        </div>

        {/* Coupon Code */}
        <div className="col-md-3">
          <label className="form-label">Coupon Code</label>
          <input
            type="text"
            name="couponCode"
            className="form-control"
            value={formData.couponCode}
            onChange={handleChange}
          />
        </div>

        {/* Discount */}
        <div className="col-md-3">
          <label className="form-label">Discount</label>
          <input
            type="text"
            name="discount"
            className="form-control"
            value={formData.discount}
            onChange={handleChange}
          />
        </div>
  <div className="col-md-3">
          <label className="form-label">Added By</label>
          <input
            type="text"
            name="addedby"
            className="form-control"
            value={formData.addedby}
            onChange={handleChange}
          />
        </div>

        {/* Input Type */}
        <div className="col-md-3">
          <label className="form-label">Select Input Type</label>
          <select
            name="inputType"
            className="form-control"
            value={formData.inputType}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="1">Exclusive</option>
            <option value="2">Event Deal</option>
            <option value="3">Popular</option>
          </select>
        </div>

        {/* Headline */}
        <div className="col-md-8">
          <label className="form-label">Offer Headline</label>
          <input
            type="text"
            name="headline"
            className="form-control"
            value={formData.headline}
            onChange={handleChange}
          />
        </div>
 <div className="mb-3  col-md-4">
                        <label className="form-label">Author</label>
                        {/* <input
                            type="text"
                            name="author"
                            className="form-control"
                            value={formData.author}
                            onChange={handleChange}
                        /> */}
                        <select
                            name="authors"
                            className="form-control"
                            value={formData.authors}
                            onChange={handleChange}
                        >
                            <option value="">-- Select Author --</option>
                            {authors.map((author) => (
                                <option key={author.authorName} value={author.userName}>
                                    {author.authorName}
                                </option>
                            ))}
                        </select>
                    </div>

        {/* Title */}
        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* Link */}
        <div className="col-md-6">
          <label className="form-label">Link</label>
          <input
            type="text"
            name="link"
            className="form-control"
            value={formData.link}
            onChange={handleChange}
          />
        </div>

        {/* Short Description */}
        <div className="col-md-12">
          <label className="form-label">Short Description</label>
            <input
            type="text"
            name="shortDescription"
            className="form-control"
            value={formData.shortDescription}
            onChange={handleChange}
          />
            {/* <CKEditor
            editor={ClassicEditor}
            data={formData.shortDescription}
            onChange={(event, editor) =>
              handleCkChange("shortDescription", event, editor)
            }
            config={{
              placeholder: "Start writing here...",
              contentStyle: "body { min-height: 300px; }",
              ignoreEmptyParagraph: true,
            }}
          /> */}
          {/* <textarea
            name="shortDescription"
            className="form-control"
            value={formData.shortDescription}
            onChange={handleChange}
          /> */}
        </div>

        {/* Likes */}
        <div className="col-md-3">
          <label className="form-label">Likes</label>
          <input
            type="number"
            name="likes"
            className="form-control"
            value={formData.likes}
            onChange={handleChange}
          />
        </div>

        {/* Dates */}
        <div className="col-md-3">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            name="startDate"
            className="form-control"
           value={
      formData.startDate ||
      new Date().toISOString().split("T")[0] // current date in yyyy-mm-dd
    }
    onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">End Date</label>
          <input
            type="date"
            name="endDate"
            className="form-control"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        {/* Status */}
        <div className="col-md-3">
          <label className="form-label">Select Status</label>
          <select
            className="form-control"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="0">Inactive</option>
            <option value="1">Active</option>
            <option value="3">Expired</option>
          </select>
        </div>

        {/* Description */}
        {/* <div className="col-md-12">
          <label className="form-label">Description</label>
          <CKEditor
            editor={ClassicEditor}
            data={formData.description}
            onChange={(event, editor) =>
              handleCkChange("description", event, editor)
            }
            config={{
              placeholder: "Start writing here...",
              contentStyle: "body { min-height: 300px; }",
              ignoreEmptyParagraph: true,
            }}
          />
        </div> */}
 <div className="col-md-12">
          <label className="form-label">Terms & Conditions</label>
          {console.log("formData.termsconditions",formData.termsconditions)}
       
  <JoditCDNEditor
    value={formData.termsconditions || ""}
    onChange={(value) =>
      setFormData((prev) => ({
        ...prev,
        termsconditions: value,
      }))
    }
  />

  {/* Optional preview */}
  {/* <div className="mt-3 p-3 border rounded bg-light">
    <strong>Preview:</strong>
    <div
      dangerouslySetInnerHTML={{
        __html: formData.termsconditions || "",
      }}
    />
  </div> */}
     {/* <CKEditor
            editor={ClassicEditor}
              data={formData.termsconditions || ""}
  // onReady={(editor) => {
  //   editorRef.current = editor;
  // }}
            onChange={(event, editor) =>
              handleCkChange("termsconditions", event, editor)
            }
            config={{
              placeholder: "Start writing here...",
              contentStyle: "body { min-height: 300px; }",
              ignoreEmptyParagraph: true,
            }}
          /> */}
        </div>

        {/* Submit */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            {id ? "Update Coupon" : "Save Coupon"}
          </button>
        </div>
      </form>
    </div>
  );
}
