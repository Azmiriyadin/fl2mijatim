"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Users,
  QrCode,
  Newspaper,
  Loader2,
} from "lucide-react";

const categories = [
  { id: "all", label: "Semua" },
  { id: "Event", label: "Event" },
  { id: "Berita", label: "Berita" },
  { id: "Pengumuman", label: "Pengumuman" },
  { id: "Press release", label: "Press Release" },
];

export default function BeritaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || item.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const upcomingEvents = items.filter((item) => 
    item.type === "Event" && item.status === "Pendaftaran Dibuka"
  );

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
                          {event.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {event.quota || 0}
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        {event.time_range && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {event.time_range}
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </div>
                        )}
                      </div>
                      <Button className="w-full gap-2" asChild>
                        <a href={event.registration_link || "#"} target="_blank" rel="noopener noreferrer">
                          <QrCode className="w-4 h-4" />
                          Daftar Sekarang
                        </a>
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

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Memuat data...</p>
            </div>
          ) : (
            <>
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
                      <div className="aspect-[16/10] overflow-hidden relative bg-muted">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <Newspaper className="w-10 h-10 opacity-20" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <Badge
                            className={
                              item.type === "Event"
                                ? "bg-primary/90 hover:bg-primary"
                                : item.type === "Berita"
                                ? "bg-blue-500/90 hover:bg-blue-500"
                                : item.type === "Pengumuman"
                                ? "bg-amber-500/90 hover:bg-amber-500"
                                : "bg-violet-500/90 hover:bg-violet-500"
                            }
                          >
                            {item.type === "Event" && <Calendar className="w-3 h-3 mr-1" />}
                            {item.type === "Berita" && <Newspaper className="w-3 h-3 mr-1" />}
                            {item.type}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Calendar className="w-4 h-4" />
                          {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                          {item.excerpt || item.description || "Tidak ada deskripsi."}
                        </p>
                        {item.type === "Event" && item.location && (
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
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
