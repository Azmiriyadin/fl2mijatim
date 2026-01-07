import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Instagram, Twitter, Youtube } from "lucide-react";

const footerLinks = {
  navigasi: [
    { label: "Beranda", href: "/" },
    { label: "Profil Korwil", href: "/profil" },
    { label: "Database Hukum", href: "/database-hukum" },
    { label: "Berita", href: "/berita" },
  ],
  layanan: [
    { label: "Aspirasi Mahasiswa", href: "/kontak" },
    { label: "Member Directory", href: "/database-hukum" },
    { label: "Event Registration", href: "/berita" },
    { label: "Unduh Dokumen", href: "/database-hukum" },
  ],
  kontak: [
    { icon: Mail, label: "fl2mi.jatim@gmail.com" },
    { icon: Phone, label: "+62 812 3456 7890" },
    { icon: MapPin, label: "Surabaya, Jawa Timur" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-12 h-12 overflow-hidden">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b8599709-4ea0-4a5f-b30b-d57061bedd8b/2-1767764401652.png?width=8000&height=8000&resize=contain"
                    alt="FL2MI Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="font-bold text-xl tracking-tight block">FL2MI</span>
                  <span className="text-background/60 text-sm">Korwil Jawa Timur</span>
                </div>
              </div>

            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Forum Lembaga Legislatif Mahasiswa Indonesia - Koordinator Wilayah Jawa Timur.
              Memperkuat demokrasi kampus di seluruh Jawa Timur.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-background/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Navigasi</h4>
            <ul className="space-y-3">
              {footerLinks.navigasi.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Layanan</h4>
            <ul className="space-y-3">
              {footerLinks.layanan.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Hubungi Kami</h4>
            <ul className="space-y-4">
              {footerLinks.kontak.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-background/70 text-sm">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-sm">
              &copy; {new Date().getFullYear()} FL2MI Korwil Jawa Timur. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-background/50 hover:text-primary text-sm transition-colors">
                Kebijakan Privasi
              </Link>
              <Link href="#" className="text-background/50 hover:text-primary text-sm transition-colors">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
