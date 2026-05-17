
import Image from "next/image";
import Link from "next/link";

async function getBlog(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}
const now = new Date();
const month = now.toLocaleString("default", { month: "long" });
const year = now.getFullYear();
const formatSeoTitle = (template, country) => {


  return template
   
    .replace(/\[COUNTRY\]/g, country.toUpperCase())
    .replace(/\[MONTH\]/g, month)
    .replace(/\[YEAR\]/g, year);
};
/* 🔥 Dynamic SEO Metadata */
export async function generateMetadata({ params }) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: formatSeoTitle(blog.seoTitle,"us") || blog.title,
    description: formatSeoTitle(blog.seoDescription,"us") || blog.excerpt,
    keywords: blog.seoKeywords || "",
    alternates: {
      canonical: `https://www.nativediscounts.com/blog/${blog.slug}`,
    },
    openGraph: {
      title: formatSeoTitle(blog.seoTitle,"us") || blog.title,
      description: formatSeoTitle(blog.seoDescription,"us") || blog.excerpt,
      url: `https://www.nativediscounts.com/blog/${blog.slug}`,
      type: "article",
      images: [
        {
          url: blog.featuredImage,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: formatSeoTitle(blog.seoTitle,"us") || blog.title,
      description: formatSeoTitle(blog.seoDescription,"us") || blog.excerpt,
      images: [blog.featuredImage],
    },
  };
}

export default async function BlogView({ params }) {
  const blog = await getBlog(params.slug);

  if (!blog) return <p className="text-center mt-5">Blog not found</p>;

  return (
    <section className="pb-5 bg-light">
      <div className="container">
        <div className="card border-0 shadow p-4">

          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/blog">All Blogs</Link>
            </li>
            <li className="breadcrumb-item active">
              {blog.title}
            </li>
          </ol>

          <h1 className="fw-bold">{blog.title}</h1>
          <div className="mb-2">
            Published on {blog.publishDate}
          </div>

          {blog.featuredImage && (
            <Image
              src={blog.featuredImage}
              alt={blog.featuredImageAlt || blog.title}
              width={900}
              height={450}
              className="img-fluid rounded mb-4"
              style={{ objectFit: "cover", width: "100%", height: "500px" }}
            />
          )}

          <div
            dangerouslySetInnerHTML={{ __html: blog.bodyContent }}
          />

          <p className="text-muted mb-3">
            By {blog.author}
          </p>

        </div>
      </div>
    </section>
  );
}
