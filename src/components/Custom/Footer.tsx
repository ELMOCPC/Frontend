import { Mail, Instagram, Send } from "lucide-react";
import cesa from "@/assets/CESA.svg";
import uni from "@/assets/UNi.png";
import elmocpc from "@/assets/ELMOCPC.svg";
import extraLogo from "@/assets/yektanet.svg";

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-inner">
        <div className="footer-contact">
          <h2 className="footer-heading">تماس با ما</h2>
          <p className="footer-text">
            برای اطللاعات بيشتر با ما در ارتباط باشید
          </p>
          <ul className="contact-links">
            <li>
              <a className="contact-link" href="mailto:Elmocpc@outlook.com">
                <span className="contact-label">
                  <Mail className="icon icon-sm" aria-hidden="true" />
                  ایمیل
                </span>
                <span className="contact-value">Elmocpc@outlook.com</span>
              </a>
            </li>
            <li>
              <a
                className="contact-link"
                href="https://t.me/iustacm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-label">
                  <Send className="icon icon-sm" aria-hidden="true" />
                  تلگرام
                </span>
                <span className="contact-value">t.me/iustacm</span>
              </a>
            </li>
            <li>
              <a
                className="contact-link"
                href="https://instagram.com/cesa_iust"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-label">
                  <Instagram className="icon icon-sm" aria-hidden="true" />
                  اینستاگرام
                </span>
                <span className="contact-value">instagram.com/cesa_iust</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-logos">
          <img className="footer-logo" src={cesa} alt="CESA" />
          <img className="footer-logo" src={uni} alt="UNI" />
          <img className="footer-logo" src={extraLogo} alt="Extra Logo" />
          <img className="footer-logo" src={elmocpc} alt="ELMOCPC" />
        </div>

        <div className="footer-copy">
          <p>ELMOCPC 2025 © - تمامی حقوق محفوظ است</p>
          <p>ELMOCPC - Computer Engineering Scientific Associate</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
