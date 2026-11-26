import type { ContactForm } from "../validations/contactform.js";

/* Contact Form Notification */
export const contactFormTemplate = (data: ContactForm) => {
  return `
  <div style="margin:0;padding:35px 15px;background:#0b0b0b;font-family:Arial,Helvetica,sans-serif;color:#f5f5f5;">
    <div style="max-width:580px;margin:0 auto;">

      <div style="padding:20px 0;border-bottom:1px solid #292929;">
        <span style="font-size:25px;font-weight:bold;color:#ffffff;">
          Bulus<span style="color:#9de8d1;">.</span>
        </span>
        <span style="float:right;background:#193d32;color:#9de8d1;padding:7px 12px;border-radius:20px;font-size:10px;font-weight:bold;">
          NEW MESSAGE
        </span>
      </div>

      <div style="padding:35px 0 25px;">
        <h1 style="font-size:27px;margin:0 0 12px;color:#ffffff;">
          You've got a new message.
        </h1>
        <p style="font-size:14px;line-height:1.7;color:#999999;margin:0;">
          Someone just reached out through your portfolio website.
        </p>
      </div>

      <div style="background:#151515;border:1px solid #292929;border-radius:8px;padding:24px;">

        <p style="font-size:11px;letter-spacing:1px;color:#9de8d1;font-weight:bold;margin:0 0 12px;">
          SENDER DETAILS
        </p>

        <p style="font-size:16px;color:#ffffff;margin:0 0 6px;font-weight:bold;">
          ${data.name}
        </p>

        <p style="font-size:13px;margin:0;">
          <a href="mailto:${data.email}" style="color:#9de8d1;text-decoration:none;">
            ${data.email}
          </a>
        </p>

        <div style="border-top:1px solid #303030;margin:22px 0;"></div>

        <p style="font-size:11px;letter-spacing:1px;color:#9de8d1;font-weight:bold;margin:0 0 12px;">
          SUBJECT
        </p>

        <p style="font-size:14px;color:#eeeeee;margin:0;">
          ${data.subject}
        </p>

        <div style="border-top:1px solid #303030;margin:22px 0;"></div>

        <p style="font-size:11px;letter-spacing:1px;color:#9de8d1;font-weight:bold;margin:0 0 12px;">
          MESSAGE
        </p>

        <p style="font-size:14px;line-height:1.8;color:#cccccc;margin:0;overflow-wrap:anywhere;">
          ${data.message.replace(/\n/g, "<br>")}
        </p>
      </div>

      <div style="padding:25px 0;text-align:center;">
        <a href="mailto:${data.email}" style="display:inline-block;background:#9de8d1;color:#101010;text-decoration:none;padding:13px 25px;border-radius:5px;font-size:13px;font-weight:bold;">
          Reply to ${data.name}
        </a>
      </div>

      <div style="border-top:1px solid #292929;padding:22px 0;text-align:center;">
        <p style="font-size:13px;color:#cccccc;margin:0 0 7px;font-weight:bold;">
          Bulus Hamnu Madu
        </p>
        <p style="font-size:11px;color:#777777;margin:0;">
          Software Engineer · bulushamnu.com
        </p>
      </div>

    </div>
  </div>
  `;
};

/* Contact Form Reply */
export const contactFormReplyTemplate = (data: ContactForm) => {
  return `
  <div style="margin:0;padding:35px 15px;background:#0b0b0b;font-family:Arial,Helvetica,sans-serif;color:#f5f5f5;">
    <div style="max-width:580px;margin:0 auto;">

      <div style="padding:20px 0;border-bottom:1px solid #292929;">
        <span style="font-size:25px;font-weight:bold;color:#ffffff;">
          Bulus<span style="color:#9de8d1;">.</span>
        </span>
      </div>

      <div style="padding:40px 0 25px;">
        <p style="font-size:15px;color:#cccccc;margin:0 0 15px;">
          Hi ${data.name},
          </p>
  
          <h1 style="font-size:29px;line-height:1.3;color:#9de8d1;margin:0 0 20px;">
            Thanks for reaching out!
          </h1>
  
          <p style="font-size:14px;line-height:1.9;color:#bbbbbb;margin:0 0 25px;">
          I've received your message and appreciate you taking the time to get in touch.
        </p>

        <div style="background:#151515;border:1px solid #292929;border-radius:8px;padding:22px;margin-bottom:25px;">
          <p style="font-size:11px;letter-spacing:1px;color:#9de8d1;font-weight:bold;margin:0 0 12px;">
            WHAT HAPPENS NEXT?
          </p>
          <p style="font-size:14px;line-height:1.8;color:#cccccc;margin:0;">
            I'll review your message and get back to you as soon as I can.
          </p>
        </div>

        <p style="font-size:14px;line-height:1.8;color:#bbbbbb;margin:0 0 25px;">
          In the meantime, feel free to explore my portfolio and projects.
        </p>

        <a href="https://bulushamnu.com" style="display:inline-block;background:#9de8d1;color:#101010;text-decoration:none;padding:13px 25px;border-radius:5px;font-size:13px;font-weight:bold;">
          Visit My Portfolio
        </a>
      </div>

      <div style="border-top:1px solid #292929;padding:25px 0;">
        <p style="font-size:13px;color:#cccccc;margin:0 0 7px;">
          Best regards,
        </p>
        <p style="font-size:15px;color:#ffffff;font-weight:bold;margin:0 0 5px;">
          Bulus Hamnu Madu
        </p>
        <p style="font-size:12px;color:#9de8d1;margin:0;">
          Software Engineer
        </p>
      </div>

      <div style="border-top:1px solid #292929;padding:20px 0;text-align:center;">
        <p style="font-size:11px;color:#777777;margin:0;">
        &copy; ${new Date().getFullYear()} Bulus Hamnu Madu. All rights reserved.
        </p>
        <p style="font-size:11px;margin:8px 0 0;">
          <a href="https://bulushamnu.com" style="color:#9de8d1;text-decoration:none;">
            bulushamnu.com
          </a>
        </p>
      </div>

    </div>
  </div>
  `;
};
