"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Image from "next/image";
export default function AdminNavbar() {
   const router = useRouter();
  const timerRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds
const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
const handleDeploy = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "deploy_triggered",
          source: "nextjs_button",
          timestamp: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setMessage("✅ Deployment triggered successfully!");
      } else {
        setMessage("❌ Failed to trigger deployment.");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };
  // Reset inactivity timer
  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    setTimeLeft(60); // Reset countdown

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
       //   router.push("/api/admin/logout"); // redirect to logout
       
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer(); // Start timer on load

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, []);

  return (
    <nav className="navbar navbar-dark bg-light shadow-lg">
      <div className="container-fluid">
        
       
        <Link className="navbar-brand" href="/admin"> <Image
                      src="/logo.jpeg"
                      alt=" Logo"
                    width={80}
                    height={30}
                      className=""
                    /></Link>
                 <div>
                    <span className="text-sm mx-2"> <button
        onClick={handleDeploy}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Deploying..." : "Trigger Deploy"}
      </button>
      {/* {message && <p className="mt-2 text-sm">{message}
        </p>} */}
</span>
                       <span className="text-sm mx-2">
            Auto logout in: <b>{timeLeft}s</b>
          </span>
        <Link className="btn btn-outline-dark" title='Logout' aria-label='Logout' href="/api/admin/logout"><PowerSettingsNewIcon /></Link>
      </div></div>
    </nav>
  );
}
