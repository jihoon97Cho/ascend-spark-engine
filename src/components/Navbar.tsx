import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const handleNav = (id: string) => {
    if (id === "qualify") {
      navigate("/book");
      setOpen(false);
    } else {
      scrollTo(id);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Ascend Solutions" className="h-9 w-9" />
          <span className="text-2xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans']">
            <span className="gold-text">Ascend</span> Solutions
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["qualify", "why-us", "testimonials", "faq"].map((id) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors capitalize"
            >
              {id === "why-us" ? "Why Us" : id === "faq" ? "FAQ" : id === "qualify" ? "Qualify" : "Testimonials"}
            </button>
          ))}
          <Button onClick={() => navigate("/book")} size="sm" className="gold-gradient text-primary-foreground font-semibold hover:scale-105 transition-all duration-300 btn-shine">
            Book a Call
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {["qualify", "why-us", "testimonials", "faq"].map((id) => (
                <button
                  key={id}
                  onClick={() => handleNav(id)}
                  className="text-left text-sm text-muted-foreground hover:text-foreground transition-colors capitalize py-2"
                >
                  {id === "why-us" ? "Why Us" : id === "faq" ? "FAQ" : id === "qualify" ? "Qualify" : "Testimonials"}
                </button>
              ))}
              <Button onClick={() => { navigate("/book"); setOpen(false); }} className="gold-gradient text-primary-foreground font-semibold w-full">
                Book a Call
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
