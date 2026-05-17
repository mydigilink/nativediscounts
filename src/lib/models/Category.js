// models/Category.js
import { Schema, model, models } from "mongoose";

const categorySchema = new Schema(
  {
    // 1. Meta & SEO
    categoryTitle: String,
    seoTitle: String,
    seoKeywords: String,
    seoDescription: String,
    pageSlug: String,

    // 2. Hero Header
    heroBannerImage: String,
    heroHeading: String,
    heroSubheading: String,

    // 3. Featured Merchants
    featuredMerchantLogos: [String],
    featuredStoresTitle: String,

    // 4. Sub-Categories / Filters
    subCategoryBlocks: [
      {
        name: String,
        icon: String,
        link: String,
      },
    ],
    filterTitle: String,

    // 5. Deals Listing
    automatedDealsRules: String,
    manualFeaturedDeals: [
      {
        dealTitle: String,
        url: String,
      },
    ],

    // 6. Editorial & Tips
    introText: String,
    savingsTips: String,

    // 7. Trust Section
    trustCopy: String,
    trustIconImage: String,

    // 8. Load More / Pagination
    dealsPerPage: Number,
    infiniteScrollEnabled: { type: Boolean, default: false },

    // 9. Affiliate & Tracking
    affiliateNetwork: String,
    defaultUtmParams: String,

    // 10. Analytics & Control
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    sortOrder: Number,
    lastUpdated: Date,
  },
  { timestamps: true }
);

export default models.Category || model("Category", categorySchema);
