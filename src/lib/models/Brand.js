import { Schema, model, models } from "mongoose";

const brandSchema = new Schema(
  {
    country: String,
    category: String,
    brandName: String,
    pageSlug: String,
    brandTitle: String,
    brandUrl: String,
    brandLogo: String, // File Upload
    featuredBrand: { type: Boolean, default: false },
    popularBrand: { type: Boolean, default: false },
    trendingBrand: { type: Boolean, default: false },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },


    affiliate: {
      networkName: String,
      brandId: String,
      trackingLink: String,
      trackingParams: String,
      offerPageUrl: String,
    },

    content: {
      summary: String,
      savingTips: String,
      additionalTips: String,
      termsUrl: String,
      faqs: String,
    },

    dates: {
      addedDate: Date,
      lastUpdatedDate: Date,
    },

    media: {
      videoUrl: String,
      videoText: String,
      customBanner: String,
      socialLinks: [String],
    },

    analytics: {
      clickCount: { type: Number, default: 0 },
      conversionPixelUrl: String,
    },
  },
  { timestamps: true }
);

export default models.Brand || model("Brand", brandSchema);
