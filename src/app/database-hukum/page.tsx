"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  FileText,
  Download,
  Filter,
  Building2,
  Calendar,
  Eye,
  ExternalLink,
  Scale,
  Users,
} from "lucide-react";

const documentTypes = [
  { value: "all", label: "Semua Jenis" },
  { value: "uu-km", label: "UU KM" },
  { value: "gbhk", label: "GBHK" },
  { value: "tatib", label: "Tata Tertib" },
  { value: "sk", label: "Surat Keputusan" },
  { value: "peraturan", label: "Peraturan Internal" },
];

const universities = [
  { value: "all", label: "Semua Kampus" },
  { value: "unair", label: "Universitas Airlangga" },
  { value: "its", label: "Institut Teknologi Sepuluh Nopember" },
  { value: "ub", label: "Universitas Brawijaya" },
  { value: "unesa", label: "Universitas Negeri Surabaya" },
  { value: "uinsa", label: "UIN Sunan Ampel" },
  { value: "ubaya", label: "Universitas Surabaya" },
  { value: "petra", label: "Universitas Kristen Petra" },
  { value: "um", label: "Universitas Negeri Malang" },
];

const years = [
  { value: "all", label: "Semua Tahun" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
];

const documents = [
  {
    id: 1,
    title: "Undang-Undang Keluarga Mahasiswa UNAIR 2024",
    type: "UU KM",
    university: "Universitas Airlangga",
    year: "2024",
    downloads: 234,
    views: 1205,
    fileSize: "2.4 MB",
  },
  {
    id: 2,
    title: "Garis-Garis Besar Haluan Kerja BEM ITS 2024",
    type: "GBHK",
    university: "Institut Teknologi Sepuluh Nopember",
    year: "2024",
    downloads: 189,
    views: 892,
    fileSize: "1.8 MB",
  },
  {
    id: 3,
    title: "Tata Tertib DPM Universitas Brawijaya",
    type: "Tata Tertib",
    university: "Universitas Brawijaya",
    year: "2023",
    downloads: 156,
    views: 743,
    fileSize: "1.2 MB",
  },
  {
    id: 4,
    title: "SK Pengangkatan Pengurus BEM UNESA 2024",
    type: "Surat Keputusan",
    university: "Universitas Negeri Surabaya",
    year: "2024",
    downloads: 98,
    views: 456,
    fileSize: "890 KB",
  },
  {
    id: 5,
    title: "Peraturan Internal DPM UIN Sunan Ampel",
    type: "Peraturan Internal",
    university: "UIN Sunan Ampel",
    year: "2023",
    downloads: 134,
    views: 621,
    fileSize: "1.5 MB",
  },
  {
    id: 6,
    title: "UU Keluarga Mahasiswa Universitas Surabaya 2023",
    type: "UU KM",
    university: "Universitas Surabaya",
    year: "2023",
    downloads: 112,
    views: 534,
    fileSize: "2.1 MB",
  },
  {
    id: 7,
    title: "GBHK BEM Universitas Kristen Petra",
    type: "GBHK",
    university: "Universitas Kristen Petra",
    year: "2024",
    downloads: 87,
    views: 398,
    fileSize: "1.6 MB",
  },
  {
    id: 8,
    title: "Tata Tertib Sidang Umum DPM UM",
    type: "Tata Tertib",
    university: "Universitas Negeri Malang",
    year: "2024",
    downloads: 145,
    views: 678,
    fileSize: "980 KB",
  },
];

const memberDirectory = [
  {
    university: "Universitas Airlangga",
    type: "DPM",
    members: 45,
    location: "Surabaya",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop",
  },
  {
    university: "Institut Teknologi Sepuluh Nopember",
    type: "BPM",
    members: 38,
    location: "Surabaya",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop",
  },
  {
    university: "Universitas Brawijaya",
    type: "DPM",
    members: 52,
    location: "Malang",
    logo: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=100&h=100&fit=crop",
  },
  {
    university: "Universitas Negeri Surabaya",
    type: "DPM",
    members: 40,
    location: "Surabaya",
    logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop",
  },
  {
    university: "UIN Sunan Ampel",
    type: "SEMA",
    members: 35,
    location: "Surabaya",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=100&h=100&fit=crop",
  },
  {
    university: "Universitas Negeri Malang",
    type: "DPM",
    members: 42,
    location: "Malang",
    logo: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=100&h=100&fit=crop",
  },
];

export default function DatabaseHukumPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedUniversity, setSelectedUniversity] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [activeTab, setActiveTab] = useState<"documents" | "members">("documents");

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || doc.type.toLowerCase().includes(selectedType.replace("-", " "));
    const matchesUniversity = selectedUniversity === "all" || doc.university.toLowerCase().includes(selectedUniversity);
    const matchesYear = selectedYear === "all" || doc.year === selectedYear;
    return matchesSearch && matchesType && matchesUniversity && matchesYear;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Database Digital
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Database <span className="text-primary">Hukum</span> & Member
            </h1>
            <p className="text-lg text-muted-foreground">
              Repositori digital dokumen legislasi kemahasiswaan dan direktori lembaga legislatif mahasiswa se-Jawa Timur.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={activeTab === "documents" ? "default" : "outline"}
              onClick={() => setActiveTab("documents")}
              className="gap-2"
            >
              <Scale className="w-4 h-4" />
              Dokumen Hukum
            </Button>
            <Button
              variant={activeTab === "members" ? "default" : "outline"}
              onClick={() => setActiveTab("members")}
              className="gap-2"
            >
              <Users className="w-4 h-4" />
              Member Directory
            </Button>
          </div>

          {activeTab === "documents" && (
            <>
              <Card className="border-none shadow-lg mb-8">
                <CardContent className="p-6">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-2 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        placeholder="Cari dokumen..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Jenis Dokumen" />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Kampus" />
                      </SelectTrigger>
                      <SelectContent>
                        {universities.map((uni) => (
                          <SelectItem key={uni.value} value={uni.value}>
                            {uni.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tahun" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year.value} value={year.value}>
                            {year.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <div className="mb-6 flex items-center justify-between">
                <p className="text-muted-foreground">
                  Menampilkan <span className="font-medium text-foreground">{filteredDocuments.length}</span> dokumen
                </p>
              </div>

              <div className="grid gap-4">
                {filteredDocuments.map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <FileText className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors cursor-pointer">
                                {doc.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                <span className="inline-flex items-center gap-1">
                                  <Building2 className="w-4 h-4" />
                                  {doc.university}
                                </span>
                                <span className="inline-flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {doc.year}
                                </span>
                                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                  {doc.type}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {doc.views}
                              </span>
                              <span className="flex items-center gap-1">
                                <Download className="w-4 h-4" />
                                {doc.downloads}
                              </span>
                              <span>{doc.fileSize}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="gap-1">
                                <Eye className="w-4 h-4" />
                                Lihat
                              </Button>
                              <Button size="sm" className="gap-1">
                                <Download className="w-4 h-4" />
                                Unduh
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {activeTab === "members" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {memberDirectory.map((member, index) => (
                <motion.div
                  key={member.university}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <img
                          src={member.logo}
                          alt={member.university}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-lg leading-tight mb-1">
                            {member.university}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">
                            {member.type}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center justify-between">
                          <span>Jumlah Anggota</span>
                          <span className="font-medium text-foreground">{member.members} orang</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Lokasi</span>
                          <span className="font-medium text-foreground">{member.location}</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-4 gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Lihat Profil
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16" />

      <Footer />
    </div>
  );
}
