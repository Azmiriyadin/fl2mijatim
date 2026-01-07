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
  Plus,
  Trash2,
  Edit,
  Image as ImageIcon,
  ExternalLink,
  Download,
  Eye,
  Upload,
  Loader2,
  Calendar,
  Megaphone,
  MapPin,
  Clock,
  Ticket
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState<any[]>([]);
  const [docs, setDocs] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [universities, setUniversities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  // Form States
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deletingItem, setDeletingItem] = useState<{table: string, id: string, fileUrl?: string} | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleFileUpload = async (file: File, bucket: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchUsers(),
      fetchDocs(),
      fetchGallery(),
      fetchEvents(),
      fetchLogs(),
      fetchUniversities()
    ]);
    setLoading(false);
  };

  const fetchUsers = async () => {
    const { data } = await supabase.from("users").select("*").order("created_at", { ascending: false });
    setUsers(data || []);
  };

  const fetchDocs = async () => {
    const { data } = await supabase.from("documents").select("*").order("created_at", { ascending: false });
    setDocs(data || []);
  };

  const fetchGallery = async () => {
    const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
    setGallery(data || []);
  };

  const fetchEvents = async () => {
    const { data } = await supabase.from("events").select("*").order("date", { ascending: false });
    setEvents(data || []);
  };

  const fetchLogs = async () => {
    const { data } = await supabase.from("system_logs").select("*").order("created_at", { ascending: false }).limit(20);
    setLogs(data || []);
  };

  const fetchUniversities = async () => {
    const { data } = await supabase.from("universities").select("*").order("name");
    setUniversities(data || []);
  };

  const logAction = async (action: string, details: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("system_logs").insert({
      action,
      user_email: user?.email || "system",
      details
    });
    fetchLogs();
  };

  // CRUD Handlers
  const handleApprove = async (userId: string) => {
    const { error } = await supabase.from("users").update({ is_verified: true }).eq("id", userId);
    if (error) toast.error("Gagal memverifikasi user");
    else {
      toast.success("User berhasil diverifikasi");
      logAction("Verifikasi User", `User ID: ${userId} telah diverifikasi`);
      fetchUsers();
    }
  };

  const handleDelete = (table: string, id: string, fileUrl?: string) => {
    setDeletingItem({ table, id, fileUrl });
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingItem) return;
    
    setIsUploading(true);
    try {
      // 1. Delete from Storage if fileUrl exists
      if (deletingItem.fileUrl) {
        try {
          const urlParts = deletingItem.fileUrl.split('/');
          const fileName = urlParts[urlParts.length - 1];
          const bucket = deletingItem.table === "documents" ? "documents" : 
                         deletingItem.table === "events" ? "news" : "gallery";
          
          await supabase.storage.from(bucket).remove([fileName]);
        } catch (storageErr) {
          console.error("Storage delete error:", storageErr);
        }
      }

      // 2. Delete from Database
      const { error } = await supabase.from(deletingItem.table).delete().eq("id", deletingItem.id);
      
      if (error) throw error;

      toast.success("Data berhasil dihapus");
      logAction("Hapus Data", `Menghapus data dari tabel ${deletingItem.table} dengan ID ${deletingItem.id}`);
      fetchAllData();
    } catch (error: any) {
      toast.error("Gagal menghapus data: " + error.message);
    } finally {
      setIsUploading(false);
      setIsDeleteDialogOpen(false);
      setDeletingItem(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const table = activeTab === "users" ? "users" : 
                  activeTab === "content" ? (formData.contentType === "events" ? "events" : formData.contentType === "docs" ? "documents" : "gallery") : "";
    
    if (!table) return;

    setIsUploading(true);
    try {
      // Clean up data before sending to DB
      const { contentType, id, created_at, ...cleanData } = formData;
      const dbData: any = { ...cleanData };
      
      // Handle File Upload if selected
      if (selectedFile) {
        const bucket = contentType === "events" ? "news" : contentType === "docs" ? "documents" : "gallery";
        const publicUrl = await handleFileUpload(selectedFile, bucket);
        
        if (contentType === "events" || contentType === "gallery") {
          dbData.image_url = publicUrl;
        } else if (contentType === "docs") {
          dbData.file_url = publicUrl;
        }
      }

      let res;
      if (editingItem) {
        res = await supabase.from(table).update(dbData).eq("id", editingItem.id);
      } else {
        res = await supabase.from(table).insert(dbData);
      }

      if (res.error) {
        toast.error("Gagal menyimpan data: " + res.error.message);
      } else {
        toast.success("Data berhasil disimpan");
        logAction(editingItem ? "Update Data" : "Tambah Data", `Tabel: ${table}`);
        setIsDialogOpen(false);
        setEditingItem(null);
        setFormData({});
        setSelectedFile(null);
        fetchAllData();
      }
    } catch (error: any) {
      toast.error("Error: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const openAddDialog = (type: string) => {
    setEditingItem(null);
    setFormData({ contentType: type });
    setSelectedFile(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: any, type: string) => {
    setEditingItem(item);
    setFormData({ ...item, contentType: type });
    setSelectedFile(null);
    setIsDialogOpen(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleViewFile = (url: string) => {
    if (!url) return toast.error("File tidak tersedia");
    window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url } }, "*");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
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
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div>
                  <h1 className="text-2xl font-bold">Dashboard Overview</h1>
                  <p className="text-muted-foreground">Statistik real-time platform FL2MI Jatim.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: "Total User", value: users.length, icon: <Users />, color: "bg-blue-500" },
                    { label: "Pending Verif", value: users.filter(u => !u.is_verified).length, icon: <Bell />, color: "bg-amber-500" },
                    { label: "Dokumen PDF", value: docs.length, icon: <FileText />, color: "bg-emerald-500" },
                    { label: "Kegiatan & Berita", value: events.length, icon: <Calendar />, color: "bg-purple-500" },
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
                     <CardHeader><CardTitle>Aktivitas Pendaftaran</CardTitle></CardHeader>
                     <CardContent className="h-[300px] flex flex-col justify-end space-y-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold">{users.filter(u => new Date(u.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}</span>
                          <span className="text-sm text-muted-foreground">User baru minggu ini</span>
                        </div>
                        <div className="w-full h-32 bg-muted/50 rounded-lg relative overflow-hidden">
                           <div className="absolute inset-0 flex items-end px-4 gap-2">
                              {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                                <div key={i} className="flex-1 bg-primary/20 rounded-t-sm" style={{ height: `${h}%` }} />
                              ))}
                           </div>
                        </div>
                     </CardContent>
                   </Card>
                   <Card>
                     <CardHeader><CardTitle>Konten Terpopuler</CardTitle></CardHeader>
                     <CardContent>
                        <div className="space-y-4">
                           {docs.slice(0, 5).map((doc, i) => (
                             <div key={i} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">{i+1}</div>
                                <div className="flex-1 text-sm font-medium truncate">{doc.title}</div>
                                <div className="text-xs text-muted-foreground">{doc.year}</div>
                             </div>
                           ))}
                        </div>
                     </CardContent>
                   </Card>
                </div>
              </motion.div>
            )}

            {/* USERS TAB */}
            {activeTab === "users" && (
              <motion.div key="users" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <p className="text-muted-foreground">Verifikasi pendaftar baru dari universitas.</p>
                  </div>
                  <Button className="gap-2" onClick={() => openAddDialog("users")}>
                    <Plus className="w-4 h-4" /> Tambah User
                  </Button>
                </div>
                <Card>
                  <CardContent className="p-0">
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-muted/50 border-b">
                          <tr>
                            <th className="px-6 py-4">Pengguna</th>
                            <th className="px-6 py-4">Kampus</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {users.map((user) => (
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
                              <td className="px-6 py-4"><Badge variant="outline">{user.campus_origin}</Badge></td>
                              <td className="px-6 py-4 font-mono text-xs">{user.role}</td>
                              <td className="px-6 py-4">
                                {user.is_verified ? (
                                  <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Verified</Badge>
                                ) : (
                                  <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-amber-500/20">Pending</Badge>
                                )}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  {!user.is_verified && (
                                    <Button size="icon" variant="ghost" className="text-emerald-600 hover:bg-emerald-50" onClick={() => handleApprove(user.id)}><CheckCircle className="w-4 h-4" /></Button>
                                  )}
                                  <Button size="icon" variant="ghost" onClick={() => openEditDialog(user, "users")}><Edit className="w-4 h-4" /></Button>
                                  <Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete("users", user.id)}><Trash2 className="w-4 h-4" /></Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* CONTENT TAB */}
            {activeTab === "content" && (
              <motion.div key="content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">Content Manager</h1>
                    <p className="text-muted-foreground">Kelola berita, dokumen, dan galeri.</p>
                  </div>
                </div>

                <Tabs defaultValue="events" className="space-y-6">
                  <TabsList className="bg-muted p-1 rounded-xl">
                    <TabsTrigger value="events" className="rounded-lg px-6">Kegiatan</TabsTrigger>
                    <TabsTrigger value="docs" className="rounded-lg px-6">Legislasi (PDF)</TabsTrigger>
                    <TabsTrigger value="gallery" className="rounded-lg px-6">Galeri</TabsTrigger>
                  </TabsList>

                  <TabsContent value="events" className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-muted-foreground">Kelola semua konten yang tampil di halaman Informasi & Kegiatan.</p>
                      <Button size="sm" className="gap-2" onClick={() => openAddDialog("events")}>
                        <Plus className="w-4 h-4" /> Tambah Berita / Kegiatan
                      </Button>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {events.map(item => (
                        <Card key={item.id} className="overflow-hidden group flex flex-col">
                          <div className="aspect-video bg-muted relative">
                            {item.image_url ? (
                              <img src={item.image_url} className="w-full h-full object-cover" />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                <ImageIcon className="w-8 h-8 opacity-20" />
                              </div>
                            )}
                            <div className="absolute top-2 left-2">
                              <Badge className={
                                item.type === 'Event' ? 'bg-blue-500' : 
                                item.type === 'Berita' ? 'bg-emerald-500' : 
                                item.type === 'Pengumuman' ? 'bg-amber-500' : 'bg-purple-500'
                              }>
                                {item.type}
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-4 flex-1 flex flex-col">
                            <h3 className="font-semibold line-clamp-2 mb-2">{item.title}</h3>
                            <div className="space-y-1 mb-4">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                              </div>
                            </div>
                            <div className="mt-auto pt-4 flex gap-2 border-t">
                              <Button variant="outline" size="sm" className="flex-1" onClick={() => openEditDialog(item, "events")}><Edit className="w-3 h-3 mr-1" /> Edit</Button>
                              <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete("events", item.id, item.image_url)}><Trash2 className="w-3 h-3" /></Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="docs">
                    <div className="flex justify-end mb-4">
                      <Button className="gap-2" onClick={() => openAddDialog("docs")}><Plus className="w-4 h-4" /> Tambah Dokumen</Button>
                    </div>
                    <Card>
                      <CardContent className="p-0">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-muted/50 border-b">
                            <tr>
                              <th className="px-6 py-4">Judul</th>
                              <th className="px-6 py-4">Tahun</th>
                              <th className="px-6 py-4">Tipe</th>
                              <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {docs.map(doc => (
                              <tr key={doc.id} className="hover:bg-muted/30">
                                <td className="px-6 py-4 font-medium">{doc.title}</td>
                                <td className="px-6 py-4">{doc.year}</td>
                                <td className="px-6 py-4"><Badge variant="outline">{doc.type}</Badge></td>
                                <td className="px-6 py-4 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <Button size="icon" variant="ghost" onClick={() => handleViewFile(doc.file_url)}><Eye className="w-4 h-4" /></Button>
                                    <Button size="icon" variant="ghost" onClick={() => openEditDialog(doc, "docs")}><Edit className="w-4 h-4" /></Button>
                                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete("documents", doc.id, doc.file_url)}><Trash2 className="w-4 h-4" /></Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="gallery" className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                       <Card className="border-dashed flex flex-col items-center justify-center aspect-square cursor-pointer hover:bg-muted/30" onClick={() => openAddDialog("gallery")}>
                          <Plus className="w-6 h-6 text-primary mb-2" />
                          <span className="text-xs font-medium">Tambah Foto</span>
                       </Card>
                       {gallery.map(item => (
                         <div key={item.id} className="relative aspect-square rounded-xl overflow-hidden group">
                           <img src={item.image_url} className="w-full h-full object-cover" />
                           <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                             <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => openEditDialog(item, "gallery")}><Edit className="w-4 h-4" /></Button>
                             <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => handleDelete("gallery", item.id, item.image_url)}><Trash2 className="w-4 h-4" /></Button>
                           </div>
                         </div>
                       ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}

            {/* LOGS TAB */}
            {activeTab === "logs" && (
              <motion.div key="logs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold">System Logs</h1>
                  <p className="text-muted-foreground">Audit internal aktivitas organisasi.</p>
                </div>
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {logs.map((log, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 hover:bg-muted/10">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            {log.action.includes("Login") ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <FileText className="w-4 h-4 text-blue-500" />}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{log.action}</div>
                            <div className="text-xs text-muted-foreground">{log.details} - Oleh {log.user_email}</div>
                          </div>
                          <div className="text-xs text-muted-foreground">{new Date(log.created_at).toLocaleString('id-ID')}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* CRUD DIALOG */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit' : 'Tambah'} {
              formData.contentType === 'docs' ? 'Dokumen' : 
              formData.contentType === 'users' ? 'User' : 
              formData.contentType === 'events' ? 'Kegiatan / Berita' : 'Galeri'
            }</DialogTitle>
            <DialogDescription>Pastikan data yang Anda masukkan sudah benar.</DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSave} className="space-y-4 py-4">
            {formData.contentType === 'users' && (
              <>
                <div className="space-y-2">
                  <Label>Nama Lengkap</Label>
                  <Input value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} required disabled={!!editingItem} />
                </div>
                <div className="space-y-2">
                  <Label>Asal Kampus</Label>
                  <Select value={formData.campus_origin || ''} onValueChange={val => setFormData({...formData, campus_origin: val})}>
                    <SelectTrigger><SelectValue placeholder="Pilih Kampus" /></SelectTrigger>
                    <SelectContent>
                      {universities.map(u => <SelectItem key={u.id} value={u.name}>{u.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={formData.role || 'USER'} onValueChange={val => setFormData({...formData, role: val})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">User Member</SelectItem>
                      <SelectItem value="ADMIN">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {formData.contentType === 'events' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Judul Kegiatan / Berita</Label>
                    <Input value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipe Konten</Label>
                    <Select value={formData.type || 'Event'} onValueChange={val => setFormData({...formData, type: val})}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Event">Event</SelectItem>
                        <SelectItem value="Berita">Berita</SelectItem>
                        <SelectItem value="Pengumuman">Pengumuman</SelectItem>
                        <SelectItem value="Press release">Press Release</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tanggal</Label>
                    <Input type="date" value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''} onChange={e => setFormData({...formData, date: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Waktu (Contoh: 08:00 - 17:00 WIB)</Label>
                    <Input value={formData.time_range || ''} onChange={e => setFormData({...formData, time_range: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Lokasi</Label>
                    <Input value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Kuota / Peserta</Label>
                    <Input type="number" value={formData.quota || ''} onChange={e => setFormData({...formData, quota: parseInt(e.target.value)})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Link Pendaftaran / Action</Label>
                  <Input value={formData.registration_link || ''} onChange={e => setFormData({...formData, registration_link: e.target.value})} placeholder="https://..." />
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={formData.status || 'Pendaftaran Dibuka'} onValueChange={val => setFormData({...formData, status: val})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pendaftaran Dibuka">Pendaftaran Dibuka</SelectItem>
                      <SelectItem value="Segera Hadir">Segera Hadir</SelectItem>
                      <SelectItem value="Selesai">Selesai</SelectItem>
                      <SelectItem value="Dibatalkan">Dibatalkan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Gambar Banner / Thumbnail</Label>
                  <div className="flex flex-col gap-4">
                    {formData.image_url && !selectedFile && (
                      <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-muted">
                        <img src={formData.image_url} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="event-image" className="cursor-pointer">
                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors">
                          <Upload className="w-8 h-8 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {selectedFile ? selectedFile.name : 'Pilih Gambar'}
                          </span>
                        </div>
                      </Label>
                      <Input 
                        id="event-image" 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Ringkasan Singkat</Label>
                  <Input value={formData.excerpt || ''} onChange={e => setFormData({...formData, excerpt: e.target.value})} placeholder="Deskripsi pendek untuk kartu..." />
                </div>

                <div className="space-y-2">
                  <Label>Konten Lengkap</Label>
                  <Textarea className="h-32" value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} />
                </div>
              </>
            )}

            {formData.contentType === 'docs' && (
              <>
                <div className="space-y-2">
                  <Label>Judul Dokumen</Label>
                  <Input value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tahun</Label>
                    <Input type="number" value={formData.year || new Date().getFullYear()} onChange={e => setFormData({...formData, year: parseInt(e.target.value)})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipe</Label>
                    <Select value={formData.type || ''} onValueChange={val => setFormData({...formData, type: val})}>
                      <SelectTrigger><SelectValue placeholder="Pilih Tipe" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UU KM">UU KM</SelectItem>
                        <SelectItem value="AD/ART">AD/ART</SelectItem>
                        <SelectItem value="SOP">SOP</SelectItem>
                        <SelectItem value="PERPU">PERPU</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>File Dokumen (PDF)</Label>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="doc-file" className="cursor-pointer">
                      <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors">
                        <FileText className="w-8 h-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {selectedFile ? selectedFile.name : formData.file_url ? 'Ganti file PDF' : 'Klik untuk upload PDF'}
                        </span>
                      </div>
                    </Label>
                    <Input 
                      id="doc-file" 
                      type="file" 
                      className="hidden" 
                      accept=".pdf"
                      onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                    />
                  </div>
                </div>
              </>
            )}

            {formData.contentType === 'gallery' && (
              <>
                <div className="space-y-2">
                  <Label>Judul Foto</Label>
                  <Input value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label>Upload Foto</Label>
                  <div className="flex flex-col gap-4">
                    {formData.image_url && !selectedFile && (
                      <div className="relative aspect-square w-32 rounded-lg overflow-hidden bg-muted mx-auto">
                        <img src={formData.image_url} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="gallery-image" className="cursor-pointer">
                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors">
                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {selectedFile ? selectedFile.name : 'Pilih Foto'}
                          </span>
                        </div>
                      </Label>
                      <Input 
                        id="gallery-image" 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Kategori</Label>
                  <Input value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="Gathering, Raker, Event..." />
                </div>
              </>
            )}

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isUploading}>Batal</Button>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Menyimpan...</> : 'Simpan Perubahan'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="w-5 h-5" />
              Konfirmasi Hapus
            </DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan dan file terkait akan dihapus permanen.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isUploading}>
              Batal
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isUploading}>
              {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Ya, Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
