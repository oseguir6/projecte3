import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Terminal, Menu } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Navigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: terminalText = "dev@portfolio:~$" } = useQuery({
    queryKey: ["/api/site-content/hero.terminal.text"],
    select: (data: any) => data.value,
  });

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-sm border-b border-[#16213E]">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Terminal className="h-6 w-6 text-[#E94560]" />
            <span className="text-white font-mono text-lg">{terminalText}</span>
          </motion.div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop menu */}
          <ul className="hidden md:flex gap-8">
            {links.map((link) => (
              <motion.li
                key={link.href}
                whileHover={{ y: -2 }}
                className="relative"
              >
                <Link href={link.href}>
                  <div
                    className={cn(
                      "text-white/70 hover:text-white cursor-pointer transition-colors",
                      location === link.href && "text-[#E94560]"
                    )}
                  >
                    {link.label}
                    {location === link.href && (
                      <motion.div
                        layoutId="underline"
                        className="absolute left-0 top-full h-px w-full bg-[#E94560]"
                      />
                    )}
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? "auto" : 0 }}
          className="md:hidden overflow-hidden"
        >
          <ul className="py-4 space-y-4">
            {links.map((link) => (
              <motion.li
                key={link.href}
                whileHover={{ x: 4 }}
                className="relative"
              >
                <Link href={link.href}>
                  <div
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "text-white/70 hover:text-white cursor-pointer transition-colors",
                      location === link.href && "text-[#E94560]"
                    )}
                  >
                    {link.label}
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </nav>
    <div className="fixed bottom-0 w-full text-center py-2 text-white/50 text-sm border-t border-[#16213E] bg-[#0A0A0A]/80 backdrop-blur-sm">
      By Oriol Seguí
    </div>
  );
}