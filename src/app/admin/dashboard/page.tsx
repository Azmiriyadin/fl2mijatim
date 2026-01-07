"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  FileText, 
  History, 
  CheckCircle, 
  XCircle, 
  LayoutDashboard, 
  LogOut, 
  Bell,
  Search,
  MoreVertical,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      toast.error("Gagal mengambil data pengguna");
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  const handleApprove = async (userId: string) => {
    const { error } = await supabase
      .from("users")
      .update({ is_verified: true })
      .eq("id", userId);

    if (error) {
      toast.error("Gagal melakukan verifikasi");
    } else {
      toast.success("Pengguna berhasil diverifikasi");
      fetchUsers();
    }
  };

  const handleReject = async (userId: string) => {
    // For now, rejection just marks as unverified or could delete
    toast.info("Fitur penolakan sedang dikembangkan");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r hidden md:flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <LayoutDashboard className="w-6 h-6" />
            <span>Admin FL2MI</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 py-4">
          <Button 
            variant={activeTab === "overview" ? "secondary" : "ghost"} 
            className="w-full justify-start gap-3 h-11"
            onClick={() => setActiveTab("overview")}
          >
            <LayoutDashboard className="w-4 h-4" />
            Overview
          </Button>
          <Button 
            variant={activeTab === "users" ? "secondary" : "ghost"} 
            className="w-full justify-start gap-3 h-11"
            onClick={() => setActiveTab("users")}
          >
            <Users className="w-4 h-4" />
            User Management
            {users.filter(u => !u.is_verified).length > 0 && (
              <Badge variant="destructive" className="ml-auto rounded-full px-2">
                {users.filter(u => !u.is_verified).length}
              </Badge>
            )}
          </Button>
          <Button 
            variant={activeTab === "content" ? "secondary" : "ghost"} 
            className="w-full justify-start gap-3 h-11"
            onClick={() => setActiveTab("content")}
          >
            <FileText className="w-4 h-4" />
            Content Manager
          </Button>
          <Button 
            variant={activeTab === "logs" ? "secondary" : "ghost"} 
            className="w-full justify-start gap-3 h-11"
            onClick={() => setActiveTab("logs")}
          >
            <History className="w-4 h-4" />
            System Logs
          </Button>
        </nav>

        <div className="p-4 mt-auto border-t">
          <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-muted/20">
        <header className="h-16 bg-card border-b flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Cari data..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-primary/10">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/5 text-primary">AD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Akun Admin</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profil Saya</DropdownMenuItem>
                <DropdownMenuItem>Pengaturan</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={handleLogout}>Log Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === "users" && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">User Management Queue</h1>
                    <p className="text-muted-foreground">Verifikasi pendaftar baru dari universitas.</p>
                  </div>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Tambah User
                  </Button>
                </div>

                <div className="grid gap-6">
                  <Card>
                    <CardHeader className="pb-0">
                      <div className="flex items-center justify-between">
                        <Tabs defaultValue="pending" className="w-[400px]">
                          <TabsList>
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="verified">Verified</TabsTrigger>
                            <TabsTrigger value="all">Semua</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left">
                          <thead className="text-xs uppercase bg-muted/50">
                            <tr>
                              <th className="px-6 py-4 font-medium">Pengguna</th>
                              <th className="px-6 py-4 font-medium">Asal Kampus</th>
                              <th className="px-6 py-4 font-medium">Tanggal Daftar</th>
                              <th className="px-6 py-4 font-medium">Status</th>
                              <th className="px-6 py-4 font-medium text-right">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {users.length === 0 ? (
                              <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground italic">
                                  {loading ? "Memuat data..." : "Belum ada pendaftar baru."}
                                </td>
                              </tr>
                            ) : (
                              users.map((user) => (
                                <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                      <Avatar className="h-8 w-8">
                                        <AvatarFallback className="text-[10px]">{user.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-xs text-muted-foreground">{user.email}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <Badge variant="outline" className="font-normal">
                                      {user.campus_origin || "Belum diisi"}
                                    </Badge>
                                  </td>
                                  <td className="px-6 py-4 text-muted-foreground">
                                    {new Date(user.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                  </td>
                                  <td className="px-6 py-4">
                                    {user.is_verified ? (
                                      <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20">Verified</Badge>
                                    ) : (
                                      <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-amber-500/20">Pending</Badge>
                                    )}
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    {!user.is_verified ? (
                                      <div className="flex items-center justify-end gap-2">
                                        <Button 
                                          size="sm" 
                                          variant="ghost" 
                                          className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                                          onClick={() => handleApprove(user.id)}
                                        >
                                          <CheckCircle className="w-4 h-4 mr-1" />
                                          Approve
                                        </Button>
                                        <Button 
                                          size="sm" 
                                          variant="ghost" 
                                          className="text-destructive hover:bg-destructive/10"
                                          onClick={() => handleReject(user.id)}
                                        >
                                          <XCircle className="w-4 h-4 mr-1" />
                                          Reject
                                        </Button>
                                      </div>
                                    ) : (
                                      <Button size="sm" variant="ghost">
                                        <MoreVertical className="w-4 h-4" />
                                      </Button>
                                    )}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}

            {activeTab === "content" && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-2xl font-bold">Content Manager</h1>
                  <p className="text-muted-foreground">Kelola berita, foto galeri, dan dokumen legislasi.</p>
                </div>

                <Tabs defaultValue="news" className="space-y-6">
                  <TabsList className="bg-muted p-1 rounded-xl">
                    <TabsTrigger value="news" className="rounded-lg px-6">Berita</TabsTrigger>
                    <TabsTrigger value="docs" className="rounded-lg px-6">Legislasi (PDF)</TabsTrigger>
                    <TabsTrigger value="gallery" className="rounded-lg px-6">Galeri</TabsTrigger>
                  </TabsList>

                  <TabsContent value="news" className="space-y-4">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      <Card className="border-dashed flex flex-col items-center justify-center p-12 text-center hover:bg-muted/30 transition-colors cursor-pointer group">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Plus className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold">Tambah Berita</h3>
                        <p className="text-sm text-muted-foreground mt-2">Publikasikan artikel atau pengumuman baru.</p>
                      </Card>
                      {/* Placeholders for existing news */}
                      {[1, 2].map(i => (
                        <Card key={i} className="overflow-hidden group">
                          <div className="aspect-video bg-muted relative">
                             <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                               Thumbnail
                             </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold line-clamp-1">Judul Berita Placeholder {i}</h3>
                            <p className="text-xs text-muted-foreground mt-1">Dipublikasikan 2 hari yang lalu</p>
                            <div className="mt-4 flex gap-2">
                              <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                              <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">Hapus</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="docs">
                     <Card>
                       <CardContent className="p-12 text-center text-muted-foreground italic">
                          Fitur manajemen dokumen legislasi sedang dikonfigurasi.
                       </CardContent>
                     </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}

            {activeTab === "logs" && (
              <motion.div
                key="logs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-2xl font-bold">System Logs</h1>
                  <p className="text-muted-foreground">Audit internal aktivitas organisasi.</p>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {[
                        { action: "Login Admin", user: "admin.jatim@fl2mi.or.id", time: "Sekarang", icon: <CheckCircle className="w-4 h-4 text-emerald-500" /> },
                        { action: "Update Konten Hero", user: "admin.jatim@fl2mi.or.id", time: "2 jam yang lalu", icon: <FileText className="w-4 h-4 text-blue-500" /> },
                        { action: "Verifikasi User: Ahmad", user: "admin.jatim@fl2mi.or.id", time: "5 jam yang lalu", icon: <Users className="w-4 h-4 text-purple-500" /> },
                      ].map((log, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 hover:bg-muted/10">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            {log.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{log.action}</div>
                            <div className="text-xs text-muted-foreground">Oleh {log.user}</div>
                          </div>
                          <div className="text-xs text-muted-foreground">{log.time}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <h1 className="text-2xl font-bold">Dashboard Overview</h1>
                  <p className="text-muted-foreground">Statistik real-time platform FL2MI Jatim.</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: "Total User", value: users.length, icon: <Users />, color: "bg-blue-500" },
                    { label: "Pending Verif", value: users.filter(u => !u.is_verified).length, icon: <Bell />, color: "bg-amber-500" },
                    { label: "Dokumen PDF", value: "24", icon: <FileText />, color: "bg-emerald-500" },
                    { label: "Kunjungan Hari Ini", value: "152", icon: <LayoutDashboard />, color: "bg-purple-500" },
                  ].map((stat, i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                          </div>
                          <div className={`w-12 h-12 rounded-xl ${stat.color} text-white flex items-center justify-center shadow-lg shadow-black/5`}>
                            {stat.icon}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                   <Card>
                     <CardHeader>
                       <CardTitle>Aktivitas Pendaftaran</CardTitle>
                       <CardDescription>Tren pendaftar baru dalam 30 hari terakhir.</CardDescription>
                     </CardHeader>
                     <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground italic">
                        [ Grafik Tren Pendaftaran ]
                     </CardContent>
                   </Card>
                   <Card>
                     <CardHeader>
                       <CardTitle>Konten Terpopuler</CardTitle>
                       <CardDescription>Dokumen legislasi yang paling banyak diunduh.</CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-4">
                           {[1, 2, 3].map(i => (
                             <div key={i} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">{i}</div>
                                <div className="flex-1 text-sm font-medium">UU KM Universitas Brawijaya 2024</div>
                                <div className="text-xs text-muted-foreground">120 Downloads</div>
                             </div>
                           ))}
                        </div>
                     </CardContent>
                   </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
