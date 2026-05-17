"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
export default function Blog({ params }) {
  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState({});
  const { slug } = useParams();
  //console.log("checkslig",params.country);
  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);
  useEffect(() => {
    fetch("/api/authors")
      .then((res) => res.json())
      .then((data) => {
        // Convert authors array into object { username: name }
        const authorMap = {};
        data.forEach((author) => {
          authorMap[author.userName] = (
            <Link href={`/employee/${author.userName}`} className="ml-1">
              {author.authorName}
            </Link>
          );
        });
        setAuthors(authorMap);
      });
  }, []);
  return (
    <section className="pb-5 bg-light"><link rel="canonical" href="https://www.nativediscounts.com/blog/"/>
      <div className="p-4 text-center  bg-dark text-white mb-5"><h1>Shop Smart Blog</h1></div>
      <div className="container">

        <div className="row g-4">
          {posts.map((post, idx) => (
            <div key={idx} className="nblog col-12 col-md-6 col-lg-4">
              <Link href={`/blog/${post.slug}`} className="card h-100 border-0 shadow-sm">
                {/* Image */}
                {post.featuredImage && (
                  <Image
                    src={post.featuredImage}
                    alt={post.featuredImageAlt}
                    width={600}
                    height={300}
                    className="card-img-top"
                    style={{ objectFit: "cover" }}
                  />
                )}

                {/* Card Body */}
                <div className="card-body">
                  <h5 className="card-title fw-bold">{post.title}</h5>
                  <p className="text-muted small mb-2 card-footer">
                    <span>    By {" "}
                      {authors[post.authors] ||
                        post.authors ||
                        "Admin"} </span><span>    <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="mx-1 h-4 w-4 fill-current text-gray-700"
                          data-qa="el:calendarIcon"
                          height={15}
                          width={15}
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M22 5.5v13c0 2-1.5 3.5-3.3 3.5H5.3A3.4 3.4 0 012 18.6V5.5c0-1 .8-1.8 1.7-1.8h1.6v-1c0-.3.3-.7.7-.7.5 0 .8.4.8.8v.9h2.4v-1c0-.3.4-.7.8-.7s.8.4.8.8v.9h2.4v-1c0-.3.4-.7.8-.7s.8.4.8.8v.9h2.4v-1c0-.3.3-.7.8-.7.4 0 .7.4.7.8v.9h1.6c1 0 1.7.8 1.7 1.8zm-18.5 2v11c0 1.1.8 2 1.8 2h13.4c1 0 1.8-.9 1.8-2v-11h-17zm12.3 7.4c-.2 0-.3.1-.3.3v2.6c0 .2.1.3.3.3h2.5c.2 0 .3-.1.3-.3v-2.6c0-.2-.1-.3-.3-.3h-2.5zm-5.4.3c0-.2.2-.3.4-.3h2.4c.2 0 .4.1.4.3v2.6c0 .2-.2.3-.4.3h-2.4a.3.3 0 01-.4-.3v-2.6zM5.7 15c-.2 0-.3.1-.3.3v2.6c0 .2.1.3.3.3h2.5c.2 0 .3-.1.3-.3v-2.6c0-.2-.1-.3-.3-.3H5.7zm9.8-4.8c0-.2.1-.3.3-.3h2.5c.2 0 .3.1.3.3v2.6c0 .2-.1.3-.3.3h-2.5a.3.3 0 01-.3-.3V10zm-4.7-.3c-.2 0-.4.1-.4.3v2.6c0 .2.2.3.4.3h2.4c.2 0 .4-.1.4-.3V10c0-.2-.2-.3-.4-.3h-2.4zm-5.4.3c0-.2.1-.3.3-.3h2.5c.2 0 .3.1.3.3v2.6c0 .2-.1.3-.3.3H5.7a.3.3 0 01-.3-.3V10z"
                          />
                        </svg> {post.publishDate} </span>
                  </p>
                  {/* <p className="card-text text-muted">{post.excerpt}</p> */}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
