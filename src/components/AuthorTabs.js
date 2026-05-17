"use client";
import { useState } from "react";

export default function AuthorTabs({ author }) {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <>
      {/* Tabs */}
      <div className="emp bg-white p-3 mb-4 rounded shadow">
      <ul className="nav nav-tabs mb-4 " style={{ borderBottom: "2px solid #ffc107" }}>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "about" ? "active text-warning fw-semibold" : ""}`}
            onClick={() => setActiveTab("about")}
          >
            About me
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "offers" ? "active text-warning fw-semibold" : ""}`}
            onClick={() => setActiveTab("offers")}
          >
            Recent offers
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="row">
        {activeTab === "about" && (
         <>   <div id="about" className="col-12 col-md-7">
            {author?.authorBio && (
              <div
                className="p-4  rounded  mb-1"
                dangerouslySetInnerHTML={{ __html: author.authorBio }}
              />
            )}
            {author?.authorDescription && (
              <div
                className="p-4  rounded "
                dangerouslySetInnerHTML={{ __html: author.authorDescription }}
              />
            )}
          </div>
          <div className="col-12 col-md-5"></div>
        </>
        )}

        {activeTab === "offers" && (
          <div id="offers">
            {/* Replace this with dynamic offers later */}
            <div className="p-4 bg-light rounded shadow-sm">
              <p>No offers available yet.</p>
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
