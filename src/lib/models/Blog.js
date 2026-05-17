import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: String,
  seoTitle: String,
  seoKeywords: String,
  seoDescription: String,
  slug: String,
  schemaEnabled: Boolean,
  featuredImage: String,
  featuredImageAlt: String,
  author: String,
  country: String,
  publishDate: Date,
  lastUpdated: Date,
  introduction: String,
  bodyContent: String,
  tipBlocks: [{ content: String }],
  faqs: [{ question: String, answer: String }],
  additionalImages: [String],
  videoUrl: String,
  affiliateLinks: [{ text: String, url: String }],
  relatedArticles: [{ title: String, url: String }],


  commentsEnabled: Boolean,
  status: { type: String, enum: ["Draft", "Published", "Archived"] },
  sortOrder: Number,
  viewCount: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
