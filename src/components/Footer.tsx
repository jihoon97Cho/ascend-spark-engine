import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border py-10 px-4">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="text-sm font-bold">
        <span className="gold-text">Ascend</span> Solutions LLC
      </span>
      <div className="flex items-center gap-5 text-xs text-muted-foreground">
        <Link to="/terms" className="hover:text-foreground transition-colors">
          Terms & Conditions
        </Link>
        <Link to="/privacy" className="hover:text-foreground transition-colors">
          Privacy Policy
        </Link>
      </div>
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} Ascend Solutions LLC. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
