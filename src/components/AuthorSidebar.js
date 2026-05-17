'use client';

import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PublicIcon from "@mui/icons-material/Public";
import StorefrontIcon from  "@mui/icons-material/Storefront";
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import Link from 'next/link';

export default function AuthorSidebar() {
  return (
    <div className="d-flex flex-column p-3 text-light vh-100" style={{minWidth:'fit-content', width: '250px',background:"#268b67" }}>
      <h5 className="text-white">Hi! Author</h5>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link  href="/admin" className="nav-link text-white d-flex align-items-center">
            <DashboardIcon className="me-2" /> Dashboard
          </Link>
        </li>
        
<li className="nav-item">
  <a
    className="nav-link text-white d-flex align-items-center"
    data-bs-toggle="collapse"
    href="#brandMenu"
    role="button"
    aria-expanded="false"
    aria-controls="brandMenu"
  >
    <StorefrontIcon className="me-2" />
    <span>Manage Brands</span>
    <ExpandMoreIcon className="ms-auto" />
  </a>

  <div className="collapse ps-4" id="brandMenu">
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link href="/admin/brands" className="nav-link text-white">
          Brand List
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/admin/brand-editor" className="nav-link text-white">
          Add New Brand
        </Link>
      </li>
    </ul>
  </div>
</li>
<li className="nav-item">
  <a
    className="nav-link text-white d-flex align-items-center"
    data-bs-toggle="collapse"
    href="#couponMenu"
    role="button"
    aria-expanded="false"
    aria-controls="brandMenu"
  >
    <PriceCheckIcon className="me-2" />
    <span>Manage Coupons</span>
    <ExpandMoreIcon className="ms-auto" />
  </a>

  <div className="collapse ps-4" id="couponMenu">
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link href="/admin/coupon-list" className="nav-link text-white">
          Coupon List
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/admin/coupons-editor" className="nav-link text-white">
          Add New Coupons
        </Link>
      </li>
    </ul>
  </div>
</li>


   
<li className="nav-item">
  <a
    className="nav-link text-white d-flex align-items-center"
    data-bs-toggle="collapse"
    href="#blogMenu"
    role="button"
    aria-expanded="false"
    aria-controls="blogMenu"
  >
    <ArticleIcon className="me-2" />
    <span>Manage Blog</span>
    <ExpandMoreIcon className="ms-auto" />
  </a>

  <div className="collapse ps-4" id="blogMenu">
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link href="/admin/blog-list" className="nav-link text-white">
          Blog List
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/admin/blog-editor" className="nav-link text-white">
          Add New Blog
        </Link>
      </li>
    </ul>
  </div>
</li>

        <li>
          <Link href="/admin/settings" className="nav-link text-white d-flex align-items-center">
            <SettingsIcon className="me-2" /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
