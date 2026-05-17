"use client";

import { useState } from "react";

export default function FooterNewsletter({ countryCode }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, countryCode }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        localStorage.setItem(
          `newsletterSubmitted:${countryCode || "global"}`,
          "1"
        );
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <>
    
      <div className="">
       
<h5 className="text-warning text-sm text-uppercase fw-bold">Stay Updated with the Best Deals</h5>
    <small className="">Register with email to receive up to date promo 
codes and deals from top US stores directly to your inbox!</small>
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column mt-2 flex-md-column justify-content-center align-items-center gap-2"
         
        >
            
          <input
            type="email"
            className="form-control  px-4 py-2"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              flex: 1,
              minWidth: "auto",
              border: "1px solid #555",
              background: "#fff",
              color: "#000",
            }}
          />

          <button
            type="submit"
            disabled={status === "loading"}
              style={{
              flex: 1,
              minWidth: "auto",
              border: "none",
              background: "rgb(241 193 7)",
              color: "#000",
            }}
            className="btn btn-primary col-12 fw-semibold px-4 py-2"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-3 text-success fw-semibold">
            🎉 You’re now subscribed!
          </p>
        )}

        {status === "error" && (
          <p className="mt-3 text-danger fw-semibold">
            ❌ Something went wrong. Please try again.
          </p>
        )}
      </div>
  
    </>
  );
}
