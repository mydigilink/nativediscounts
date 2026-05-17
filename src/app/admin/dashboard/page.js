"use client";

import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
// import { WebVitals } from "@/components/web-vitals";

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    // Here we could also clear cookies/localStorage session token
   // router.push("/admin/login");
  };

  return (
    <div className="container-fluid vh-100">
      {/* Top Navbar */}
   

      <div className="row h-100">
       

        {/* Main Content */}
        <div className="col-md-12 col-lg-12 p-4">
          <h2>Welcome to the Admin Dashboard</h2>
          <p className="text-muted">Here you can manage your website data and view reports.</p>
     {/* <WebVitals /> */}
        
          {/* Example Table */}
          {/* <div className="card mt-4">
            <div className="card-header">Recent Activity</div>
            <div className="card-body p-0">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Action</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>Created an account</td>
                    <td>2025-08-09</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jane Smith</td>
                    <td>Placed an order</td>
                    <td>2025-08-08</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Mark Wilson</td>
                    <td>Updated profile</td>
                    <td>2025-08-07</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> */}

        </div>
      </div>
    </div>
  );
}
