import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "PolicyForge <noreply@policyforge.io>";

export async function sendWelcomeEmail(to: string, businessName: string) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Welcome to PolicyForge, ${businessName}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #4F46E5;">Welcome to PolicyForge!</h1>
        <p>Hi there,</p>
        <p>Thanks for using PolicyForge to generate legal documents for <strong>${businessName}</strong>.</p>
        <p>Your documents are ready. Here's what you can do next:</p>
        <ul>
          <li>Copy the generated text and add it to your website</li>
          <li>Download in HTML format and upload directly</li>
          <li>Customize further as needed for your specific situation</li>
        </ul>
        <p><strong>Important:</strong> While our documents are based on common legal standards, we recommend having a legal professional review them for your specific situation.</p>
        <p>Need all 5 document types? <a href="https://policyforge.io/generate" style="color: #4F46E5;">Upgrade to the Complete Bundle</a> for just $19.</p>
        <p>Best,<br>The PolicyForge Team</p>
      </div>
    `,
  });
}

export async function sendPurchaseConfirmation(
  to: string,
  businessName: string,
  plan: string
) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Your PolicyForge ${plan} purchase is confirmed`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #4F46E5;">Purchase Confirmed!</h1>
        <p>Hi there,</p>
        <p>Your <strong>${plan}</strong> purchase for <strong>${businessName}</strong> has been confirmed.</p>
        <p>You now have access to generate all 5 document types:</p>
        <ul>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
          <li>Cookie Policy</li>
          <li>Disclaimer</li>
          <li>Refund Policy</li>
        </ul>
        <p><a href="https://policyforge.io/generate" style="color: #4F46E5; font-weight: bold;">Generate your documents now &rarr;</a></p>
        <p>Best,<br>The PolicyForge Team</p>
      </div>
    `,
  });
}
