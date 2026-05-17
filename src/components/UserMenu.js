
'use client';
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';
import {
  Gift,
  Wallet,
  ReceiptText,
  User,
  Bell,
  KeyRound,
  Users,
  Send,
  LifeBuoy,
} from "lucide-react";
export default function UserMenu() {
    
const menuItems = [
  { icon: Gift, label: "Gift Card Wallet",link:"/account/wallet" },
  { icon: Wallet, label: "Transaction Tracker",link:"/account/" },
  { icon: User, label: "Personal Details",link:"/account/your-personal-details" },
  { icon: Bell, label: "Communication Preferences",link:"/account/communication-preferences" },
  { icon: KeyRound, label: "Sign in Details",link:"/account/your-personal-details" },
  { icon: Users, label: "VD Community",link:"/account/" },
  { icon: Send, label: "Submit a Code",link:"/account/submit-code" },
  { icon: LifeBuoy, label: "Support",link:"/contact-us" },
];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="col-11">
   
        <ul className="sidebar_list">
          {menuItems.map(({ icon: Icon, label ,link}) => (
            <li    key={label} className='mb-2'>
                <Link className="px-4 card p-3 shadow-sm border-0 bg-white col-12" href={link}>  <Icon className="w-5 h-5 text-gray-700" />   <span className="text-gray-800 font-medium">{label}</span></Link></li>
        
       
      ))}
        <li className='mb-2'><button className="card p-3 shadow-sm border-0 bg-white col-12"  onClick={() => signOut()}>Sign out</button></li>
     
          </ul>
      </div>
    </nav>
  );
}
