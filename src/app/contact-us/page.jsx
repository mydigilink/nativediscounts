
"use client";
import Link from 'next/link';

import { useState } from "react";

export default function ContactUsPage() {
     const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("Something went wrong. Try again!");
      }
    } catch (error) {
      setStatus("Error sending message.");
    }
  };
  
    return (
        <>  
         <link rel="canonical" href={`https://www.nativediscounts.com/contact-us`}/>
         <title>Contact Us – Get Support for Deals & Coupons | NativeDiscounts
</title>
        <meta
          name="description"
          content="Need help with deals or coupon codes? Contact our support team for quick assistance, query resolution, and guidance—only at NativeDiscounts.
"
        />
            <section className="container my-5">
              <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/"> Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Contact Us
            </li>
          </ol>
        </nav>
        <h1 className="mb-4">Contact Us</h1>
                <div className="card p-4 shadow-sm">
                    <h1 className="text-center">Didn't find what you needed? Let's chat!</h1>
  <form
      onSubmit={handleSubmit}
      className=" p-4  bg-white"
      
    >
<div className="row">
      <div className="mb-3 col-md-6">
      <div className="mb-3 col-md-12">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>

      <div className="mb-3 col-md-12">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>

      <div className="mb-3 col-md-12">
        <select
          id="formSubject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="form-select"
        >
          <option disabled hidden value="">
            Please select
          </option>
          <option value="App support">App support</option>
          <option value="Bonuses">Bonuses</option>
          <option value="Careers">Careers</option>
          <option value="Community">Community</option>
          <option value="Feedback">Feedback</option>
          <option value="Giveaways">Giveaways</option>
          <option value="Offer not working">Offer not working</option>
          <option value="Partner with us">Partner with us</option>
          <option value="Press enquiry">Press enquiry</option>
          <option value="Rewards support">Rewards support</option>
          <option value="Unsubscribe">Unsubscribe</option>
          <option value="VIP">VIP</option>
        </select>
      </div>
      </div>

      <div className="mb-3 col-md-6">
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="form-control"
        />
      </div>
</div>
      <button type="submit" className="btn btn-dark w-50 mx-auto d-block">
        Send Message
      </button>

      {status && <p className="mt-3 text-muted">{status}</p>}
    </form>
                </div>
            </section>
            <section className="container my-5">
            <div class="flex w-auto items-start justify-between rounded-lg border p-4 bg-sky-150 border-sky-800 mb-2 mt-4 lg:mb-4" data-qa="el:contactImportantInformation" bis_skin_checked="1">
                <div class="flex w-full flex-col text-left" bis_skin_checked="1">
                    <p class="text-liquorice text-left font-normal leading-snug" data-qa="el:infoBannerSubText">
                        <h4 class="mb-2 mt-0.5 text-base font-extrabold"> Important information </h4>
                        <p class="text-sm"> If your query is about an offer, <strong>please email your order confirmation</strong> to the following: </p>
                        <ul class="mt-1 list-inside list-disc text-sm"><li>Code Guarantee: <strong>help@nativediscounts.com</strong></li>
                        <li>Support: <strong>support@nativediscounts.com</strong></li>
                        
                        </ul></p></div></div>
      </section>  </>
    );
}