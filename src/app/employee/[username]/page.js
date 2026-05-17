"use server";
import { notFound } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthorTabs from "@/components/AuthorTabs";

export default async function EmployeePage({ params }) {
  const { username: username } = await params;
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  const author = await db.collection("authors").findOne({
    userName: username,
  });

  if (!author) return notFound();

  const profileSrc = author?.profilePhoto || "/default-avatar.png";
  const profileBanner = author?.profileBanner || "/default-banner.jpg";
  const profileUnoptimized =
    typeof profileSrc === "string" && profileSrc.startsWith("http");

  const authorName = author?.authorName || username;
  const authorDesignation =
    author?.authorDisignation || author?.designation || "";
  const joinedYear = author?.lastUpdated
    ? new Date(author.lastUpdated).getFullYear()
    : "";

  return (
    <>
      <div className="">
        {/* Header Banner */}
        <div
          className="w-100"
          style={{ height: "250px", backgroundColor: "#e9ecef", position: "relative" }}
        >
          <Image
            src={profileBanner}
            alt="Team Banner"
            fill
            className="object-fit-cover"
          />
        </div>

        {/* Profile Section */}
        <div className="container position-relative " style={{ marginTop: "-80px" }}>
          <div className="d-flex align-items-center mb-4">
            <div
              className="rounded-circle border border-4 border-warning overflow-hidden bg-white me-3 position-relative"
              style={{ width: "130px", height: "130px" }}
            >
              <Image
                src={profileSrc}
                alt={authorName}
                fill
                unoptimized={profileUnoptimized}
                className="object-fit-cover"
              />
            </div>
            <div className="d-flex flex-column"></div>
           
          </div>
 <div className="px-3 mb-4 ">
              <h1 className="h3 fw-bold mb-1">{authorName}</h1>
              <p className="text-muted mb-1">{authorDesignation}</p>
              {joinedYear && (
                <small className="text-secondary">Joined in {joinedYear}</small>
              )}
            </div>
          {/* ✅ Custom Tabs */}
          <AuthorTabs author={author} />

          {/* Featured Video */}
          {/* {author?.featuredVideoUrl && (
            <div className="mb-5">
              <h2 className="h5 fw-semibold mb-3">Featured Video</h2>
              <div className="ratio ratio-16x9 rounded shadow-sm">
                <iframe
                  src={author.featuredVideoUrl}
                  title={author.videoText || "Featured video"}
                  allowFullScreen
                />
              </div>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}
