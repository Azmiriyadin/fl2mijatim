"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  Eye,
  Users,
  User,
  Award,
  MapPin,
  Calendar,
  BookOpen,
  Shield,
  Heart,
  Lightbulb,
} from "lucide-react";

const teamCategories = [
  {
    title: "PENGURUS INTI",
    members: [
      {
        name: "Achmad Arfan Hanafi",
        role: "Koordinator Wilayah",
        university: "Universitas Muhammadiyah Sidoarjo",
        image: "https://images.unsplash.com/photo-1507003211169-7a517175f739?w=400&h=400&fit=crop",
      },
      {
        name: "Sirojul Hikam",
        role: "Sekretaris Jenderal",
        university: "Universitas Nahdlatul Ulama Pasuruan",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      },
      {
        name: "M Azmi Zamzami Riyadin",
        role: "Sekretaris Umum",
        university: "Unwaha Jombang",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      },
      {
        name: "Nofita Tamher",
        role: "Bendahara Umum",
        university: "Universitas Merdeka Malang",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      },
    ],
  },
  {
    title: "KOMISI I (Hukum dan Legislasi)",
    members: [
      {
        name: "Nicolas Kusuma Ananda",
        role: "Ketua Komisi",
        university: "Universitas Trunojoyo Madura",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      },
      {
        name: "Dyah Ayu Razeka Asmarasanti",
        role: "Sekretaris Komisi",
        university: "Politeknik Negeri Jember",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      },
      {
        name: "M. Choirul Anwar",
        role: "Anggota",
        university: "IAI Syarifuddin Lumajang",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      },
      {
        name: "M Fajrul Falah",
        role: "Anggota",
        university: "Universitas Hasyim Asy'ari Tebuireng Jombang",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
      },
    ],
  },
  {
    title: "KOMISI II (Kelembagaan)",
    members: [
      {
        name: "A. Zaid Tsabit A.B",
        role: "Ketua Komisi",
        university: "Unwaha Jombang",
        image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&h=400&fit=crop",
      },
      {
        name: "Mirza Aditama Firmansyah",
        role: "Sekretaris Komisi",
        university: "Politeknik Negeri Jember",
        image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop",
      },
      {
        name: "Sekar Putri Hapsari",
        role: "Anggota",
        university: "Universitas 17 Agustus 1945 Banyuwangi",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      },
      {
        name: "Muhammad Arif",
        role: "Anggota",
        university: "Universitas Muhammadiyah Malang",
        image: "https://images.unsplash.com/photo-1504257466795-3e28468b6985?w=400&h=400&fit=crop",
      },
      {
        name: "Monica Rahayu",
        role: "Anggota",
        university: "Universitas Islam Malang",
        image: "https://images.unsplash.com/photo-1567532939604-b6c5b0ad2e01?w=400&h=400&fit=crop",
      },
      {
        name: "Muhammad Adam",
        role: "Anggota",
        university: "Universitas Trunojoyo Madura",
        image: "https://images.unsplash.com/photo-1492562080023-ab3dbdf5bbd0?w=400&h=400&fit=crop",
      },
    ],
  },
  {
    title: "KOMISI III (Hubungan Parlemen dan Pembinaan)",
    members: [
      {
        name: "Arif Rahman",
        role: "Ketua Komisi",
        university: "Universitas Trunojoyo Madura",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
      },
      {
        name: "Revalino Ardyansyah",
        role: "Sekretaris Komisi",
        university: "Universitas 17 Agustus 1945 Surabaya",
        image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
      },
      {
        name: "Wildan Pradana",
        role: "Anggota",
        university: "Universitas Islam Jember",
        image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop",
      },
      {
        name: "Zayyinul Mukminin",
        role: "Anggota",
        university: "Universitas Annuqayah Sumenep",
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop",
      },
      {
        name: "Fillah Inzuly Vilthon",
        role: "Anggota",
        university: "UM Lamongan",
        image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400&h=400&fit=crop",
      },
      {
        name: "Muhammad Syarif Hidayatullah",
        role: "Anggota",
        university: "Universitas Zainul Hasan Genggong Probolinggo",
        image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop",
      },
    ],
  },
  {
    title: "KOMISI IV (Advokasi dan Kebijakan Publik)",
    members: [
      {
        name: "Yahya Sakdullah",
        role: "Ketua Komisi",
        university: "Universitas Nahdlatul Ulama Pasuruan",
        image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=400&fit=crop",
      },
      {
        name: "Roni Andi Pramono",
        role: "Sekretaris Komisi",
        university: "STKIP PGRI Pacitan",
        image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&h=400&fit=crop",
      },
      {
        name: "Adriano Galih",
        role: "Anggota",
        university: "Stikes Bhakti Husada Mulia Madiun",
        image: "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?w=400&h=400&fit=crop",
      },
      {
        name: "Devin Andrean",
        role: "Anggota",
        university: "Politeknik Negeri Banyuwangi",
        image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=400&fit=crop",
      },
      {
        name: "Mohammad Fathan Farihi",
        role: "Anggota",
        university: "Universitas Islam Zainul Hasan Genggong Probolinggo",
        image: "https://images.unsplash.com/photo-1507003211169-7a517175f739?w=400&h=400&fit=crop",
      },
    ],
  },
  {
    title: "KOMISI V (Media dan Jaringan)",
    members: [
      {
        name: "Dimas Firdausil Qirom",
        role: "Ketua Komisi",
        university: "Universitas Islam Lamongan",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      },
      {
        name: "Maulidya Caesya",
        role: "Sekretaris Komisi",
        university: "Poltekkes Kemenkes Malang",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      },
      {
        name: "Siti Cholifatul Mutiah",
        role: "Anggota",
        university: "Sekolah Tinggi Ilmu Ekonomi Bakti Pertiwi",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      },
      {
        name: "Bagus Ramadhan",
        role: "Anggota",
        university: "Politeknik Negeri Banyuwangi",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      },
    ],
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

          <div className="space-y-20">
            {teamCategories.map((category, catIndex) => (
              <div key={category.title}>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold mb-8 text-primary border-l-4 border-primary pl-4"
                >
                  {category.title}
                </motion.h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {category.members.map((member, index) => (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                        <div className="aspect-square overflow-hidden bg-muted relative">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                        </div>
                        <CardContent className="p-6 text-center">
                          <h3 className="text-lg font-semibold mb-1 line-clamp-1">{member.name}</h3>
                          <p className="text-primary font-medium text-sm mb-1">{member.role}</p>
                          <p className="text-muted-foreground text-xs line-clamp-2">{member.university}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
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
