"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Form, Button } from "react-bootstrap";

export default function CountryEditor({ searchParams }) {
  const id = searchParams?.id; // from server props
  const router = useRouter();

  const [formData, setFormData] = useState({
    heroImages: [],
   
    dealTitle: "",
    categoryTiles: [],
    autoSelectFilters: "",
    manualFeaturedCodes: [],
    trustBadgeText: "",
    trustBadgeIcon: "",
    appPromoBanner: { image: "", url: "" },
    newsletter: { headline: "", subtext: "", buttonText: "", buttonLink: "" },
    footerLinks: [],
    socialMediaLinks: [],
    activeStatus: true,
    seoTitle: "",
    seoKeywords: "",
    seoDescription: "",
    countryImage: "",
    countryName: "",
    countryCode: "",
    countryCurrency: "",
    countryLanguage: "",
    countryH1Title: "",
    countryFeaturedBrandTitle: "",
  });

  // Fetch country data when editing
  useEffect(() => {
    if (id) {
      fetch(`/api/countries/${id}`)
        .then((res) => res.json())
        .then((data) =>
          setFormData({
            heroImages: (data.heroImages || []).map((img) =>
              typeof img === "string"
                ? { image: img, name: "", alt: "", link: "" }
                : { image: img.image || "", name: img.name || "", alt: img.alt || "", link: img.link || "" }
            ),
            featuredStoreLogos: data.featuredStoreLogos || [],
            featuredOffers: data.featuredOffers || [],
            categoryTiles: data.categoryTiles || [],
          
            newsletter: data.newsletter || { headline: "", subtext: "", buttonText: "", buttonLink: "" },
         
            ...data,
          })
        );
    }
  }, [id]);

  // Handle simple inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle nested object inputs
  const handleNestedChange = (section, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  // Handle array item field changes
  const handleArrayChange = (field, index, key, value) => {
    setFormData((prev) => {
      const updated = [...prev[field]];
      if (key) updated[index][key] = value;
      else updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  // Add new array item
  const addArrayItem = (field, item) =>
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], item] }));

  // Remove array item
  const removeArrayItem = (field, index) =>
    setFormData((prev) => {
      const updated = [...prev[field]];
      updated.splice(index, 1);
      return { ...prev, [field]: updated };
    });

  // Handle file uploads
  const handleFileUpload = async (e, field, folder, index = null, key = null) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    const res = await fetch(`/api/upload/${folder}`, {
      method: "POST",
      body: formDataUpload,
    });

    const data = await res.json();
    if (data.url) {
      setFormData((prev) => {
        const updated = { ...prev };

        // if field is an array (like heroImages)
        if (Array.isArray(updated[field])) {
          if (index !== null) {
            if (typeof updated[field][index] === "string") {
              updated[field][index] = { image: data.url, name: "", alt: "", link: "" };
            } else {
              updated[field][index].image = data.url;
            }
          } else {
            updated[field] = [...updated[field], { image: data.url, name: "", alt: "", link: "" }];
          }
        }
        // if nested object
        else if (key) {
          updated[field] = { ...updated[field], [key]: data.url };
        }
        // else fallback single field
        else {
          updated[field] = data.url;
        }

        return updated;
      });
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id ? `/api/countries/${id}` : "/api/countries";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Country saved successfully!");
      router.push("/admin/countries");
    } else {
      alert("Failed to save country");
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mt-0">
        <h2>{id ? "Edit Country" : "Add New Country"}</h2>
        <Form onSubmit={handleSubmit}>
          {/* SEO */}
          <fieldset className="mt-4">
            <legend>SEO Details</legend>
            <div className="row">
              <Form.Group controlId="SEOTitle" className="col-md-6">
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

          <div className="row">
            {/* Country Basics */}
            <Form.Group className="mb-3 mt-3 col-md-3">
              <Form.Label>Country Image</Form.Label>
              {formData.countryImage && (
                <img src={formData.countryImage} width="40" className="mx-2" />
              )}
              <Form.Control
                type="file"
                onChange={(e) => handleFileUpload(e, "countryImage", "countries")}
              />
            </Form.Group>

            <Form.Group className="mb-3 mt-3 col-md-2">
              <Form.Label>Country Name</Form.Label>
              <Form.Control
                type="text"
                name="countryName"
                value={formData.countryName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 mt-3 col-md-2">
              <Form.Label>Country Code</Form.Label>
              <Form.Control
                type="text"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 mt-3 col-md-3">
              <Form.Label>Country Language (Href Lang)</Form.Label>
              <Form.Control
                type="text"
                name="countryLanguage"
                value={formData.countryLanguage}
                onChange={handleChange}
              />
            </Form.Group>
             <Form.Group className="mb-3 mt-3 col-md-2">
              <Form.Label>Country Currency </Form.Label>
              <Form.Control
                type="text"
                name="countryCurrency"
                value={formData.countryCurrency}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3 mt-3 col-md-12">
              <Form.Label>Country H1 Title</Form.Label>
              <Form.Control
                type="text"
                name="countryH1Title"
                value={formData.countryH1Title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3 mt-3 col-md-12">
              <Form.Label>Featured Brand Title:</Form.Label>
              <Form.Control
                type="text"
                name="countryFeaturedBrandTitle"
                value={formData.countryFeaturedBrandTitle}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Hero Images */}
            <h5>Hero Banners</h5>
            {formData.heroImages.map((hero, index) => (
              <div key={index} className="border rounded p-3 mb-3">
                <div className="d-flex mb-2 align-items-center">
                  {hero.image && (
                    <img
                      src={hero.image}
                      alt={hero.alt || "Hero"}
                      width="100"
                      className="me-2 rounded"
                    />
                  )}
                  <Form.Control
                    type="file"
                    onChange={(e) => handleFileUpload(e, "heroImages", "countries", index)}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => removeArrayItem("heroImages", index)}
                  >
                    Remove
                  </Button>
                </div>

                <Form.Group className="mb-2">
                  <Form.Label>Hero Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={hero.name || ""}
                    onChange={(e) =>
                      handleArrayChange("heroImages", index, "name", e.target.value)
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Alt Text</Form.Label>
                  <Form.Control
                    type="text"
                    value={hero.alt || ""}
                    onChange={(e) =>
                      handleArrayChange("heroImages", index, "alt", e.target.value)
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    type="text"
                    value={hero.link || ""}
                    onChange={(e) =>
                      handleArrayChange("heroImages", index, "link", e.target.value)
                    }
                  />
                </Form.Group>
              </div>
            ))}

            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                addArrayItem("heroImages", { image: "", name: "", alt: "", link: "" })
              }
            >
              + Add Hero Banner
            </Button>

            {/* Active Status */}
            <Form.Group className="mt-3 hidden">
              <Form.Check
                type="checkbox"
                label="Active"
                name="activeStatus"
                checked={formData.activeStatus}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" variant="success" className="mt-3">
              {id ? "Update Country" : "Create Country"}
            </Button>
          </div>
        </Form>
      </div>
    </Suspense>
  );
}
