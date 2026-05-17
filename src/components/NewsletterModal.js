"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";

export default function NewsletterModal({
  headline = "Unlock Expertly Chosen Deals",
  countryCode,
  delay = 5000,
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const sessionKey = `newsletterSeen:${countryCode || "global"}`;
    const localKey = `newsletterSubmitted:${countryCode || "global"}`;

    if (
      localStorage.getItem(localKey) === "1" ||
      sessionStorage.getItem(sessionKey) === "1"
    )
      return;

    const timer = setTimeout(async () => {
      const { Modal } = await import("bootstrap/dist/js/bootstrap.esm.min.js");
      const modalEl = document.getElementById("newsletterModal");
      if (modalEl) {
        const bsModal = new Modal(modalEl);
        bsModal.show();
        sessionStorage.setItem(sessionKey, "1");
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [countryCode, delay]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, countryCode }),
      });

      if (res.ok) {
        setSubmitted(true);
        setEmail("");
        localStorage.setItem(
          `newsletterSubmitted:${countryCode || "global"}`,
          "1"
        );
        const modalEl = document.getElementById("newsletterModal");
        if (modalEl) {
          const { Modal } = await import(
            "bootstrap/dist/js/bootstrap.esm.min.js"
          );
          Modal.getInstance(modalEl)?.hide();
        }
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting email.");
    }
  };

  return (
    <div
      className="modal fade"
      id="newsletterModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div
          className="modal-content rounded-2 p-4"
          style={{ backgroundColor: "#e4f0f8" }}
        >
          <button
            type="button"
            className="btn-close position-absolute top-3 end-3"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>

          <h4 className="text-center fw-bold mb-3">{headline}</h4>

          {submitted ? (
            <p className="text-center text-success">
              Thank you for subscribing!
            </p>
          ) : (
            <>
              {!session && (
                <form
                  onSubmit={handleSubmit}
                  className="d-flex flex-column gap-3 mb-3"
                >
                  <div>
                    <label className="form-label fw-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg rounded-pill"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-dark btn-lg rounded-pill fw-bold"
                  >
                    Subscribe – It’s Free
                  </button>
                </form>
              )}
{/* 
              <div className="d-flex align-items-center my-3">
                <hr className="flex-grow-1" />
                <span className="mx-2 text-muted">or</span>
                <hr className="flex-grow-1" />
              </div> */}

              <div className="d-none flex-column gap-2">
                <button
                  className="shadow px-4 py-3 item-center btn gsigninbtn btn-outline-white w-100 mb-2"
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                >
                  {/* Google SVG Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    className="mr-4 h-6"
                  >
                    <g
                      clipPath="url(#prefix__clip0_238_23414)"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    >
                      <path
                        d="M24 12.267c0-.823-.078-1.645-.231-2.454H12.245v4.64h6.585a5.47 5.47 0 01-.84 2.057 5.59 5.59 0 01-1.595 1.57v3.013h3.945a11.66 11.66 0 002.791-4.03c.631-1.521.927-3.156.87-4.796z"
                        fill="#3E82F1"
                      />
                      <path
                        d="M12.245 24c3 .093 5.923-.947 8.163-2.907l-3.945-3.013a7.5 7.5 0 01-4.15 1.147 7.39 7.39 0 01-4.21-1.406A7.154 7.154 0 015.51 14.28H1.43v3.053a12.09 12.09 0 004.479 4.843A12.428 12.428 0 0012.313 24h-.068z"
                        fill="#32A753"
                      />
                      <path
                        d="M5.388 14.28a7.011 7.011 0 010-4.56V6.667H1.306a11.896 11.896 0 00-1.292 5.386c0 1.87.443 3.713 1.292 5.387l4.082-3.107v-.053z"
                        fill="#F9BB00"
                      />
                      <path
                        d="M12.245 4.773a6.645 6.645 0 014.68 1.8l3.51-3.453A11.93 11.93 0 0012.272 0a12.429 12.429 0 00-6.405 1.824 12.09 12.09 0 00-4.48 4.843L5.47 9.773a7.154 7.154 0 012.594-3.54 7.39 7.39 0 014.209-1.406l-.027-.054z"
                        fill="#E74235"
                      />
                    </g>
                    <defs>
                      <clipPath id="prefix__clip0_238_23414">
                        <path fill="#fff" d="M0 0h24v24H0z" />
                      </clipPath>
                    </defs>
                  </svg>
                  Continue with Google
                </button>
              </div>

              <small className="d-none text-center text-muted mt-3">
                By signing up, you agree to our Terms of Service and Privacy
                Policy.
              </small>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
