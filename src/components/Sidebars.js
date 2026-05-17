"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import UserMenu from "./UserMenu"
export default function Sidebars() {
  const { data: session } = useSession(); // ✅ Now this works

  const notifRef = useRef(null);
  const loginRef = useRef(null);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js").then((bootstrap) => {
      const notifSidebar = new bootstrap.Offcanvas(notifRef.current);
      const loginSidebar = new bootstrap.Offcanvas(loginRef.current);

      notifRef.current.open = () => notifSidebar.show();
      notifRef.current.close = () => notifSidebar.hide();
      loginRef.current.open = () => loginSidebar.show();
      loginRef.current.close = () => loginSidebar.hide();
    });
  }, []);

  const openNotif = () => notifRef.current.open();
  const closeNotif = () => notifRef.current.close();
  const openLogin = () => loginRef.current.open();
  const closeLogin = () => loginRef.current.close();

  return (
    <>
      <div className="d-flex align-items-center gap-2">
        {/* Notifications */}
        <button className="btn btn-light d-none" onClick={openNotif}> <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-1 -4 20 30"
      fill="none"
      height="32"
      width="32"
      className="bg-dark rounded-circle text-white"
    >
      <g clipPath="url(#bell)">
        <path
          d="M9.75 2.608v.608l.595.126c2.812.595 4.905 3.038 4.905 5.937v5.65c0 .337.136.659.377.894l1.532 1.497H.84l1.532-1.497a1.25 1.25 0 0 0 .377-.894v-5.65c0-2.899 2.093-5.342 4.905-5.937l.595-.126V1.465c0-.38.317-.715.75-.715s.75.335.75.715v1.143Zm.215 17.198A1.249 1.249 0 0 1 9 20.25c-.397 0-.74-.175-.965-.444h1.93Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </g>
      <defs>
        <clipPath id="bell">
          <path fill="#fff" d="M0 0h18v21H0z" />
        </clipPath>
      </defs>
    </svg></button>

        {session ? (
          <div className="dropdown">
            <button
              className="btn btn-light "
              onClick={openLogin}
            >
              {session.user?.name || "Account"}
            </button>
            {/* <ul className="dropdown-menu">
              <li><Link className="dropdown-item" href="/profile">Profile</Link></li>
             
            </ul> */}
          </div>
        ) : (
          <button className="btn btn-light" onClick={openLogin}>
            Sign In | Join
          </button>
        )}
      </div>

      {/* Notification Sidebar */}
      <div className="offcanvas offcanvas-end" ref={notifRef} tabIndex="-1">
        <div className="offcanvas-header">
          <h5>Notifications</h5>
          <button type="button" className="btn-close" onClick={closeNotif}></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-group">
            {/* <li className="list-group-item">New message</li>
            <li className="list-group-item">Order shipped</li> */}
          </ul>
        </div>
      </div>

      {/* Login Sidebar */}
      <div className="offcanvas offcanvas-end" ref={loginRef} tabIndex="-1">
        {session ? (<div>

          <UserMenu />
        </div>) : (<div>


          <div className="offcanvas-body">




            {/* Nav Tabs */}
            <ul className="nav nav-tabs mb-3" id="authTabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="login-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#login-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="login-tab-pane"
                  aria-selected="true"
                >
                  Login
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="signup-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#signup-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="signup-tab-pane"
                  aria-selected="false"
                >
                  Sign Up
                </button>
              </li>
            </ul>
            <button type="button" className="btn-close sideclose" onClick={closeLogin}></button>
            {/* Tab Content */}
            <div className="tab-content" id="authTabsContent">
              {/* Login Tab */}
              <div
                className="tab-pane fade show active"
                id="login-tab-pane"
                role="tabpanel"
                aria-labelledby="login-tab"
              >
                <h3 className="text-center">
                  Welcome back!</h3>
                <button
                  className="shadow px-4 py-3 item-center btn gsigninbtn btn-outline-white w-100 mb-2"
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    className="mr-4 h-6"
                    alt="Google icon"
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
                {/* <button
        className="btn btn-outline-primary w-100"
        onClick={() => signIn("facebook", { callbackUrl: "/" })}
      >
        Continue with Facebook
      </button> */}
                <div className="or_hr">
                  <hr />
                  <span>Or Sign In with your email</span>
                  <hr />
                </div>
                {/* Optional email/password form */}
                <form className="mt-3">
                  <label>Email</label>
                  <input type="email" className="form-control mb-2" placeholder="Enter Your Email" />
                  <label>Password</label>
                  <input type="password" className="form-control mb-2" placeholder="Enter Your Password" />
                  <button className="btn btn-success w-100">Sign in</button>
                </form>
                <p className="text-xs mt-3 text-center  px-4">Forgotten your password? Simply reset it here.
                </p>
                <p className="text-xs  text-center px-4">Don&apos;t have an account? Join NativeDiscounts today and <br /><b>become a VIP for free</b></p>
                <div className="text-center">
                  <Image width={100} height={15} alt="4.5 Star" src={"/4.5-stars.svg"} />
                  <Image width={100} height={15} alt="Logo" src={"/logo-light-bg.svg"} />

                </div>
              </div>

              {/* Signup Tab */}
              <div
                className="tab-pane fade"
                id="signup-tab-pane"
                role="tabpanel"
                aria-labelledby="signup-tab"
              >
               <h3 className="text-center">
                Join us today and become a VIP for FREE!</h3>
                <button
                  className="shadow px-4 py-3 item-center btn gsigninbtn btn-outline-white w-100 mb-2"
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    className="mr-4 h-6"
                    alt="Google icon"
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
                {/* <button
        className="btn btn-outline-primary w-100"
        onClick={() => signIn("facebook", { callbackUrl: "/" })}
      >
        Continue with Facebook
      </button> */}
                <div className="or_hr">
                  <hr />
                  <span>Or simply join with your email</span>
                  <hr />
                </div>
                {/* Optional email/password form */}
                <form className="mt-3">
                  <label>Email</label>
                  <input type="email" className=" bg-gray-200  form-control mb-2" placeholder="Enter Your Email" />
                  <label>Password</label>
                  <input type="password" className="bg-gray-200  form-control mb-2" placeholder="Enter Your Password" />
                  <input type="checkbox" /><label className="text-xs mt-3 text-center  px-4">Send me VIP updates and the latest codes, deals and promotions via email (you can unsubscribe or edit your preferences at any time)</label>
             <p className="text-xs mt-3 text-center  px-4">By becoming a VoucherCodes VIP member you confirm you’re 18+ and agree to accept our VoucherCodes VIP Terms & Conditions and our Privacy Notice</p>
                  <button className="btn btn-success w-100">Join Us</button>
                </form>
                <p className="text-xs mt-3 text-center  px-4">Already have an account? <span data-bs-toggle="tab"
                  data-bs-target="#login-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="login-tab-pane"
                  aria-selected="true">Sign in here</span> 
              </p> 
              
                 <div className="text-center">
                  <Image width={100} alt="4.5 Star" height={15} src={"/4.5-stars.svg"} />
                  <Image width={100} alt="Logo"  height={15} src={"/logo-light-bg.svg"} />

                </div>   {/* <form>
                  <input type="text" className="form-control mb-2" placeholder="Full Name" />
                  <input type="email" className="form-control mb-2" placeholder="Email" />
                  <input type="password" className="form-control mb-2" placeholder="Password" />
                  <button className="btn btn-primary w-100">Sign Up</button>
                </form> */}
              </div>
            </div>
          </div>

        </div>)}


      </div>
    </>
  );
}
