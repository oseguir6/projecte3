import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-white font-bold text-xl"
        >
          Portfolio
        </motion.div>
        
        <ul className="flex gap-8">
          {links.map((link) => (
            <motion.li
              key={link.href}
              whileHover={{ y: -2 }}
              className="relative"
            >
              <Link href={link.href}>
                <a className={cn(
                  "text-white/70 hover:text-white transition-colors",
                  location === link.href && "text-[#E94560]"
                )}>
                  {link.label}
                </a>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
