"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Shield, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Profil Korwil", href: "/profil" },
  { label: "Database Hukum", href: "/database-hukum" },
  { label: "Berita", href: "/berita" },
  { label: "Kontak", href: "/kontak" },
];

import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, role, loading } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-4 mx-auto max-w-6xl">
          <nav className="flex items-center justify-between h-16 px-6 bg-white/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg shadow-primary/5">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative w-10 h-10 overflow-hidden">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b8599709-4ea0-4a5f-b30b-d57061bedd8b/2-1767764401652.png?width=8000&height=8000&resize=contain"
                    alt="FL2MI Logo"
                    fill
                    className="object-contain"
                  />
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
              {!loading && (
                <>
                    {user ? (
                      <div className="flex items-center gap-3">
                        {role === 'ADMIN' ? (
                          <Button variant="ghost" size="sm" asChild>
                            <Link href="/admin/dashboard" className="gap-2">
                              <Shield className="w-4 h-4" />
                              Dashboard Admin
                            </Link>
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" asChild>
                            <Link href="/member/home" className="gap-2">
                              <User className="w-4 h-4" />
                              Member Area
                            </Link>
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10">
                          <LogOut className="w-4 h-4" />
                          Keluar
                        </Button>
                      </div>
                    ) : (
                    <>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/login">Masuk</Link>
                      </Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                        <Link href="/register">Daftar</Link>
                      </Button>
                    </>
                  )}
                </>
              )}
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
                {!loading && (
                  <>
                    {user ? (
                      <>
                        {role === 'superadmin' && (
                          <Button className="w-full" asChild>
                            <Link href="/admin">Dashboard Admin</Link>
                          </Button>
                        )}
                        <Button variant="outline" className="w-full text-destructive" onClick={handleLogout}>
                          Keluar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/login">Masuk</Link>
                        </Button>
                        <Button className="w-full" asChild>
                          <Link href="/register">Daftar</Link>
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
