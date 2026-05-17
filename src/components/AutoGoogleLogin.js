"use client";

import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AutoGoogleLogin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If user not logged in, auto trigger Google login
    if (status === "unauthenticated") {
      signIn("google"); 
    }

    // If user is logged in, redirect somewhere
    if (status === "authenticated") {
  const currentPath = window.location.pathname; // e.g. /uk/addidas
  const segments = currentPath.split("/").filter(Boolean); // ["uk", "addidas"]

  let redirectPath = "/";
  if (segments.length > 0) {
    redirectPath = `/${segments[0]}`; // /uk
  }

 // router.push(redirectPath);
}
  }, [status, router]);

  return null; // nothing to render
}
