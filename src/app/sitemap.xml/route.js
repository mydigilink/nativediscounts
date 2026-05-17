const BASE_URL = "https://www.nativediscounts.com";

// Fetch brands dynamically from API
async function fetchBrands(country) {
  const filter = encodeURIComponent(JSON.stringify({ country, featuredBrand: true }));
  const res = await fetch(`${BASE_URL}/api/v2/brands?filter=${filter}`, {
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  // Return the correct array from API response
  if (Array.isArray(data.brands)) return data.brands;
  if (data.data && Array.isArray(data.data.brands)) return data.data.brands;
  const urls = [];


  data.forEach((brand) => {
    // Use pageSlug if available, fallback to slug
    const slug = brand.pageSlug || brand.slug;
    if (slug) {
      urls.push(`${BASE_URL}/${slug}`);
    }
  });

  // Generate XML sitemap
  const sitemap = generateSitemapXml(urls);

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
 // return []; // fallback
}

// Generate sitemap XML
function generateSitemapXml(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>https://www.nativediscounts.com/</loc>
  <changefreq>daily</changefreq> 
<priority>0.9</priority>
</url>
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;
}

// Route handler
export async function GET(request, { params }) {
    //const brands =
  const country = "us";//params.country.toLowerCase(); // get country from URL
//  await fetchBrands(country);
 return fetchBrands(country);
}
 