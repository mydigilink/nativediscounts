import { Schema, model, models } from "mongoose";

const countrySchema = new Schema(
  {
    heroImages: [String], // array of image URLs
    heroHeadline: String,
    heroSubheadline: String,

    featuredStoreLogos: [String],
    featuredSortOrder: Number,

    featuredOffers: [
      {
        title: String,
        url: String,
      },
    ],
    dealTitle: String,

    categoryTiles: [
      {
        title: String,
        icon: String, // URL or base64
      },
    ],

    autoSelectFilters: String,
    manualFeaturedCodes: [
      {
        code: String,
        description: String,
      },
    ],

    trustBadgeText: String,
    trustBadgeIcon: String,

    appPromoBanner: {
      image: String,
      url: String,
    },

    newsletter: {
      headline: String,
      subtext: String,
      buttonText: String,
      buttonLink: String,
    },

    footerLinks: [
      {
        label: String,
        url: String,
      },
    ],
    socialMediaLinks: [String],

    activeStatus: { type: Boolean, default: true },
    lastUpdated: Date,

    seoTitle: String,
    seoKeywords: String,
    seoDescription: String,

    countryImage: String,
    countryName: String,
    countryCode: String,
    countryLanguage: String,
    countryH1Title: String,
  },
  { timestamps: true }
);

export default models.Country || model("Country", countrySchema);
