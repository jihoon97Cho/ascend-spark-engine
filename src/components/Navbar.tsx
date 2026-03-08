import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <span className="text-xl font-bold tracking-tight font-['Plus_Jakarta_Sans']">
          <span className="gold-text">Ascend</span> Solutions
        </span>

        <div className="hidden md:flex items-center gap-8">
          {["qualify", "why-us", "testimonials", "faq"].map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors capitalize"
            >
              {id === "why-us" ? "Why Us" : id === "faq" ? "FAQ" : id === "qualify" ? "Qualify" : "Testimonials"}
            </button>
          ))}
          <Button onClick={() => scrollTo("qualify")} size="sm" className="gold-gradient text-primary-foreground font-semibold hover:opacity-90">
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
                  onClick={() => scrollTo(id)}
                  className="text-left text-sm text-muted-foreground hover:text-foreground transition-colors capitalize py-2"
                >
                  {id === "why-us" ? "Why Us" : id === "faq" ? "FAQ" : id === "qualify" ? "Qualify" : "Testimonials"}
                </button>
              ))}
              <Button onClick={() => scrollTo("qualify")} className="gold-gradient text-primary-foreground font-semibold w-full">
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
