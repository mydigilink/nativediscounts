"use client";

import Link from "next/link";
import useSWR, { useSWRConfig } from "swr";
import { useEffect, useState } from "react";

const pageSize = 10;
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CouponTable() {
  const { cache, mutate: globalMutate } = useSWRConfig();

  const [filters, setFilters] = useState({
    country: "",
    brand: "",
    offerType: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const query = new URLSearchParams({
    page: currentPage,
    limit: pageSize,
    country: filters.country,
    brand: filters.brand,
    offerType: filters.offerType,
  }).toString();

  const swrKey = `/api/admin/coupons?${query}`;

  const { data, isLoading, error, mutate } = useSWR(
    swrKey,
    fetcher,
    {
      dedupingInterval: 60000,
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  const coupons = data?.coupons || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / pageSize);

  // ✅ Delete coupon (optimistic update)
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;

    await fetch(`/api/admin/coupons`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    mutate(
      {
        ...data,
        coupons: coupons.filter((c) => c._id !== id),
        total: total - 1,
      },
      false
    );
  };

  // ✅ Clear ALL SWR cache safely
  const clearAllCache = () => {
    globalMutate(() => true, undefined, { revalidate: false });
  };

  if (isLoading) return <p>Loading coupons...</p>;
  if (error) return <p>Failed to load coupons</p>;

//   return (
//     <div className="p-4 bg-white shadow-md rounded-lg">
//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Search Brand"
//           value={filters.brand}
//           onChange={(e) =>
//             setFilters((f) => ({ ...f, brand: e.target.value }))
//           }
//           className="border p-2 rounded"
//         />

//         <select
//           value={filters.offerType}
//           onChange={(e) =>
//             setFilters((f) => ({ ...f, offerType: e.target.value }))
//           }
//           className="border p-2 rounded"
//         >
//           <option value="">All Offer Types</option>
//           <option value="1">Coupon</option>
//           <option value="2">Deal</option>
//         </select>

//         <button
//           onClick={clearAllCache}
//           className="border px-3 py-2 rounded bg-red-100"
//         >
//           Clear All Cache
//         </button>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-3 py-2">Brand</th>
//               <th className="border px-3 py-2">Type</th>
//               <th className="border px-3 py-2">Title</th>
//               <th className="border px-3 py-2">Likes</th>
//               <th className="border px-3 py-2">Start</th>
//               <th className="border px-3 py-2">End</th>
//               <th className="border px-3 py-2">Status</th>
//               <th className="border px-3 py-2">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {coupons.map((c) => (
//               <tr key={c._id}>
//                 <td className="border px-3 py-2">{c.brand}</td>
//                 <td className="border px-3 py-2">
//                   {c.offerType === "1" ? "Coupon" : "Deal"}
//                 </td>
//                 <td className="border px-3 py-2">{c.title}</td>
//                 <td className="border px-3 py-2">{c.likes}</td>
//                 <td className="border px-3 py-2">{c.startDate}</td>
//                 <td className="border px-3 py-2">{c.endDate}</td>
//                 <td className="border px-3 py-2">
//                   {c.enabled ? "Active" : "Inactive"}
//                 </td>
//                 <td className="border px-3 py-2">
//                   <Link
//                     href={`/admin/coupons-editor?id=${c._id}`}
//                     className="me-2"
//                   >
//                     Edit
//                   </Link>
//                   <button onClick={() => handleDelete(c._id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}

//             {coupons.length === 0 && (
//               <tr>
//                 <td colSpan={8} className="text-center py-4 text-gray-500">
//                   No coupons found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination stays unchanged */}
//     </div>
//   );
// }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search Brand"
          value={filters.brand}
          onChange={(e) =>
            setFilters((f) => ({ ...f, brand: e.target.value }))
          }
          className="border p-2 rounded"
        />

        <select
          value={filters.offerType}
          onChange={(e) =>
            setFilters((f) => ({ ...f, offerType: e.target.value }))
          }
          className="border p-2 rounded"
        >
          <option value="">All Offer Types</option>
          <option value="1">Coupon</option>
          <option value="2">Deal</option>
        </select><button
  onClick={() => cache.clear()}
>
  Clear All Cache
</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Brand</th>
              <th className="border px-3 py-2">Type</th>
              <th className="border px-3 py-2">Title</th>
              <th className="border px-3 py-2">Likes</th>
              <th className="border px-3 py-2">Start</th>
              <th className="border px-3 py-2">End</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {coupons.map((c) => (
              <tr key={c._id}>
                <td className="border px-3 py-2">{c.brand}</td>
                <td className="border px-3 py-2">
                  {c.offerType === "1" ? "Coupon" : "Deal"}
                </td>
                <td className="border px-3 py-2">{c.title}</td>
                <td className="border px-3 py-2">{c.likes}</td>
                <td className="border px-3 py-2">{c.startDate}</td>
                <td className="border px-3 py-2">{c.endDate}</td>
                <td className="border px-3 py-2">
                  {c.enabled ? "Active" : "Inactive"}
                </td>
                <td className="border px-3 py-2">
                  <Link
                    href={`/admin/coupons-editor?id=${c._id}`}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {coupons.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  No coupons found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ FIXED Pagination */}
     {totalPages > 1 && (
  <nav className="d-flex justify-content-center mt-4">
    <ul className="pagination pagination-sm">
      {/* Prev */}
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button
          className="page-link"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
      </li>

      {/* Page Numbers */}
      {(() => {
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = start + maxVisible - 1;

        if (end > totalPages) {
          end = totalPages;
          start = Math.max(1, end - maxVisible + 1);
        }

        return Array.from(
          { length: end - start + 1 },
          (_, i) => start + i
        ).map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          </li>
        ));
      })()}

      {/* Next */}
      <li
        className={`page-item ${
          currentPage === totalPages ? "disabled" : ""
        }`}
      >
        <button
          className="page-link"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
)}

    </div>
  );
}
