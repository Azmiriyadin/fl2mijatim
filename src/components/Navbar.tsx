"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Profil Korwil", href: "/profil" },
  { label: "Database Hukum", href: "/database-hukum" },
  { label: "Berita", href: "/berita" },
  { label: "Kontak", href: "/kontak" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-4 mx-auto max-w-6xl">
          <nav className="flex items-center justify-between h-16 px-6 bg-white/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg shadow-primary/5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">F</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-lg tracking-tight">FL2MI</span>
                <span className="text-muted-foreground text-sm block -mt-1">Korwil Jatim</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Button variant="ghost" size="sm">
                Masuk
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Daftar
              </Button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-border/50 space-y-2">
                <Button variant="outline" className="w-full">
                  Masuk
                </Button>
                <Button className="w-full">Daftar</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
