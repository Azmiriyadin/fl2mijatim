"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Users,
  QrCode,
  Newspaper,
  Filter,
} from "lucide-react";

const categories = [
  { id: "all", label: "Semua" },
  { id: "event", label: "Event" },
  { id: "berita", label: "Berita" },
  { id: "pengumuman", label: "Pengumuman" },
  { id: "press-release", label: "Press Release" },
];

const newsAndEvents = [
  {
    id: 1,
    title: "Rakorwil FL2MI Jawa Timur 2025",
    excerpt: "Rapat koordinasi wilayah tahunan untuk memperkuat jaringan dan sinergi antar lembaga legislatif mahasiswa se-Jawa Timur.",
    category: "event",
    date: "15 Februari 2025",
    time: "08:00 - 17:00 WIB",
    location: "Grand City Convention Surabaya",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    registrationOpen: true,
    participants: 250,
  },
  {
    id: 2,
    title: "Workshop Penyusunan Legislasi Kampus",
    excerpt: "Pelatihan intensif untuk delegasi DPM/BPM dalam menyusun produk hukum kemahasiswaan yang berkualitas.",
    category: "event",
    date: "22 Februari 2025",
    time: "09:00 - 16:00 WIB",
    location: "Universitas Airlangga",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop",
    registrationOpen: true,
    participants: 100,
  },
  {
    id: 3,
    title: "Deklarasi Kolaborasi Legislatif Mahasiswa",
    excerpt: "Penandatanganan MoU kerjasama strategis antar lembaga legislatif mahasiswa untuk memperkuat demokrasi kampus.",
    category: "berita",
    date: "5 Januari 2025",
    image: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Press Release: Sikap FL2MI Terhadap UKT",
    excerpt: "Pernyataan sikap resmi FL2MI Korwil Jawa Timur terkait kebijakan Uang Kuliah Tunggal yang memberatkan mahasiswa.",
    category: "press-release",
    date: "28 Desember 2024",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Pengumuman: Pendaftaran Anggota Baru",
    excerpt: "Dibuka pendaftaran anggota baru FL2MI Korwil Jawa Timur untuk periode 2025. Segera daftarkan lembaga legislatif kampus Anda.",
    category: "pengumuman",
    date: "1 Januari 2025",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Seminar Nasional: Peran Legislatif Mahasiswa",
    excerpt: "Diskusi mendalam tentang peran strategis lembaga legislatif mahasiswa dalam mengawal kebijakan kampus.",
    category: "event",
    date: "10 Maret 2025",
    time: "13:00 - 17:00 WIB",
    location: "ITS Surabaya",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop",
    registrationOpen: true,
    participants: 500,
  },
  {
    id: 7,
    title: "Laporan Kinerja Triwulan FL2MI Jatim",
    excerpt: "Publikasi laporan kinerja dan capaian FL2MI Korwil Jawa Timur selama triwulan terakhir tahun 2024.",
    category: "berita",
    date: "20 Desember 2024",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    id: 8,
    title: "Training of Trainers (ToT) Advokasi",
    excerpt: "Program pelatihan bagi kader-kader legislatif untuk menjadi trainer advokasi di kampus masing-masing.",
    category: "event",
    date: "5 April 2025",
    time: "08:00 - 17:00 WIB",
    location: "Universitas Brawijaya Malang",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
    registrationOpen: false,
    participants: 50,
  },
];

export default function BeritaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredItems = newsAndEvents.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const upcomingEvents = newsAndEvents.filter((item) => item.category === "event" && item.registrationOpen);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              Informasi & Kegiatan
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Berita & <span className="text-primary">Event</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Ikuti perkembangan terbaru FL2MI Korwil Jawa Timur. Dari event, berita, hingga press release resmi.
            </p>
          </motion.div>
        </div>
      </section>

      {upcomingEvents.length > 0 && (
        <section className="py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Event Mendatang</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.slice(0, 3).map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group h-full bg-gradient-to-br from-primary/5 to-accent/5">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
                          Pendaftaran Dibuka
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {event.participants}
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                      </div>
                      <Button className="w-full gap-2">
                        <QrCode className="w-4 h-4" />
                        Daftar Sekarang
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-none shadow-lg mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Cari berita atau event..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mb-6">
            <p className="text-muted-foreground">
              Menampilkan <span className="font-medium text-foreground">{filteredItems.length}</span> hasil
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge
                        className={
                          item.category === "event"
                            ? "bg-primary/90 hover:bg-primary"
                            : item.category === "berita"
                            ? "bg-blue-500/90 hover:bg-blue-500"
                            : item.category === "pengumuman"
                            ? "bg-amber-500/90 hover:bg-amber-500"
                            : "bg-violet-500/90 hover:bg-violet-500"
                        }
                      >
                        {item.category === "event" && <Calendar className="w-3 h-3 mr-1" />}
                        {item.category === "berita" && <Newspaper className="w-3 h-3 mr-1" />}
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1).replace("-", " ")}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {item.excerpt}
                    </p>
                    {item.category === "event" && item.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <MapPin className="w-4 h-4" />
                        {item.location}
                      </div>
                    )}
                    <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 gap-1">
                      Selengkapnya
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tidak ada hasil</h3>
              <p className="text-muted-foreground">
                Coba ubah kata kunci pencarian atau filter kategori
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
