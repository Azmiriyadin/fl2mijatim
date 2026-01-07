"use client";

import { useState, useEffect } from "react";
import { 
  BookOpen, 
  User, 
  Calendar, 
  LogOut, 
  ChevronRight, 
  Download, 
  CheckCircle2, 
  Clock,
  Settings,
  Bell
} from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";

export default function MemberHome() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/login");
      return;
    }

    setUser(session.user);

    const { data: userData } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.user.id)
      .single();

    setProfile(userData);
    setLoading(false);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const updates = {
      name: formData.get("name"),
      campus_origin: formData.get("campus"),
    };

    const { error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", user.id);

    if (error) {
      toast.error("Gagal memperbarui profil");
    } else {
      toast.success("Profil berhasil diperbarui");
      fetchUserData();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar / Profile Summary */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-none shadow-xl shadow-primary/5">
              <CardContent className="pt-8 pb-6 text-center">
                <Avatar className="w-24 h-24 mx-auto border-4 border-primary/10 mb-4">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl bg-primary/5 text-primary">
                    {profile?.name?.substring(0, 2).toUpperCase() || "ME"}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{profile?.name || "Member FL2MI"}</h2>
                <p className="text-sm text-muted-foreground">{profile?.email}</p>
                <div className="flex justify-center gap-2 mt-4">
                  {profile?.is_verified ? (
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Terverifikasi</Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-amber-500/20">Menunggu Verifikasi</Badge>
                  )}
                  <Badge variant="outline">{profile?.role}</Badge>
                </div>
              </CardContent>
              <div className="border-t p-4 flex flex-col gap-2">
                <Button variant="ghost" className="justify-start gap-3 h-11" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 text-destructive" />
                  <span className="text-destructive">Keluar Sesi</span>
                </Button>
              </div>
            </Card>

            <Card className="border-none shadow-xl shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Statistik Kontribusi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Event Diikuti</span>
                  <span className="font-bold">2</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Dokumen Diakses</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status Keanggotaan</span>
                  <span className="text-emerald-600 font-medium">Aktif</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            <Tabs defaultValue="exclusive" className="w-full">
              <TabsList className="bg-muted p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
                <TabsTrigger value="exclusive" className="rounded-lg px-6 flex gap-2">
                  <BookOpen className="w-4 h-4" />
                  Konten Eksklusif
                </TabsTrigger>
                <TabsTrigger value="events" className="rounded-lg px-6 flex gap-2">
                  <Calendar className="w-4 h-4" />
                  Event Korwil
                </TabsTrigger>
                <TabsTrigger value="profile" className="rounded-lg px-6 flex gap-2">
                  <Settings className="w-4 h-4" />
                  Update Profil
                </TabsTrigger>
              </TabsList>

              <TabsContent value="exclusive" className="mt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Database Legislasi Eksklusif</h3>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download Semua
                  </Button>
                </div>

                <div className="grid gap-4">
                  {[
                    { title: "Panduan Advokasi Kampus 2024", type: "PDF", size: "2.4 MB", date: "Jan 2024" },
                    { title: "Template UU KM/KBM Standar FL2MI", type: "DOCX", size: "1.1 MB", date: "Dec 2023" },
                    { title: "Kumpulan Aspirasi Wilayah Jatim 2023", type: "PDF", size: "4.8 MB", date: "Nov 2023" },
                  ].map((doc, i) => (
                    <Card key={i} className="group hover:border-primary/50 transition-colors">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                            <BookOpen className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-semibold group-hover:text-primary transition-colors">{doc.title}</h4>
                            <p className="text-xs text-muted-foreground">{doc.type} • {doc.size} • Diunggah {doc.date}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                          <Download className="w-5 h-5" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="events" className="mt-6 space-y-6">
                <h3 className="text-xl font-bold">Event & Rakorwil Mendatang</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { title: "Muswil FL2MI Jatim 2025", date: "15 Maret 2025", location: "Universitas Negeri Malang", status: "Open" },
                    { title: "Latihan Kepemimpinan Legislatif", date: "2-4 April 2025", location: "Universitas Airlangga", status: "Full" },
                  ].map((event, i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="h-32 bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-12 h-12 text-primary opacity-20" />
                      </div>
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold leading-tight">{event.title}</h4>
                          <Badge variant={event.status === "Open" ? "default" : "secondary"}>{event.status}</Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {event.location}
                          </div>
                        </div>
                        <Button className="w-full mt-4" disabled={event.status !== "Open"}>
                          {event.status === "Open" ? "Daftar Sekarang" : "Pendaftaran Ditutup"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pengaturan Profil</CardTitle>
                    <CardDescription>Perbarui informasi identitas dan asal kampus Anda.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nama Lengkap</Label>
                          <Input id="name" name="name" defaultValue={profile?.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" value={profile?.email} disabled className="bg-muted" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="campus">Asal Universitas</Label>
                          <Input id="campus" name="campus" defaultValue={profile?.campus_origin} placeholder="Contoh: Universitas Brawijaya" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Role Akun</Label>
                          <Input id="role" value={profile?.role} disabled className="bg-muted" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button type="button" variant="outline">Batalkan</Button>
                        <Button type="submit">Simpan Perubahan</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="border-none shadow-xl shadow-primary/5 bg-primary text-primary-foreground overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
               <CardContent className="p-8 relative z-10">
                 <div className="flex flex-col sm:flex-row items-center gap-6">
                   <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                     <Bell className="w-8 h-8" />
                   </div>
                   <div className="text-center sm:text-left">
                     <h3 className="text-xl font-bold mb-1">Butuh Bantuan Teknis?</h3>
                     <p className="text-primary-foreground/80 text-sm">Jika Anda mengalami kendala saat mengakses dokumen atau mendaftar event, hubungi tim IT Korwil Jatim.</p>
                   </div>
                   <Button variant="secondary" className="sm:ml-auto">Hubungi Admin</Button>
                 </div>
               </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
