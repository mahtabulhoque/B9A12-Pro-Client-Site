import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <nav className="grid grid-flow-col gap-4 text-xl">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4 text-3xl">
          <a>
           <FaFacebook></FaFacebook>
          </a>
          <a>
            <FaTwitter></FaTwitter>
          </a>
          <a>
            <FaInstagram></FaInstagram>
          </a>
        </div>
      </nav>
      <aside className="text-lg">
        <p>Copyright © 2024 - All right reserved by Pro-Survey</p>
      </aside>
    </footer>
  );
};

export default Footer;
