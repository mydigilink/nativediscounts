"use client";
import { useState, useEffect } from "react";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import dynamic from "next/dynamic";
//import { CKEditor } from "@ckeditor/ckeditor5-react";
//import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// ✅ Dynamically import CKEditor


const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then(mod => mod.CKEditor),
  { ssr: true }
);

const ClassicEditor = dynamic(
  () => import("@ckeditor/ckeditor5-build-classic").then(mod => mod.default),
  { ssr: true }
);
// const CKEditor = dynamic(() => import("@ckeditor/ckeditor5-react").then(mod => mod.CKEditor), { ssr: false });
// const ClassicEditor = dynamic(() => import("@ckeditor/ckeditor5-build-classic"), { ssr: false });
// import SourceEditing from "@ckeditor/ckeditor5-source-editing";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import CKEditorWrapper from "@/components/CKEditorWrapper";
import JoditCDNEditor from "@/components/JoditCDNEditor";
export default function BlogEditor({searchParams}) {
      const router = useRouter();
      const [content, setContent] = useState("");
    const [featuredFile, setFeaturedFile] = useState(null);
    const today = new Date().toISOString().split("T")[0];

    const [faqBlocks, setFaqBlocks] = useState([{ question: "", answer: "" }]);
    const [tipBlocks, setTipBlocks] = useState([{ content: "" }]);
    const [relatedArticles, setRelatedArticles] = useState([{ title: "", url: "" }]);

    const addFaqBlock = () => setFaqBlocks([...faqBlocks, { question: "", answer: "" }]);
    const addTipBlock = () => setTipBlocks([...tipBlocks, { content: "" }]);
    const addRelatedArticle = () => setRelatedArticles([...relatedArticles, { title: "", url: "" }]);

   const blogId = searchParams?.id; 
    
    const [formData, setFormData] = useState(null); // null until loaded
    const [loading, setLoading] = useState(!!blogId);
    const [countries, setCountries] = useState([]);
    const [authors, setauthors] = useState([]);
    // Function to create slug from title
    const generateSlug = (text) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "") // remove special chars
            .replace(/\s+/g, "-") // replace spaces with -
            .replace(/-+/g, "-"); // collapse multiple -
    };
    useEffect(() => {
        fetch("/api/countries")
            .then((res) => res.json())
            .then((data) => setCountries(data));
             fetch("/api/authors")
            .then((res) => res.json())
            .then((data) => setauthors(data));
    }, []);
    // Fetch blog if in edit mode
    useEffect(() => {
        if (blogId) {
            fetch(`/api/admin/blogs/${blogId}`)
                .then((res) => res.json())
                .then((data) => {
                    setFormData(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching blog:", err);
                    setLoading(false);
                });
        } else {
            // new blog mode
            setFormData({
                title: "",
                seoTitle: "",
                seoKeywords: "",
                seoDescription: "",
                slug: "",
                schemaEnabled: false,
                featuredImage: "",
                featuredImageAlt: "",
                author: "",
                country: "",
                publishDate: "",
                lastUpdated: "",
                introduction: "",
                bodyContent: "",
                tipBlocks: [],
                faqs: [],
                additionalImages: [],
                videoUrl: "",
                affiliateLinks: [],
                relatedArticles: [],
                authorBio: "",
                socialShare: false,
                newsletterCTA: "",
                ctaButton: { label: "", url: "" },
                commentsEnabled: false,
                status: "Draft",
                sortOrder: 0,
            });
        }
    }, [blogId]);

    if (loading || !formData) return <div className="container">Loading...</div>;

    // const handleChange = (e) => {
    //     const { name, value, type, checked } = e.target;
    //     setFormData({ ...formData,  title: value,
    //     slug: generateSlug(value),  [name]: type === "checkbox" ? checked : value });
    // };
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "title") {
            setFormData({
                ...formData,
                title: value,
                slug: generateSlug(value), // auto-generate slug only when title changes
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === "checkbox" ? checked : value,
            });
        }
    };

    const handleCkChange = (field, event, editor) => {
        const data = editor.getData();
        setFormData({ ...formData, [field]: data });
    };

    // Add FAQ
    const addFaq = () => {
        setFormData({
            ...formData,
            faqs: [...formData.faqs, { question: "", answer: "" }],
        });
    };

    // Add Tip
    const addTip = () => {
        setFormData({
            ...formData,
            tipBlocks: [...formData.tipBlocks, { content: "" }],
        });
    };

    // Add Affiliate Link
    const addAffiliateLink = () => {
        setFormData({
            ...formData,
            affiliateLinks: [...formData.affiliateLinks, { text: "", url: "" }],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();


        try {
            const method = blogId ? "PUT" : "POST";
            const url = blogId ? `/api/blogs/${blogId}` : `/api/blogs`;
            formDataObj.append("data", JSON.stringify(formData)); // blog data
            if (featuredFile) {
                formDataObj.append("featuredImage", featuredFile);
            }
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) alert("Blog saved successfully!");
            else alert("Error saving blog");
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="card">
            <div className="panel p-4">
                <h2>Create Blog Post</h2>
                <form onSubmit={handleSubmit}>
                    {/* Country */}
                    <div className="mb-3 mt-3">
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



                    {/* Article Title */}
                    <div className="mb-3 mt-3">
                        <label className="form-label">Article Title</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Page Slug */}
                    <div className="mb-3">
                        <label className="form-label">Page Slug</label>
                        <input
                            type="text"
                            name="slug"
                            className="form-control"
                            value={formData.slug}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Schema Markup */}
                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            name="schemaEnabled"
                            className="form-check-input"
                            checked={formData.schemaEnabled}
                            onChange={handleChange}
                        />
                        <label className="form-check-label">Enable Schema Markup</label>
                    </div>

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

                                const res = await fetch("/api/upload", {
                                    method: "POST",
                                    body: formDataImg,
                                });

                                const data = await res.json();
                                if (data.url) {
                                    setFormData({ ...formData, featuredImage: data.url });
                                }
                            }}
                        />
                        <input
                            type="text"
                            name="featuredImage"
                            className="form-control"
                            value={formData.featuredImage}
                            onChange={handleChange}
                        />
                        {formData.featuredImage && (
                            <div className="mt-2">
                                <img
                                    src={formData.featuredImage}
                                    alt="Featured"
                                    style={{ maxWidth: "200px", borderRadius: "8px" }}
                                />
                            </div>
                        )}
                    </div>


                    {/* Featured Image Alt Text */}
                    <div className="mb-3">
                        <label className="form-label">Featured Image Alt Text</label>
                        <input
                            type="text"
                            name="featuredImageAlt"
                            className="form-control"
                            value={formData.featuredImageAlt}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Author */}
                    <div className="mb-3 ">
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

                    {/* Publish Date */}
                    <div className="mb-3">
                        <label className="form-label">Publish Date</label>
                        <input
                            type="date"
                            name="publishDate"
                            className="form-control"
                            value={formData.publishDate}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Last Updated */}
                    <div className="mb-3">
                        <label className="form-label">Last Updated</label>
                        <input
                            type="date"
                            name="lastUpdated"
                            className="form-control"
                            value={formData.lastUpdated}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Introduction */}
                    <div className="mb-3">
                        <label className="form-label">Introduction / Lede</label>
                  {/* <CKEditor
  editor={ClassicEditor}
  data={formData.bodyContent || ""}
  onChange={(event, editor) => {
    const data = editor.getData();
    handleCkChange("bodyContent", data);
  }}
/> */}

               <JoditCDNEditor
    value={formData.introduction || ""}
    onChange={(value) =>
      setFormData((prev) => ({
        ...prev,
        introduction: value,
      }))
    }
  />
    {/* <CKEditor

                            editor={ClassicEditor}
                            data={formData.introduction}
                            onChange={(event, editor) =>
                                handleCkChange("introduction", event, editor)
                            }
                            config={{
                                placeholder: "Start writing here...",

                                // Use contentStyle to add inline CSS
                                contentStyle: "body { min-height: 300px; }",

                                // prevents React from trying to "fix" the raw DOM
                                ignoreEmptyParagraph: true,
                            }}
                        /> */}
                    </div>

                    {/* Body Content */}
                    <div className="mb-3">
                        <label className="form-label">Body Content</label>
                        {/* <CKEditor
                            editor={ClassicEditor}
                            data={formData.bodyContent}
                            onChange={(event, editor) =>
                                handleCkChange("bodyContent", event, editor)
                            }
                            config={{
                                // prevents React from trying to "fix" the raw DOM
                                ignoreEmptyParagraph: true,
                            }}
                        />
                      */}
                       <JoditCDNEditor 
                       
    value={formData.bodyContent || ""}
    onChange={(value) =>
      setFormData((prev) => ({
        ...prev,
        bodyContent: value,
      }))
    }
  />
                    </div>

                    {/* FAQs */}
                    <div className="mb-3">
                        <label className="form-label">FAQs</label>
                        {formData.faqs.map((faq, idx) => (
                            <div key={idx} className="border p-3 mb-2">
                                <input
                                    type="text"
                                    placeholder="Question"
                                    className="form-control mb-2"
                                    value={faq.question}
                                    onChange={(e) => {
                                        const faqs = [...formData.faqs];
                                        faqs[idx].question = e.target.value;
                                        setFormData({ ...formData, faqs });
                                    }}
                                />
                                <input
                                    value={faq.answer}
                                    placeholder="Answer"
                                    className="form-control mb-2"
                                    onChange={(val) => {
                                        const faqs = [...formData.faqs];
                                        faqs[idx].answer =  val.target.value;;
                                        setFormData({ ...formData, faqs });
                                    }}
                                />
                                <button
        type="button"
        className="btn btn-sm btn-outline-danger"
        onClick={() => {
          const faqs = formData.faqs.filter((_, i) => i !== idx);
          setFormData({ ...formData, faqs });
        }}
      >
        Remove
      </button>
                            </div>
                        ))}
                             {/* 🔻 Remove Button */}
      
                        <button type="button" className="btn btn-sm btn-outline-primary" onClick={addFaq}>
                            + Add FAQ
                        </button>
                    </div>

                    {/* Tips */}
                    <div className="mb-3 hidden">
                        <label className="form-label">Tip Box / Code Block</label>
                        {formData.tipBlocks.map((tip, idx) => (
                            <textarea
                                key={idx}
                                placeholder="Enter Tip"
                                className="form-control mb-2"
                                value={tip.content}
                                onChange={(e) => {
                                    const tips = [...formData.tipBlocks];
                                    tips[idx].content = e.target.value;
                                    setFormData({ ...formData, tipBlocks: tips });
                                }}
                            />
                        ))}
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={addTip}>
                            + Add Tip
                        </button>
                    </div>

                    {/* Affiliate Links */}
                    <div className="mb-3 hidden">
                        <label className="form-label">Affiliate Links</label>
                        {formData.affiliateLinks.map((link, idx) => (
                            <div key={idx} className="d-flex mb-2">
                                <input
                                    type="text"
                                    placeholder="Text"
                                    className="form-control me-2"
                                    value={link.text}
                                    onChange={(e) => {
                                        const links = [...formData.affiliateLinks];
                                        links[idx].text = e.target.value;
                                        setFormData({ ...formData, affiliateLinks: links });
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="URL"
                                    className="form-control"
                                    value={link.url}
                                    onChange={(e) => {
                                        const links = [...formData.affiliateLinks];
                                        links[idx].url = e.target.value;
                                        setFormData({ ...formData, affiliateLinks: links });
                                    }}
                                />
                            </div>
                        ))}
                        <button type="button" className="btn btn-sm btn-outline-success" onClick={addAffiliateLink}>
                            + Add Link
                        </button>
                    </div>



                    {/* Social Share */}
                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            name="socialShare"
                            className="form-check-input"
                            checked={formData.socialShare}
                            onChange={handleChange}
                        />
                        <label className="form-check-label">Enable Social Share Buttons</label>
                    </div>
                    {/* 
                    <div className="mb-3 d-flex">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Button Label"
                            value={formData.ctaButton.label}
                            onChange={(e) =>
                                setFormData({ ...formData, ctaButton: { ...formData.ctaButton, label: e.target.value } })
                            }
                        />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Button URL"
                            value={formData.ctaButton.url}
                            onChange={(e) =>
                                setFormData({ ...formData, ctaButton: { ...formData.ctaButton, url: e.target.value } })
                            }
                        />
                    </div> */}

                    {/* Enable Comments */}
                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            name="commentsEnabled"
                            className="form-check-input"
                            checked={formData.commentsEnabled}
                            onChange={handleChange}
                        />
                        <label className="form-check-label">Enable Comments</label>
                    </div>

                    {/* Sort Order */}
                    {/* <div className="mb-3">
                        <label className="form-label">Sort Order</label>
                        <input
                            type="number"
                            name="sortOrder"
                            className="form-control"
                            value={formData.sortOrder}
                            onChange={handleChange}
                        />
                    </div> */}

                    {/* Status */}
                    <div className="mb-3">
                        <label className="form-label">Article Status</label>
                        <select
                            name="status"
                            className="form-select"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="Draft">Draft</option>
                            <option value="Published">Published</option>
                            <option value="Archived">Archived</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        {blogId ? "Update Blog" : "Create Blog"}
                    </button>
                </form>
            </div></div>
    );
}
