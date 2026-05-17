"use client";
import Cookies from "js-cookie";

import AdminNavbar from "../../components/AdminNavbar";
import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AuthorSidebar from "@/components/AuthorSidebar";
import { usePathname } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "../../styles/admin.css";
import Loader from "../../components/Loader";
import BootstrapClient from "../../components/BootstrapClient";
import AdminAuthCheck from "@/components/AdminAuthCheck";
// import "jodit/build/jodit.min.css";
export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname(); // always updated on navigation
 const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = Cookies.get("admin_token");
    setIsAdmin(!!token);
  }, []);
 
 

  // Trigger loader on route change
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [pathname]);

  // Function to manually trigger loading
  const startLoading = () => setLoading(true);
  const isLoginPage = pathname.includes("/admin/login");

  return ( 
    <html >
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body className="admin-body">
         <AdminAuthCheck /> <BootstrapClient />
       
        {loading && <Loader />}
        {/* Example: pass trigger to children */}
        <div>
          {/* <div onClick={startLoading}> */}
          {isLoginPage ? (
            <div className="d-flex">
              <div
                className="p-4 flex-grow-1"
                style={{
                  background: "#fff",
                  minHeight: "100vh",
                  overflow: "auto",
                  height: "100vh",
                }}
              >
                {children}
              </div>
            </div>
          ) : (
            <>
              <AdminNavbar />
              <div className="d-flex page-container">
                 <AdminSidebar />
                {/* { isAdmin  ? <AdminSidebar /> : <AuthorSidebar />}  */}
                <div
                  className="p-4 flex-grow-1"
                  style={{
                    background: "#fff",
                    minHeight: "calc(100vh - 60px)",
                    overflow: "auto",
                    height: "calc(100vh - 60px)"
                  }}
                >

                  {children}
                </div>
              </div>
            </>
          )}
        </div>
      </body>
    </html>
  );
}
