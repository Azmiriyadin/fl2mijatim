"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  Eye,
  Users,
  Award,
  MapPin,
  Calendar,
  BookOpen,
  Shield,
  Heart,
  Lightbulb,
} from "lucide-react";

const teamMembers = [
  {
    name: "Ahmad Fauzi",
    role: "Koordinator Wilayah",
    university: "Universitas Airlangga",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  },
  {
    name: "Siti Rahmawati",
    role: "Wakil Koordinator",
    university: "Institut Teknologi Sepuluh Nopember",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
  },
  {
    name: "Muhammad Rizky",
    role: "Sekretaris",
    university: "Universitas Brawijaya",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
  },
  {
    name: "Dewi Puspita",
    role: "Bendahara",
    university: "Universitas Negeri Surabaya",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
  },
];

const values = [
  {
    icon: Shield,
    title: "Integritas",
    description: "Menjunjung tinggi kejujuran dan transparansi dalam setiap aktivitas organisasi.",
  },
  {
    icon: Heart,
    title: "Solidaritas",
    description: "Membangun persaudaraan dan kerjasama antar lembaga legislatif mahasiswa.",
  },
  {
    icon: Lightbulb,
    title: "Inovasi",
    description: "Terus berinovasi dalam mengembangkan sistem demokrasi kampus yang lebih baik.",
  },
  {
    icon: Users,
    title: "Kolaborasi",
    description: "Bekerja sama dengan berbagai pihak untuk kepentingan mahasiswa.",
  },
];

const milestones = [
  { year: "2018", event: "Pendirian FL2MI Korwil Jawa Timur" },
  { year: "2019", event: "Muswil Pertama di Surabaya" },
  { year: "2020", event: "Launching Platform Digital" },
  { year: "2021", event: "50+ Universitas Bergabung" },
  { year: "2022", event: "Database Hukum Go Live" },
  { year: "2023", event: "Rakorwil Nasional di Malang" },
  { year: "2024", event: "Integrasi Sistem Event Management" },
];

export default function ProfilPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Tentang Kami
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Profil <span className="text-primary">FL2MI</span> Korwil Jatim
            </h1>
            <p className="text-lg text-muted-foreground">
              Forum Lembaga Legislatif Mahasiswa Indonesia Koordinator Wilayah Jawa Timur adalah organisasi yang menghimpun dan mengkoordinasikan seluruh lembaga legislatif mahasiswa di provinsi Jawa Timur.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                    <Eye className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Visi</h2>
                  <p className="text-primary-foreground/90 leading-relaxed text-lg">
                    Menjadi forum koordinasi lembaga legislatif mahasiswa yang unggul, berintegritas, dan berperan aktif dalam memperkuat demokrasi kampus di seluruh Jawa Timur.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-xl bg-gradient-to-br from-accent to-accent/80 text-accent-foreground">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                    <Target className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Misi</h2>
                  <ul className="space-y-3 text-accent-foreground/90">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-foreground mt-2.5 flex-shrink-0" />
                      Memfasilitasi koordinasi dan komunikasi antar lembaga legislatif mahasiswa
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-foreground mt-2.5 flex-shrink-0" />
                      Menyediakan database hukum kemahasiswaan yang komprehensif
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-foreground mt-2.5 flex-shrink-0" />
                      Menyelenggarakan pelatihan dan pengembangan kapasitas anggota
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-foreground mt-2.5 flex-shrink-0" />
                      Menjadi wadah aspirasi dan advokasi mahasiswa Jawa Timur
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Nilai-Nilai Kami
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Nilai Dasar Organisasi
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Pengurus Korwil
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Tim Kepengurusan
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium text-sm mb-1">{member.role}</p>
                    <p className="text-muted-foreground text-xs">{member.university}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Perjalanan Kami
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Sejarah & Milestone
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <Card className="inline-block border-none shadow-lg">
                      <CardContent className="p-6">
                        <span className="text-2xl font-bold text-primary">{milestone.year}</span>
                        <p className="text-foreground mt-2">{milestone.event}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="hidden md:flex w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg flex-shrink-0" />
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
