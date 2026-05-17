"use client";

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function StatsSection() {
  const [counts, setCounts] = useState({
    activeDeals: 0,
    partnerStores: 0,
    happySavers: 0,
    featuredDeals: 0,
  });

  // Fetch stats from API
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");

        const data = await res.json();

        setCounts({
          activeDeals: data.activeDeals || 0,
          partnerStores: data.partnerStores || 0,
          happySavers: data.happySavers || 0,
          featuredDeals: data.featuredDeals || 0,
        });
      } catch (error) {
        console.error("Stats fetch error:", error);
      }
    }

    fetchStats();
  }, []);

  // Counter animation
  useEffect(() => {
    const counters = document.querySelectorAll(".count");

    counters.forEach((counter) => {
      const target = Number(counter.getAttribute("data-target")) || 0;

      let current = 0;
      const increment = Math.max(1, Math.ceil(target / 50));

      const updateCount = () => {
        current += increment;

        if (current < target) {
          counter.innerText = current;
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
  }, [counts]);

  const stats = [
    {
      number: counts.activeDeals,
      label: "Active Deals",
      icon: "🔥",
    },
    {
      number: counts.partnerStores,
      label: "Partner Stores",
      icon: "🏬",
    },
    {
      number: counts.happySavers,
      label: "Happy Savers",
      icon: "😊",
    },
    {
      number: counts.featuredDeals,
      label: "Featured Deals",
      icon: "⭐",
    },
  ];

  return (
    <section
      className="py-5 text-center text-white"
      style={{
        background: "linear-gradient(135deg, #f37d06 0%, #ce6057 100%)",
      }}
    >
      <div className="container py-4">
        <div className="row g-4">
          {stats.map((item, index) => (
            <div className="col-6 col-md-3" key={index}>
              <div className="bg-white text-dark rounded-4 p-4 shadow h-100 stat-card">
                <div
                  className="icon-wrapper mb-3 mx-auto d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "#ffe2e2",
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    color: "#f37d06",
                    fontSize: "30px",
                  }}
                >
                  {item.icon}
                </div>

                <h3
                  className="fw-bold mb-1 display-6 count"
                  data-target={item.number}
                >
                  0
                </h3>

                <p className="mb-0 text-muted">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .stat-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .count {
          color: #f37d06;
        }

        .stat-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          .stat-card {
            padding: 20px 10px !important;
          }

          .count {
            font-size: 28px !important;
          }
        }
      `}</style>
    </section>
  );
}