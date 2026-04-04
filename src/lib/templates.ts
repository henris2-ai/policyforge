export interface FormData {
  businessName: string;
  websiteUrl: string;
  businessType: string;
  country: string;
  documents: string[];
  dataCollected: string[];
  collectionMethods: string[];
  sharesWithThirdParties: boolean;
  analytics: string;
  sendsMarketingEmails: boolean;
  childrenUnder13: boolean;
  hasUserAccounts: boolean;
  sellsProducts: boolean;
  hasUserContent: boolean;
  jurisdiction: string;
}

function currentDate(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDataList(items: string[]): string {
  if (!items || items.length === 0) return "<li>Basic usage data</li>";
  return items.map((item) => `<li>${item}</li>`).join("\n            ");
}

function formatCollectionMethods(methods: string[]): string {
  if (!methods || methods.length === 0)
    return "<li>Directly from you when you provide it to us</li>";
  return methods.map((method) => `<li>${method}</li>`).join("\n            ");
}

// ---------------------------------------------------------------------------
// 1. Privacy Policy
// ---------------------------------------------------------------------------

export function generatePrivacyPolicy(data: FormData): string {
  const {
    businessName,
    websiteUrl,
    dataCollected,
    collectionMethods,
    sharesWithThirdParties,
    analytics,
    sendsMarketingEmails,
    childrenUnder13,
    jurisdiction,
  } = data;

  const analyticsSection =
    analytics && analytics !== "none"
      ? `
    <h2>5. Cookies and Tracking Technologies</h2>
    <p>${businessName} uses cookies and similar tracking technologies to monitor activity on our service and store certain information. We use the following analytics platform(s): <strong>${analytics}</strong>.</p>
    <h3>Types of Cookies We Use</h3>
    <ul>
      <li><strong>Essential Cookies:</strong> Required for the operation of our website. They enable core functionality such as security, network management, and account access.</li>
      <li><strong>Analytics Cookies:</strong> Allow us to recognize and count the number of visitors and to see how visitors move around our website. This helps us improve the way our website works.</li>
      <li><strong>Functionality Cookies:</strong> Used to recognize you when you return to our website. This enables us to personalize our content for you and remember your preferences.</li>
      <li><strong>Advertising Cookies:</strong> Used to deliver advertisements that are relevant to you and your interests.</li>
    </ul>
    <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.</p>`
      : `
    <h2>5. Cookies and Tracking Technologies</h2>
    <p>${businessName} uses only essential cookies required for the basic operation of our website. We do not use third-party analytics or advertising cookies.</p>
    <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.</p>`;

  const childrenSection = childrenUnder13
    ? `
    <h2>6. Children's Privacy</h2>
    <p>Our service may be accessed by children under the age of 13. We are committed to complying with the Children's Online Privacy Protection Act (COPPA) and any other applicable laws regarding the protection of children's personal information.</p>
    <p>We collect personal information from children under 13 only with verifiable parental consent. A parent or guardian may review, request deletion of, or refuse further collection of their child's personal information by contacting us at the address below.</p>
    <p>If we become aware that we have collected personal information from a child under 13 without verification of parental consent, we will take steps to remove that information from our servers.</p>`
    : `
    <h2>6. Children's Privacy</h2>
    <p>Our service is not directed to anyone under the age of 13 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us. If we become aware that we have collected personal information from children without verification of parental consent, we take steps to remove that information from our servers.</p>`;

  const thirdPartySection = sharesWithThirdParties
    ? `
    <h2>4. Data Sharing and Third Parties</h2>
    <p>${businessName} may share your personal information with third parties in the following circumstances:</p>
    <ul>
      <li><strong>Service Providers:</strong> We may employ third-party companies and individuals to facilitate our service, provide the service on our behalf, perform service-related functions, or assist us in analyzing how our service is used.</li>
      <li><strong>Business Transfers:</strong> If ${businessName} is involved in a merger, acquisition, or asset sale, your personal data may be transferred as a business asset.</li>
      <li><strong>Legal Requirements:</strong> We may disclose your personal data if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</li>
      <li><strong>Consent:</strong> We may share your information for any other purpose with your explicit consent.</li>
    </ul>
    <p>We require all third parties to respect the security of your personal data and to treat it in accordance with applicable law. We do not allow our third-party service providers to use your personal data for their own purposes and only permit them to process your personal data for specified purposes and in accordance with our instructions.</p>`
    : `
    <h2>4. Data Sharing and Third Parties</h2>
    <p>${businessName} does not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>
    <p>We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect our or others' rights, property, or safety.</p>`;

  const marketingSection = sendsMarketingEmails
    ? `
    <p>With your consent, we may also use your information to send you promotional communications, such as newsletters, marketing emails, or offers. You may opt out of receiving these communications at any time by following the unsubscribe link in any marketing email or by contacting us directly.</p>`
    : "";

  const gdprSection =
    jurisdiction === "EU" || jurisdiction === "GDPR"
      ? `
    <h3>Your Rights Under the GDPR</h3>
    <p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights under the General Data Protection Regulation (GDPR). ${businessName} aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your personal data.</p>
    <ul>
      <li><strong>Right of Access:</strong> You have the right to request copies of your personal data.</li>
      <li><strong>Right to Rectification:</strong> You have the right to request correction of any information you believe is inaccurate or incomplete.</li>
      <li><strong>Right to Erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
      <li><strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
      <li><strong>Right to Data Portability:</strong> You have the right to request that we transfer the data we have collected to another organization, or directly to you, under certain conditions.</li>
      <li><strong>Right to Object:</strong> You have the right to object to our processing of your personal data, under certain conditions.</li>
    </ul>`
      : "";

  const ccpaSection =
    jurisdiction === "US" ||
    jurisdiction === "California" ||
    jurisdiction === "CCPA"
      ? `
    <h3>Your Rights Under the CCPA</h3>
    <p>If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA):</p>
    <ul>
      <li><strong>Right to Know:</strong> You have the right to request that we disclose what personal information we collect, use, disclose, and sell.</li>
      <li><strong>Right to Delete:</strong> You have the right to request the deletion of your personal information, subject to certain exceptions.</li>
      <li><strong>Right to Opt-Out:</strong> You have the right to opt out of the sale of your personal information. ${businessName} does not sell personal information.</li>
      <li><strong>Right to Non-Discrimination:</strong> You have the right not to receive discriminatory treatment for exercising any of your CCPA rights.</li>
    </ul>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privacy Policy - ${businessName}</title>
  <style>
    body { font-family: 'Georgia', 'Times New Roman', serif; line-height: 1.8; color: #2d2d2d; max-width: 800px; margin: 0 auto; padding: 40px 20px; }
    h1 { font-size: 28px; border-bottom: 2px solid #333; padding-bottom: 10px; }
    h2 { font-size: 22px; margin-top: 32px; color: #1a1a1a; }
    h3 { font-size: 18px; margin-top: 24px; color: #333; }
    p { margin: 12px 0; text-align: justify; }
    ul { margin: 12px 0; padding-left: 28px; }
    li { margin: 6px 0; }
    .last-updated { font-style: italic; color: #666; margin-bottom: 24px; }
    .disclaimer { font-size: 13px; color: #888; margin-top: 40px; border-top: 1px solid #ddd; padding-top: 16px; }
  </style>
</head>
<body>
  <article>
    <h1>Privacy Policy</h1>
    <p class="last-updated">Last Updated: ${currentDate()}</p>

    <p>${businessName} ("we," "us," or "our") operates the website <a href="${websiteUrl}">${websiteUrl}</a> (the "Service"). This Privacy Policy informs you of our policies regarding the collection, use, and disclosure of personal information when you use our Service.</p>
    <p>By using the Service, you agree to the collection and use of information in accordance with this policy.</p>

    <h2>1. Information We Collect</h2>
    <p>We collect several types of information for various purposes to provide and improve our Service to you:</p>
    <h3>Personal Data</h3>
    <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This may include, but is not limited to:</p>
    <ul>
      ${formatDataList(dataCollected)}
    </ul>
    <h3>Usage Data</h3>
    <p>We may also collect information about how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.</p>

    <h2>2. How We Collect Information</h2>
    <p>We collect information through the following methods:</p>
    <ul>
      ${formatCollectionMethods(collectionMethods)}
    </ul>

    <h2>3. How We Use Your Information</h2>
    <p>${businessName} uses the collected data for the following purposes:</p>
    <ul>
      <li>To provide and maintain our Service</li>
      <li>To notify you about changes to our Service</li>
      <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
      <li>To provide customer support</li>
      <li>To gather analysis or valuable information so that we can improve our Service</li>
      <li>To monitor the usage of our Service</li>
      <li>To detect, prevent, and address technical issues</li>
    </ul>
    ${marketingSection}

    ${thirdPartySection}

    ${analyticsSection}

    ${childrenSection}

    <h2>7. Data Security</h2>
    <p>The security of your data is important to us. We implement appropriate technical and organizational security measures designed to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include, but are not limited to, encryption of data in transit and at rest, access controls, and regular security assessments.</p>
    <p>However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>

    <h2>8. Your Rights</h2>
    <p>Depending on your location and applicable laws, you may have certain rights regarding your personal information:</p>
    <ul>
      <li>The right to access the personal information we hold about you</li>
      <li>The right to request correction of inaccurate personal information</li>
      <li>The right to request deletion of your personal information</li>
      <li>The right to withdraw consent where processing is based on consent</li>
      <li>The right to lodge a complaint with a supervisory authority</li>
    </ul>
    ${gdprSection}
    ${ccpaSection}

    <h2>9. Changes to This Privacy Policy</h2>
    <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this policy.</p>
    <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>

    <h2>10. Contact Us</h2>
    <p>If you have any questions about this Privacy Policy, please contact us:</p>
    <ul>
      <li>By visiting our website: <a href="${websiteUrl}">${websiteUrl}</a></li>
    </ul>

    <p class="disclaimer">This privacy policy was generated by PolicyForge and is provided for informational purposes only. It does not constitute legal advice. We recommend consulting with a qualified attorney to ensure your privacy policy meets all applicable legal requirements.</p>
  </article>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// 2. Terms of Service
// ---------------------------------------------------------------------------

export function generateTermsOfService(data: FormData): string {
  const {
    businessName,
    websiteUrl,
    hasUserAccounts,
    hasUserContent,
    sellsProducts,
    jurisdiction,
  } = data;

  const accountSection = hasUserAccounts
    ? `
    <h2>3. User Accounts</h2>
    <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of these Terms, which may result in immediate termination of your account on our Service.</p>
    <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</p>
    <p>You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
    <p>We reserve the right to disable any user account at any time in our sole discretion for any or no reason, including if, in our opinion, you have violated any provision of these Terms.</p>`
    : "";

  const userContentSection = hasUserContent
    ? `
    <h2>${hasUserAccounts ? "5" : "4"}. User-Generated Content</h2>
    <p>Our Service may allow you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material ("User Content"). You are responsible for the User Content that you post on or through the Service, including its legality, reliability, and appropriateness.</p>
    <p>By posting User Content on or through the Service, you represent and warrant that:</p>
    <ul>
      <li>The User Content is yours (you own it) or you have the right to use it and the right to grant us the rights and license as provided in these Terms.</li>
      <li>The posting of your User Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person or entity.</li>
    </ul>
    <p>You retain any and all of your rights to any User Content you submit, post, or display on or through the Service, and you are responsible for protecting those rights. We take no responsibility and assume no liability for User Content you or any third party posts on or through the Service.</p>
    <p>${businessName} reserves the right to remove any User Content that violates these Terms or that we determine, in our sole discretion, to be unlawful, offensive, threatening, libelous, defamatory, obscene, or otherwise objectionable.</p>`
    : "";

  const ecommerceSection = sellsProducts
    ? `
    <h2>Purchases and Payment</h2>
    <p>If you wish to purchase any product or service made available through the Service, you may be asked to supply certain information relevant to your purchase, including your credit card number, the expiration date of your credit card, your billing address, and your shipping information.</p>
    <p>You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in connection with any purchase; and (ii) the information you supply to us is true, correct, and complete.</p>
    <p>We reserve the right to refuse or cancel your order at any time for reasons including but not limited to: product or service availability, errors in the description or price of the product or service, error in your order, or other reasons.</p>
    <p>We reserve the right to refuse or cancel your order if fraud or an unauthorized or illegal transaction is suspected.</p>`
    : "";

  const accountNumbering = hasUserAccounts ? "4" : "3";
  const prohibitedNumber = hasUserContent
    ? hasUserAccounts
      ? "6"
      : "5"
    : hasUserAccounts
      ? "5"
      : "4";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Terms of Service - ${businessName}</title>
  <style>
    body { font-family: 'Georgia', 'Times New Roman', serif; line-height: 1.8; color: #2d2d2d; max-width: 800px; margin: 0 auto; padding: 40px 20px; }
    h1 { font-size: 28px; border-bottom: 2px solid #333; padding-bottom: 10px; }
    h2 { font-size: 22px; margin-top: 32px; color: #1a1a1a; }
    h3 { font-size: 18px; margin-top: 24px; color: #333; }
    p { margin: 12px 0; text-align: justify; }
    ul { margin: 12px 0; padding-left: 28px; }
    li { margin: 6px 0; }
    .last-updated { font-style: italic; color: #666; margin-bottom: 24px; }
    .disclaimer { font-size: 13px; color: #888; margin-top: 40px; border-top: 1px solid #ddd; padding-top: 16px; }
  </style>
</head>
<body>
  <article>
    <h1>Terms of Service</h1>
    <p class="last-updated">Last Updated: ${currentDate()}</p>

    <p>Please read these Terms of Service ("Terms," "Terms of Service") carefully before using the <a href="${websiteUrl}">${websiteUrl}</a> website (the "Service") operated by ${businessName} ("us," "we," or "our").</p>
    <p>Your access to and use of the Service is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.</p>

    <h2>1. Acceptance of Terms</h2>
    <p>By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, then you may not access the Service.</p>
    <p>We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.</p>

    <h2>2. Use of the Service</h2>
    <p>You agree to use the Service only for purposes that are lawful and in accordance with these Terms. You agree not to use the Service:</p>
    <ul>
      <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
      <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
      <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
      <li>To impersonate or attempt to impersonate ${businessName}, a ${businessName} employee, another user, or any other person or entity.</li>
      <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful.</li>
    </ul>

    ${accountSection}

    <h2>${accountNumbering}. Intellectual Property</h2>
    <p>The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of ${businessName} and its licensors. The Service is protected by copyright, trademark, and other laws of both ${jurisdiction || "the applicable jurisdiction"} and foreign countries.</p>
    <p>Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of ${businessName}. Nothing in these Terms constitutes a transfer of any intellectual property rights from us to you.</p>

    ${userContentSection}

    ${ecommerceSection}

    <h2>${prohibitedNumber}. Prohibited Activities</h2>
    <p>You are prohibited from using the Service or its content for any of the following purposes:</p>
    <ul>
      <li>To engage in any form of harassment, abuse, or harm to another person.</li>
      <li>To use the Service in any manner that could disable, overburden, damage, or impair the Service or interfere with any other party's use of the Service.</li>
      <li>To use any robot, spider, or other automatic device, process, or means to access the Service for any purpose, including monitoring or copying any of the material on the Service.</li>
      <li>To introduce any viruses, trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful.</li>
      <li>To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Service, the server on which the Service is stored, or any server, computer, or database connected to the Service.</li>
      <li>To otherwise attempt to interfere with the proper working of the Service.</li>
    </ul>

    <h2>Limitation of Liability</h2>
    <p>IN NO EVENT SHALL ${businessName.toUpperCase()}, NOR ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:</p>
    <ul>
      <li>Your access to or use of (or inability to access or use) the Service;</li>
      <li>Any conduct or content of any third party on the Service;</li>
      <li>Any content obtained from the Service; and</li>
      <li>Unauthorized access, use, or alteration of your transmissions or content,</li>
    </ul>
    <p>whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.</p>

    <h2>Indemnification</h2>
    <p>You agree to defend, indemnify, and hold harmless ${businessName} and its licensees and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to attorney's fees) arising from your use of and access to the Service, or your violation of any term of these Terms.</p>

    <h2>Governing Law</h2>
    <p>These Terms shall be governed and construed in accordance with the laws of ${jurisdiction || "the applicable jurisdiction"}, without regard to its conflict of law provisions.</p>
    <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>

    <h2>Changes to Terms</h2>
    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
    <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised Terms. If you do not agree to the new Terms, please stop using the Service.</p>

    <h2>Contact Us</h2>
    <p>If you have any questions about these Terms, please contact us:</p>
    <ul>
      <li>By visiting our website: <a href="${websiteUrl}">${websiteUrl}</a></li>
    </ul>

    <p class="disclaimer">These terms of service were generated by PolicyForge and are provided for informational purposes only. They do not constitute legal advice. We recommend consulting with a qualified attorney to ensure your terms of service meet all applicable legal requirements.</p>
  </article>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// 3. Cookie Policy
// ---------------------------------------------------------------------------

export function generateCookiePolicy(data: FormData): string {
  const { businessName, websiteUrl, analytics } = data;

  const thirdPartyCookies =
    analytics && analytics !== "none"
      ? `
    <h2>4. Third-Party Cookies</h2>
    <p>In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.</p>
    <p>We use the following third-party analytics and services: <strong>${analytics}</strong>.</p>
    <p>These third parties may use cookies, web beacons, and similar technologies to collect or receive information from our website and elsewhere on the Internet and use that information to provide measurement services and target ads. Each third-party service provider has its own privacy policy regarding the data it collects.</p>
    <h3>Common Third-Party Cookies</h3>
    <ul>
      <li><strong>Google Analytics:</strong> Used to track website usage and compile reports on website activity. Google stores the information collected by the cookie on servers in the United States. Google may transfer this information to third parties where required by law, or where third parties process the information on Google's behalf.</li>
      <li><strong>Social Media Cookies:</strong> These cookies are set by social media services that we have added to the site to enable you to share our content with your friends and networks. They are capable of tracking your browser across other sites and building up a profile of your interests.</li>
    </ul>`
      : `
    <h2>4. Third-Party Cookies</h2>
    <p>${businessName} does not currently use third-party analytics or advertising cookies. If this changes in the future, we will update this Cookie Policy accordingly and notify you of any significant changes.</p>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cookie Policy - ${businessName}</title>
  <style>
    body { font-family: 'Georgia', 'Times New Roman', serif; line-height: 1.8; color: #2d2d2d; max-width: 800px; margin: 0 auto; padding: 40px 20px; }
    h1 { font-size: 28px; border-bottom: 2px solid #333; padding-bottom: 10px; }
    h2 { font-size: 22px; margin-top: 32px; color: #1a1a1a; }
    h3 { font-size: 18px; margin-top: 24px; color: #333; }
    p { margin: 12px 0; text-align: justify; }
    ul { margin: 12px 0; padding-left: 28px; }
    li { margin: 6px 0; }
    .last-updated { font-style: italic; color: #666; margin-bottom: 24px; }
    .disclaimer { font-size: 13px; color: #888; margin-top: 40px; border-top: 1px solid #ddd; padding-top: 16px; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; }
    th, td { border: 1px solid #ddd; padding: 10px 14px; text-align: left; }
    th { background-color: #f5f5f5; font-weight: bold; }
  </style>
</head>
<body>
  <article>
    <h1>Cookie Policy</h1>
    <p class="last-updated">Last Updated: ${currentDate()}</p>

    <p>This Cookie Policy explains what cookies are, how ${businessName} ("we," "us," or "our") uses cookies on <a href="${websiteUrl}">${websiteUrl}</a> (the "Service"), and your choices regarding cookies.</p>

    <h2>1. What Are Cookies</h2>
    <p>Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third party to recognize you and make your next visit easier and the Service more useful to you.</p>
    <p>Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your personal computer or mobile device when you go offline, while session cookies are deleted as soon as you close your web browser.</p>

    <h2>2. How ${businessName} Uses Cookies</h2>
    <p>When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes:</p>
    <ul>
      <li>To enable certain functions of the Service</li>
      <li>To provide analytics</li>
      <li>To store your preferences</li>
      <li>To enable advertisement delivery, including behavioral advertising</li>
    </ul>

    <h2>3. Types of Cookies We Use</h2>
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Purpose</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Strictly Necessary</strong></td>
          <td>These cookies are essential for you to browse the website and use its features, such as accessing secure areas of the site. Without these cookies, services you have asked for cannot be provided.</td>
          <td>Session</td>
        </tr>
        <tr>
          <td><strong>Performance</strong></td>
          <td>These cookies collect information about how you use the website, such as which pages you visit most often and if you receive error messages. These cookies do not collect information that identifies you. All information is aggregated and anonymous.</td>
          <td>Up to 2 years</td>
        </tr>
        <tr>
          <td><strong>Functionality</strong></td>
          <td>These cookies allow the website to remember choices you make, such as your user name, language, or the region you are in, and provide enhanced, more personal features.</td>
          <td>Up to 2 years</td>
        </tr>
        <tr>
          <td><strong>Targeting / Advertising</strong></td>
          <td>These cookies are used to deliver content that is more relevant to you and your interests. They may be used to deliver targeted advertising or to limit the number of times you see an advertisement.</td>
          <td>Up to 2 years</td>
        </tr>
      </tbody>
    </table>

    ${thirdPartyCookies}

    <h2>5. Managing Cookies</h2>
    <p>You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.</p>
    <h3>How to Control Cookies in Your Browser</h3>
    <p>Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.</p>
    <h3>How to Manage Cookies on Popular Browsers</h3>
    <ul>
      <li><strong>Google Chrome:</strong> Settings &rarr; Privacy and Security &rarr; Cookies and other site data</li>
      <li><strong>Mozilla Firefox:</strong> Settings &rarr; Privacy &amp; Security &rarr; Cookies and Site Data</li>
      <li><strong>Safari:</strong> Preferences &rarr; Privacy &rarr; Manage Website Data</li>
      <li><strong>Microsoft Edge:</strong> Settings &rarr; Cookies and site permissions &rarr; Manage and delete cookies and site data</li>
    </ul>
    <h3>Opt-Out of Interest-Based Advertising</h3>
    <p>You can opt out of interest-based advertising by visiting:</p>
    <ul>
      <li>Digital Advertising Alliance: <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer">https://optout.aboutads.info</a></li>
      <li>Network Advertising Initiative: <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer">https://optout.networkadvertising.org</a></li>
    </ul>

    <h2>6. Changes to This Cookie Policy</h2>
    <p>We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.</p>

    <h2>7. Contact Us</h2>
    <p>If you have any questions about our use of cookies or other technologies, please contact us:</p>
    <ul>
      <li>By visiting our website: <a href="${websiteUrl}">${websiteUrl}</a></li>
    </ul>

    <p class="disclaimer">This cookie policy was generated by PolicyForge and is provided for informational purposes only. It does not constitute legal advice. We recommend consulting with a qualified attorney to ensure your cookie policy meets all applicable legal requirements.</p>
  </article>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// 4. Disclaimer
// ---------------------------------------------------------------------------

export function generateDisclaimer(data: FormData): string {
  const { businessName, websiteUrl, businessType } = data;

  const professionalAdvice =
    businessType === "healthcare" ||
    businessType === "legal" ||
    businessType === "finance" ||
    businessType === "consulting"
      ? `
    <h2>4. No Professional Advice</h2>
    <p>The information provided on the Service is for general informational purposes only and should not be construed as professional ${businessType} advice. The content on this website is not intended to be a substitute for professional ${businessType} advice, diagnosis, or treatment.</p>
    <p>Always seek the advice of a qualified professional with any questions you may have regarding your specific situation. Never disregard professional advice or delay in seeking it because of something you have read on this website.</p>
    <p>${businessName} does not recommend or endorse any specific products, procedures, opinions, or other information that may be mentioned on the Service. Reliance on any information provided by the Service is solely at your own risk.</p>`
      : `
    <h2>4. No Professional Advice</h2>
    <p>The information provided on the Service is for general informational and educational purposes only. It is not intended to serve as, and should not be construed as, professional advice in any field, including but not limited to legal, financial, medical, or technical advice.</p>
    <p>You should always consult with an appropriately qualified professional before making decisions based on the information provided on this website. ${businessName} is not responsible for any actions taken based on the information provided on the Service.</p>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Disclaimer - ${businessName}</title>
  <style>
    body { font-family: 'Georgia', 'Times New Roman', serif; line-height: 1.8; color: #2d2d2d; max-width: 800px; margin: 0 auto; padding: 40px 20px; }
    h1 { font-size: 28px; border-bottom: 2px solid #333; padding-bottom: 10px; }
    h2 { font-size: 22px; margin-top: 32px; color: #1a1a1a; }
    h3 { font-size: 18px; margin-top: 24px; color: #333; }
    p { margin: 12px 0; text-align: justify; }
    ul { margin: 12px 0; padding-left: 28px; }
    li { margin: 6px 0; }
    .last-updated { font-style: italic; color: #666; margin-bottom: 24px; }
    .disclaimer { font-size: 13px; color: #888; margin-top: 40px; border-top: 1px solid #ddd; padding-top: 16px; }
  </style>
</head>
<body>
  <article>
    <h1>Disclaimer</h1>
    <p class="last-updated">Last Updated: ${currentDate()}</p>

    <p>The information contained on the <a href="${websiteUrl}">${websiteUrl}</a> website (the "Service") is for general information purposes only. ${businessName} ("we," "us," or "our") assumes no responsibility for errors or omissions in the contents of the Service.</p>

    <h2>1. General Disclaimer</h2>
    <p>The information provided by ${businessName} on the Service is provided "as is" with no representations or warranties, express or implied. ${businessName} makes no representations or warranties in relation to the information on the Service.</p>
    <p>Without prejudice to the generality of the foregoing paragraph, ${businessName} does not warrant that:</p>
    <ul>
      <li>The information on the Service will be constantly available, or available at all; or</li>
      <li>The information on the Service is complete, true, accurate, up-to-date, or non-misleading.</li>
    </ul>

    <h2>2. Accuracy of Information</h2>
    <p>While we endeavor to keep the information up-to-date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the Service or the information, products, services, or related graphics contained on the Service for any purpose. Any reliance you place on such information is therefore strictly at your own risk.</p>

    <h2>3. External Links Disclaimer</h2>
    <p>The Service may contain links to external websites that are not provided or maintained by or in any way affiliated with ${businessName}. Please note that ${businessName} does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>
    <p>The inclusion of any links does not necessarily imply a recommendation or endorsement of the views expressed within them. ${businessName} has no control over the nature, content, and availability of those sites. We bear no responsibility for the content of linked third-party sites and make no representation about the quality or reliability of such sites.</p>

    ${professionalAdvice}

    <h2>5. Testimonials and Reviews</h2>
    <p>The Service may contain testimonials or reviews by users of our products and/or services. These testimonials reflect the real-life experiences and opinions of such users. However, the experiences are personal to those particular users and may not necessarily be representative of all users of our products and/or services. We do not claim, and you should not assume, that all users will have the same experiences.</p>

    <h2>6. Limitation of Liability</h2>
    <p>In no event shall ${businessName} be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence, or other tort, arising out of or in connection with the use of the Service or the contents of the Service. ${businessName} reserves the right to make additions, deletions, or modifications to the contents of the Service at any time without prior notice.</p>
    <p>In jurisdictions that do not allow the exclusion or limitation of incidental or consequential damages, our liability shall be limited to the maximum extent permitted by law.</p>

    <h2>7. Errors and Omissions</h2>
    <p>The information given by the Service is for general guidance on matters of interest only. Even if ${businessName} takes every precaution to ensure that the content of the Service is both current and accurate, errors can occur. Plus, given the changing nature of laws, rules, and regulations, there may be delays, omissions, or inaccuracies in the information contained on the Service.</p>

    <h2>8. Fair Use Disclaimer</h2>
    <p>The Service may contain copyrighted material the use of which has not always been specifically authorized by the copyright owner. ${businessName} makes such material available for criticism, comment, news reporting, teaching, scholarship, or research. If you wish to use copyrighted material from the Service for purposes of your own that go beyond fair use, you must obtain permission from the copyright owner.</p>

    <h2>9. Contact Us</h2>
    <p>If you have any questions about this Disclaimer, please contact us:</p>
    <ul>
      <li>By visiting our website: <a href="${websiteUrl}">${websiteUrl}</a></li>
    </ul>

    <p class="disclaimer">This disclaimer was generated by PolicyForge and is provided for informational purposes only. It does not constitute legal advice. We recommend consulting with a qualified attorney to ensure your disclaimer meets all applicable legal requirements.</p>
  </article>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// 5. Refund Policy
// ---------------------------------------------------------------------------

export function generateRefundPolicy(data: FormData): string {
  const { businessName, websiteUrl, businessType, sellsProducts } = data;

  const productType = sellsProducts ? "products" : "services";
  const returnSection = sellsProducts
    ? `
    <h2>3. Return Conditions</h2>
    <p>To be eligible for a return and refund, the following conditions must be met:</p>
    <ul>
      <li>The item must be unused and in the same condition that you received it.</li>
      <li>The item must be in the original packaging.</li>
      <li>You must provide a receipt or proof of purchase.</li>
      <li>The return request must be made within the eligible refund period.</li>
    </ul>
    <h3>Items That Cannot Be Returned</h3>
    <p>Certain types of items cannot be returned, including:</p>
    <ul>
      <li>Perishable goods such as food, flowers, newspapers, or magazines</li>
      <li>Gift cards</li>
      <li>Downloadable software products</li>
      <li>Items that have been used, damaged, or altered after delivery</li>
      <li>Personalized or custom-made items</li>
      <li>Intimate or sanitary goods</li>
      <li>Hazardous materials</li>
    </ul>`
    : `
    <h2>3. Service Refund Conditions</h2>
    <p>Refunds for services are evaluated on a case-by-case basis. The following conditions generally apply:</p>
    <ul>
      <li>Refund requests must be submitted within the eligible refund period.</li>
      <li>If the service has not yet been performed or delivered, you may be eligible for a full refund.</li>
      <li>If the service has been partially performed, you may be eligible for a partial refund proportional to the unused portion of the service.</li>
      <li>If the service has been fully performed, refunds are generally not available unless the service was materially deficient.</li>
    </ul>
    <h3>Services That Cannot Be Refunded</h3>
    <p>The following types of services are generally not eligible for refunds:</p>
    <ul>
      <li>Services that have been fully delivered and completed</li>
      <li>Custom or personalized services completed to specification</li>
      <li>Consultation services already rendered</li>
      <li>Services where digital deliverables have been provided and accessed</li>
    </ul>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Refund Policy - ${businessName}</title>
  <style>
    body { font-family: 'Georgia', 'Times New Roman', serif; line-height: 1.8; color: #2d2d2d; max-width: 800px; margin: 0 auto; padding: 40px 20px; }
    h1 { font-size: 28px; border-bottom: 2px solid #333; padding-bottom: 10px; }
    h2 { font-size: 22px; margin-top: 32px; color: #1a1a1a; }
    h3 { font-size: 18px; margin-top: 24px; color: #333; }
    p { margin: 12px 0; text-align: justify; }
    ul { margin: 12px 0; padding-left: 28px; }
    li { margin: 6px 0; }
    ol { margin: 12px 0; padding-left: 28px; }
    .last-updated { font-style: italic; color: #666; margin-bottom: 24px; }
    .disclaimer { font-size: 13px; color: #888; margin-top: 40px; border-top: 1px solid #ddd; padding-top: 16px; }
  </style>
</head>
<body>
  <article>
    <h1>Refund Policy</h1>
    <p class="last-updated">Last Updated: ${currentDate()}</p>

    <p>Thank you for shopping with ${businessName}. We appreciate your business and want to ensure your satisfaction. This Refund Policy outlines the terms and conditions under which we accept returns and issue refunds for ${productType} purchased through <a href="${websiteUrl}">${websiteUrl}</a> (the "Service").</p>

    <h2>1. Overview</h2>
    <p>${businessName} ("we," "us," or "our") is committed to ensuring that our customers are satisfied with their purchases. If you are not entirely satisfied with your purchase, we are here to help.</p>

    <h2>2. Refund Eligibility Period</h2>
    <p>You have <strong>30 calendar days</strong> from the date of purchase to request a refund. After this 30-day period, we are unable to offer you a refund or exchange.</p>
    <p>To be eligible for a refund, you must contact us within this timeframe and provide your order number and reason for the refund request.</p>

    ${returnSection}

    <h2>4. Refund Process</h2>
    <p>To initiate a refund, please follow these steps:</p>
    <ol>
      <li><strong>Contact Us:</strong> Reach out to us through our website at <a href="${websiteUrl}">${websiteUrl}</a> with your order number and reason for the refund.</li>
      <li><strong>Confirmation:</strong> We will review your request and confirm whether your ${productType} ${sellsProducts ? "are" : "is"} eligible for a refund within 3 business days.</li>
      ${sellsProducts ? '<li><strong>Return Shipping:</strong> If applicable, we will provide you with return shipping instructions. You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.</li>' : ""}
      ${sellsProducts ? '<li><strong>Inspection:</strong> Once we receive and inspect your return, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</li>' : ""}
      <li><strong>Refund Issued:</strong> If your refund is approved, it will be processed and a credit will automatically be applied to your original method of payment within 5-10 business days.</li>
    </ol>

    <h2>5. Refund Timeframes</h2>
    <p>Once your refund is approved, please allow the following processing times:</p>
    <ul>
      <li><strong>Credit/Debit Cards:</strong> 5-10 business days for the refund to appear on your statement.</li>
      <li><strong>PayPal:</strong> 3-5 business days.</li>
      <li><strong>Bank Transfer:</strong> 5-10 business days.</li>
      <li><strong>Store Credit:</strong> Issued immediately upon approval.</li>
    </ul>
    <p>Please note that your bank or credit card company may require additional time to process and post the refund.</p>

    <h2>6. Late or Missing Refunds</h2>
    <p>If you have not received your refund within the expected timeframe:</p>
    <ol>
      <li>First, check your bank account or credit card statement again.</li>
      <li>Then, contact your credit card company. It may take some time before your refund is officially posted.</li>
      <li>Next, contact your bank. There is often some processing time before a refund is posted.</li>
      <li>If you have done all of this and still have not received your refund, please contact us through our website.</li>
    </ol>

    <h2>7. Partial Refunds</h2>
    <p>In certain situations, only partial refunds may be granted:</p>
    <ul>
      ${sellsProducts ? "<li>Any item not in its original condition, is damaged, or missing parts for reasons not due to our error.</li>" : ""}
      ${sellsProducts ? "<li>Any item that is returned more than 30 days after delivery.</li>" : ""}
      <li>Situations where only a portion of the ${productType} was defective or unsatisfactory.</li>
      <li>When a subscription or service has been partially consumed.</li>
    </ul>

    <h2>8. Exchanges</h2>
    <p>We only replace ${productType} if they are defective or damaged upon receipt. If you need to exchange an item for the same item, please contact us through our website and we will guide you through the process.</p>

    <h2>9. Exceptions</h2>
    <p>${businessName} reserves the right to refuse a refund if:</p>
    <ul>
      <li>The refund request is made after the eligible refund period has expired.</li>
      <li>The ${productType} ${sellsProducts ? "have" : "has"} been used, damaged, or altered by the customer.</li>
      <li>There is evidence of fraud or abuse of our refund policy.</li>
      <li>The purchase was made during a promotional period with a clearly stated no-refund policy.</li>
    </ul>

    <h2>10. Cancellations</h2>
    <p>Orders may be cancelled within 24 hours of placement for a full refund, provided the ${productType} ${sellsProducts ? "have" : "has"} not already been shipped or delivered. After this window, standard refund policies apply.</p>

    <h2>11. Changes to This Policy</h2>
    <p>We reserve the right to modify this Refund Policy at any time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.</p>

    <h2>12. Contact Us</h2>
    <p>If you have any questions about our Refund Policy, please contact us:</p>
    <ul>
      <li>By visiting our website: <a href="${websiteUrl}">${websiteUrl}</a></li>
    </ul>

    <p class="disclaimer">This refund policy was generated by PolicyForge and is provided for informational purposes only. It does not constitute legal advice. We recommend consulting with a qualified attorney to ensure your refund policy meets all applicable legal requirements.</p>
  </article>
</body>
</html>`;
}
