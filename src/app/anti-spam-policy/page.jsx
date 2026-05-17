
import Head from 'next/head';
import Link from 'next/link';

export async function generateMetadata({ params }) {

  return {
    title: "Anti-Spam Policy | Native Discounts",

    description:  "Native Discounts follows a strict anti-spam policy. We respect user inboxes and ensure no unwanted or irrelevant communication is ever sent.",
    keywords:"",
  };
}

export default function AntiSpamPolicy() {
  return (
    <><link rel="canonical" href="https://www.nativediscounts.com/anti-spam-policy"/>
    <main className="container py-4">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb">   
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Anti-Spam Policy
                </li>
            </ol>
        </nav>
        <h1>Anti-Spam Policy</h1>
    <h2>1. Our Commitment to a Spam-Free Experience</h2>
        <p>


NativeDiscounts.com (&quot;We,&quot; &quot;Our,&quot; &quot;Us&quot;) is committed to a zero-tolerance policy against spam.
We believe in providing valuable, solicited content —specifically, verified coupon codes, deals,
and promotional offers —to users who have explicitly requested it.</p>
<p>This policy applies to all electronic communications sent by us, including but not limited to email,
text messages, and other forms of digital communication.</p>
<h2>2. What is Spam?</h2>
<p>Spam is defined as unsolicited, commercial electronic mail, text, or digital communication. Any
email, text, or digital message is considered spam if:</p>
<ul>
    <li>The recipient&#39;s personal identity and context are misleading or concealed.
    </li>
    <li>The primary purpose is commercial promotion without prior permission or a clear
existing business relationship.</li>
<li>The message fails to comply with the rules set forth by the U.S. CAN-SPAM Act of 2003.</li>
    </ul> 
<h3 className="fw-bold">3. Compliance with U.S. CAN-SPAM Act</h3>
<p>
We strictly adhere to all requirements of the Controlling the Assault of Non-Solicited
Pornography and Marketing (CAN-SPAM) Act of 2003. Specifically, every commercial email
sent by NativeDiscounts.com will:</p>
<ul>
<li> <b>Accurate Header Information:</b> The &quot;From,&quot; &quot;To,&quot; and routing information will be
accurate and identify the sender as NativeDiscounts.com or a clearly associated entity.</li>
<li><b>Non-Deceptive Subject Lines:</b> The subject line will accurately reflect the content of the
message and will not be misleading.</li>
<li> <b>Identification as an Advertisement:</b> The message will clearly and conspicuously
disclose that it is an advertisement or solicitation (unless the message is purely
transactional).</li>
<li> <b>Physical Address:</b> All commercial emails will contain a valid physical postal address for
our business.</li>
<li> <b>Easy Opt-Out Mechanism:</b> We will provide a clear and conspicuous explanation of how
the recipient can easily opt out of receiving future commercial emails (an &quot;Unsubscribe&quot;
link).</li>
<li> <b>Prompt Opt-Out Honor:</b> We will honor all opt-out requests within ten (10) business
days of receipt. Once an opt-out request is received, we will not send any further
commercial messages to that address.
</li>
</ul>
<h3 className="fw-bold">

4. Our Email Practices (Consent and Subscription)</h3>
<p>We only send commercial electronic messages to users who have provided Affirmative Consent
(Opted-In) to receive communications from us. This includes:</p>
<ul>
<li> Users who have actively subscribed to our mailing list via a form on our website.</li>
<li> Users who have signed up for an account and agreed to receive promotional
communications.</li>
<li> Users who have previously purchased products or services from us and have not opted
out of receiving commercial emails regarding similar products or services.</li>
</ul>
<h3 className="fw-bold">
5. Prohibited Actions (Affiliate Marketing)</h3>
<p>
As a platform that deals with coupons and affiliate links, we require all third-party marketers,
advertisers, and affiliates working on our behalf to comply with this Anti-Spam Policy and the
CAN-SPAM Act strictly.</p>
<p>
We prohibit the use of any methods that violate anti-spam legislation, including but not limited
to:</p>
<ul>
<li> Using false or misleading information in email headers or subject lines.</li>
<li> Sending commercial messages to purchased, rented, or harvested email lists.</li>
<li> Failing to include a clear, working unsubscribe link in every commercial email.</li>
</ul>
<p>
NativeDiscounts.com will immediately terminate the relationship with any third party found to be
violating this Anti-Spam Policy.</p>
<h3 className="fw-bold">6. How to Report Spam</h3>
<p>If you believe you have received unsolicited commercial electronic communication from
NativeDiscounts.com or an affiliate marketing our offers in violation of this policy, please notify
us immediately at:</p>
<p><b>Email:</b> nativediscounts@gmail.com</p>
<p>We take every complaint seriously and will investigate all reports promptly and thoroughly.</p>
      
            </main>  
        </>
    );  
}
