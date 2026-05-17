'use client';
import { useEffect, useRef } from "react";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoginSidebar() {
  const loginRef = useRef(null);

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js').then((bootstrap) => {
      const loginSidebar = new bootstrap.Offcanvas(loginRef.current);
      loginRef.current.open = () => loginSidebar.show();
      loginRef.current.close = () => loginSidebar.hide();
    });
  }, []);

  const openLogin = () => loginRef.current.open();
  const closeLogin = () => loginRef.current.close();

  // Example OAuth URLs
  const googleLogin = () => window.location.href = "/auth/google";
  const facebookLogin = () => window.location.href = "/auth/facebook";

  return (
    <>
      <button
        className="btn btn-light"
        onClick={openLogin}
      >
        Sign In | Join
      </button>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        ref={loginRef}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Login / Sign Up</h5>
          <button
            type="button"
            className="btn-close text-reset"
            onClick={closeLogin}
          ></button>
        </div>
        <div className="offcanvas-body">
          <form className="mb-3">
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Sign In
            </button>
          </form>

          <div className="text-center mb-3">or continue with</div>

          <div className="d-flex gap-2 flex-column">
            <button
              type="button"
              className="btn btn-outline-danger w-100"
              onClick={googleLogin}
            >
              <i className="bi bi-google me-2"></i> Continue with Google
            </button>
            <button
              type="button"
              className="btn btn-outline-primary w-100"
              onClick={facebookLogin}
            >
              <i className="bi bi-facebook me-2"></i> Continue with Facebook
            </button>
          </div>

          <Link
            href="/signup"
            className="d-block text-center text-decoration-none mt-3"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </>
  );
}
