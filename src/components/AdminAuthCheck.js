"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminAuthCheck() {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/check-admin")
      .then((res) => res.json())
      .then((data) => setIsAdmin(data.isAdmin))
      .catch(() => setIsAdmin(false))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!isAdmin) {
        router.push("/admin/login");
     //   router.push("/admin/dashboard");
      } else {
       // router.push("/admin/login");
      }
    }
  }, [loading, isAdmin, router]);

 // return <p>Checking authentication...</p>;
}
