import CategoriesClient from "@/components/CategoriesClient";


/* ✅ SEO */
export const metadata = {
  title:
    "All Store Categories – Browse Deals, Offers & Discounts | NativeDiscounts",
  description:
    "Discover all store categories in one place. Browse deals, offers, and verified coupons across every niche — save more today on NativeDiscounts.",
  alternates: {
    canonical: "https://www.nativediscounts.com/cats/",
  },
};

export default function Page() {
  return <CategoriesClient />;
}