"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  Users,
  Calendar,
  MessageSquare,
  ChevronRight,
  Building2,
  Scale,
  BookOpen,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
const BadgeComponent = Badge;
import { Footer } from "@/components/Footer";
import { supabase } from "@/lib/supabase";

const IconComponent = ({ name, className }: { name: string, className?: string }) => {
  const Icon = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
  return <Icon className={className} />;
};

export default function Home() {
  const [siteSettings, setSiteSettings] = useState<any>({});
  const [stats, setStats] = useState<any[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: settingsData } = await supabase.from('site_settings').select('*');
      const settings = (settingsData || []).reduce((acc: any, curr: any) => {
        acc[curr.key] = curr.value;
        return acc;
      }, {});
      setSiteSettings(settings);

      const { data: statsData } = await supabase.from('home_stats').select('*').order('display_order');
      if (statsData) setStats(statsData);

      const { data: featuresData } = await supabase.from('home_features').select('*').order('display_order');
      if (featuresData) setFeatures(featuresData);

      const { data: activitiesData } = await supabase.from('events').select('*').order('date', { ascending: false }).limit(8);
      if (activitiesData) setActivities(activitiesData);
      
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
        
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
              >
                <Sparkles className="w-4 h-4" />
                Forum Lembaga Legislatif Mahasiswa Indonesia
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                <span className="block text-foreground">{siteSettings.hero_title_1 || "Memperkuat"}</span>
                <span className="block bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                  {siteSettings.hero_title_2 || "Demokrasi Kampus"}
                </span>
                <span className="block text-foreground">{siteSettings.hero_title_3 || "Jawa Timur"}</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0">
                {siteSettings.hero_subtitle || "Koordinator Wilayah Jawa Timur yang menghimpun dan memperkuat lembaga legislatif mahasiswa di seluruh provinsi."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="h-14 px-8 text-base gap-2 bg-primary hover:bg-primary/90 rounded-xl" asChild>
                  <Link href="/database-hukum">
                    <BookOpen className="w-5 h-5" />
                    Jelajahi Database
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-base gap-2 rounded-xl" asChild>
                  <Link href="/profil">
                    Tentang Kami
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl rotate-6 animate-float" />
                <div className="absolute inset-0 bg-card rounded-3xl shadow-2xl shadow-primary/10 border border-border/50 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-12 bg-muted/50 flex items-center gap-2 px-4">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="pt-16 p-6 space-y-4">
                    {stats.slice(0, 3).map((stat, i) => (
                      <div key={stat.id} className={`flex items-center gap-4 p-4 ${i === 0 ? 'bg-primary/5' : i === 1 ? 'bg-accent/5' : 'bg-emerald-500/5'} rounded-xl`}>
                        <div className={`w-12 h-12 rounded-xl ${i === 0 ? 'bg-primary/10' : i === 1 ? 'bg-accent/10' : 'bg-emerald-500/10'} flex items-center justify-center`}>
                          <IconComponent name={stat.icon} className={`w-6 h-6 ${i === 0 ? 'text-primary' : i === 1 ? 'text-accent' : 'text-emerald-500'}`} />
                        </div>
                        <div>
                          <div className="font-semibold">{stat.label}</div>
                          <div className="text-sm text-muted-foreground">{stat.value}</div>
                        </div>
                      </div>
                    ))}
                    {stats.length === 0 && (
                      <>
                        <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Scale className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold">Database Legislasi</div>
                            <div className="text-sm text-muted-foreground">200+ Dokumen</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-accent/5 rounded-xl">
                          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                            <Users className="w-6 h-6 text-accent" />
                          </div>
                          <div>
                            <div className="font-semibold">Member Directory</div>
                            <div className="text-sm text-muted-foreground">50+ Universitas</div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {(stats.length > 0 ? stats : [
              { label: "Universitas", value: "50+", icon: "Building2" },
              { label: "Dokumen Hukum", value: "200+", icon: "FileText" },
              { label: "Anggota Aktif", value: "1000+", icon: "Users" },
              { label: "Event Tahunan", value: "30+", icon: "Calendar" },
            ]).map((stat, index) => (
              <motion.div
                key={stat.id || `stat-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-none shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <IconComponent name={stat.icon} className="w-7 h-7 text-primary" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Layanan Kami
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Fitur Unggulan Platform
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Berbagai layanan digital untuk mendukung aktivitas lembaga legislatif mahasiswa di Jawa Timur.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(features.length > 0 ? features : [
              { title: "Database Hukum", description: "Repositori digital UU KM/KBM se-Jawa Timur yang dapat difilter berdasarkan kampus.", href: "/database-hukum", color: "from-blue-500 to-indigo-600", icon: "Scale" },
              { title: "Event Management", description: "Sistem pendaftaran Muswil/Rakorwil terintegrasi dengan QR Code sertifikat.", href: "/berita", color: "from-emerald-500 to-teal-600", icon: "Calendar" },
              { title: "Aspirasi Mahasiswa", description: "Formulir aduan dan aspirasi publik yang masuk ke dashboard monitoring.", href: "/kontak", color: "from-orange-500 to-red-500", icon: "MessageSquare" },
              { title: "Member Directory", description: "Mapping persebaran DPM/BPM dari berbagai universitas di Jawa Timur.", href: "/database-hukum", color: "from-violet-500 to-purple-600", icon: "Users" },
            ]).map((feature, index) => (
              <motion.div
                key={feature.id || `feature-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={feature.href}>
                  <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden">
                    <CardContent className="p-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent name={feature.icon} className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Selengkapnya <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-muted/50 to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                Berita Terkini
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Informasi & Kegiatan
              </h2>
            </div>
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/berita">
                Lihat Semua
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(activities.length > 0 ? activities : [
                { title: "Rakorwil FL2MI Jatim 2025", excerpt: "Rapat koordinasi wilayah untuk memperkuat jaringan legislatif mahasiswa.", date: "2025-02-15", type: "Event", location: "Grand City Convention Surabaya", time_range: "08:00 - 17:00 WIB", quota: 250, status: "Pendaftaran Dibuka", image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop" },
                { title: "Workshop Penyusunan Legislasi", excerpt: "Pelatihan intensif untuk delegasi DPM/BPM dalam menyusun produk hukum.", date: "2025-02-22", type: "Event", location: "Universitas Airlangga", time_range: "09:00 - 16:00 WIB", quota: 100, status: "Pendaftaran Dibuka", image_url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop" },
                { title: "Deklarasi Kolaborasi Legislatif", excerpt: "Penandatanganan MoU kerjasama antar lembaga legislatif mahasiswa.", date: "2025-01-05", type: "Berita", image_url: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?w=400&h=300&fit=crop" },
              ]).map((activity, index) => (
                <motion.article
                  key={activity.id || `activity-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col">
                    <div className="aspect-[16/9] overflow-hidden relative">
                      <img
                        src={activity.image_url}
                        alt={activity.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={
                          activity.type === 'Event' ? 'bg-blue-500' : 
                          activity.type === 'Berita' ? 'bg-emerald-500' : 
                          activity.type === 'Pengumuman' ? 'bg-amber-500' : 'bg-purple-500'
                        }>
                          {activity.type}
                        </Badge>
                      </div>
                      {activity.quota && (
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                          {activity.quota} Peserta
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 font-medium">
                        <Calendar className="w-3 h-3" />
                        {new Date(activity.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        {activity.status && (
                          <>
                            <span className="mx-1">•</span>
                            <span className="text-primary font-bold">{activity.status}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {activity.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {activity.excerpt || activity.description}
                      </p>
                      
                      {activity.type === 'Event' && (
                        <div className="mt-auto space-y-2 pt-4 border-t border-border/50">
                          {activity.location && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <MapPin className="w-3 h-3 text-primary" />
                              <span className="truncate">{activity.location}</span>
                            </div>
                          )}
                          {activity.time_range && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3 text-primary" />
                              <span>{activity.time_range}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="mt-6">
                        <Button className="w-full group/btn" variant={activity.type === 'Event' ? 'default' : 'outline'} asChild>
                          <Link href={activity.registration_link || "/berita"}>
                            {activity.type === 'Event' ? 'Daftar Sekarang' : 'Selengkapnya'}
                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.article>
              ))}
            </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-12 lg:p-16"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                Bergabung Bersama Kami
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Daftarkan lembaga legislatif kampus Anda dan jadilah bagian dari gerakan demokrasi mahasiswa Jawa Timur yang lebih kuat dan terorganisir.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" className="h-14 px-8 text-base gap-2 rounded-xl" asChild>
                  <Link href="/register">
                    <Users className="w-5 h-5" />
                    Daftar Sekarang
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-base gap-2 rounded-xl bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                  <Link href="/kontak">
                    <MessageSquare className="w-5 h-5" />
                    Hubungi Kami
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
