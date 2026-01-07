"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  UserCheck, 
  FileText, 
  LayoutDashboard, 
  Settings, 
  LogOut,
  ChevronRight,
  Search,
  Filter,
  MoreVertical,
  ShieldCheck,
  ShieldAlert,
  Globe,
  BarChart3,
  Star,
  Newspaper,
  Save,
  Plus,
  Trash2,
  Image as ImageIcon
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminDashboard() {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [profiles, setProfiles] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any[]>([]);
  const [homeStats, setHomeStats] = useState<any[]>([]);
  const [homeFeatures, setHomeFeatures] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalDocuments: 0,
    totalUniversities: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && (!user || role !== 'superadmin')) {
      router.push("/");
    }
  }, [user, role, loading, router]);

  useEffect(() => {
    if (user && role === 'superadmin') {
      fetchData();
      fetchContent();
    }
  }, [user, role]);

  const fetchData = async () => {
    const { data: profilesData } = await supabase
      .from('profiles')
      .select('*, universities(name)')
      .order('created_at', { ascending: false });
    
    if (profilesData) setProfiles(profilesData);

    const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
    const { count: docsCount } = await supabase.from('documents').select('*', { count: 'exact', head: true });
    const { count: univsCount } = await supabase.from('universities').select('*', { count: 'exact', head: true });

    setDashboardStats({
      totalUsers: usersCount || 0,
      totalDocuments: docsCount || 0,
      totalUniversities: univsCount || 0,
    });
  };

  const fetchContent = async () => {
    const { data: settings } = await supabase.from('site_settings').select('*');
    if (settings) setSiteSettings(settings);

    const { data: stats } = await supabase.from('home_stats').select('*').order('display_order');
    if (stats) setHomeStats(stats);

    const { data: features } = await supabase.from('home_features').select('*').order('display_order');
    if (features) setHomeFeatures(features);

    const { data: newsData } = await supabase.from('news_articles').select('*').order('created_at', { ascending: false });
    if (newsData) setNews(newsData);
  };

  const handleUpdateSetting = async (key: string, value: string) => {
    setIsSaving(true);
    await supabase.from('site_settings').upsert({ key, value });
    fetchContent();
    setIsSaving(false);
  };

  const handleUpdateStat = async (id: string, updates: any) => {
    setIsSaving(true);
    await supabase.from('home_stats').update(updates).eq('id', id);
    fetchContent();
    setIsSaving(false);
  };

  const handleUpdateFeature = async (id: string, updates: any) => {
    setIsSaving(true);
    await supabase.from('home_features').update(updates).eq('id', id);
    fetchContent();
    setIsSaving(false);
  };

  const filteredProfiles = profiles.filter(p => 
    p.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading || !user || role !== 'superadmin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Manajemen User", icon: Users },
    { id: "site", label: "Konten Situs", icon: Globe },
    { id: "news", label: "Berita & Event", icon: Newspaper },
    { id: "settings", label: "Pengaturan", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">F</span>
            </div>
            <span className="font-bold text-lg">Admin Panel</span>
          </div>
          
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Button 
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"} 
                className="w-full justify-start gap-3"
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t">
          <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => supabase.auth.signOut()}>
            <LogOut className="w-4 h-4" />
            Keluar
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight capitalize">{activeTab}</h1>
            <p className="text-muted-foreground">Kelola portal FL2MI Jawa Timur.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => window.open("/", "_blank")}>Lihat Situs</Button>
            {activeTab === 'news' && (
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Tambah Berita
              </Button>
            )}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid sm:grid-cols-3 gap-6">
                <Card className="border-none shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats.totalUsers}</div>
                    <p className="text-xs text-muted-foreground mt-1">Terdaftar di portal</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Dokumen Legislasi</CardTitle>
                    <FileText className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats.totalDocuments}</div>
                    <p className="text-xs text-muted-foreground mt-1">UU KM/KBM terarsip</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Universitas</CardTitle>
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats.totalUniversities}</div>
                    <p className="text-xs text-muted-foreground mt-1">Mapping DPM/BPM se-Jatim</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Users Table */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Daftar Pengguna Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Asal Universitas</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profiles.slice(0, 5).map((profile) => (
                        <TableRow key={profile.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={`https://avatar.vercel.sh/${profile.email}`} />
                                <AvatarFallback>{profile.full_name?.[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{profile.full_name || 'Anonymous'}</p>
                                <p className="text-xs text-muted-foreground">{profile.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{profile.universities?.name || 'Belum diset'}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="text-[10px] uppercase">Aktif</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "users" && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Semua Pengguna</CardTitle>
                      <CardDescription>Kelola akun dan verifikasi delegasi kampus.</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          placeholder="Cari user..." 
                          className="pl-9 w-64" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Asal Universitas</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProfiles.map((profile) => (
                        <TableRow key={profile.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={`https://avatar.vercel.sh/${profile.email}`} />
                                <AvatarFallback>{profile.full_name?.[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{profile.full_name || 'Anonymous'}</p>
                                <p className="text-xs text-muted-foreground">{profile.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{profile.universities?.name || 'Belum diset'}</TableCell>
                          <TableCell>
                            <Badge variant={profile.role === 'superadmin' ? 'default' : 'secondary'} className="capitalize">
                              {profile.role?.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                              <span className="text-sm">Aktif</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "site" && (
            <motion.div
              key="site"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <Tabs defaultValue="hero">
                <TabsList className="mb-4">
                  <TabsTrigger value="hero">Hero Section</TabsTrigger>
                  <TabsTrigger value="stats">Statistik</TabsTrigger>
                  <TabsTrigger value="features">Fitur Utama</TabsTrigger>
                </TabsList>

                <TabsContent value="hero">
                  <Card className="border-none shadow-lg">
                    <CardHeader>
                      <CardTitle>Hero Section</CardTitle>
                      <CardDescription>Atur teks utama pada halaman depan.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {['hero_title_1', 'hero_title_2', 'hero_title_3'].map((key) => (
                        <div key={key} className="space-y-2">
                          <Label className="capitalize">{key.replace(/_/g, ' ')}</Label>
                          <div className="flex gap-2">
                            <Input 
                              defaultValue={siteSettings.find(s => s.key === key)?.value}
                              onBlur={(e) => handleUpdateSetting(key, e.target.value)}
                            />
                          </div>
                        </div>
                      ))}
                      <div className="space-y-2">
                        <Label>Hero Subtitle</Label>
                        <Textarea 
                          defaultValue={siteSettings.find(s => s.key === 'hero_subtitle')?.value}
                          onBlur={(e) => handleUpdateSetting('hero_subtitle', e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="stats">
                  <div className="grid md:grid-cols-2 gap-6">
                    {homeStats.map((stat) => (
                      <Card key={stat.id} className="border-none shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center justify-between">
                            Statistik #{stat.display_order}
                            <BarChart3 className="w-4 h-4 text-muted-foreground" />
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-1">
                            <Label>Label</Label>
                            <Input 
                              defaultValue={stat.label}
                              onBlur={(e) => handleUpdateStat(stat.id, { label: e.target.value })}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>Value</Label>
                            <Input 
                              defaultValue={stat.value}
                              onBlur={(e) => handleUpdateStat(stat.id, { value: e.target.value })}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label>Icon Name (Lucide)</Label>
                            <Input 
                              defaultValue={stat.icon}
                              onBlur={(e) => handleUpdateStat(stat.id, { icon: e.target.value })}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="features">
                  <div className="space-y-6">
                    {homeFeatures.map((feature) => (
                      <Card key={feature.id} className="border-none shadow-lg">
                        <CardContent className="pt-6">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <Label>Judul Fitur</Label>
                                <Input 
                                  defaultValue={feature.title}
                                  onBlur={(e) => handleUpdateFeature(feature.id, { title: e.target.value })}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label>Deskripsi Singkat</Label>
                                <Textarea 
                                  defaultValue={feature.description}
                                  onBlur={(e) => handleUpdateFeature(feature.id, { description: e.target.value })}
                                />
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <Label>Icon (Lucide)</Label>
                                <Input 
                                  defaultValue={feature.icon}
                                  onBlur={(e) => handleUpdateFeature(feature.id, { icon: e.target.value })}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label>Link (href)</Label>
                                <Input 
                                  defaultValue={feature.href}
                                  onBlur={(e) => handleUpdateFeature(feature.id, { href: e.target.value })}
                                />
                              </div>
                              <div className="space-y-1">
                                <Label>Gradient Color Class</Label>
                                <Input 
                                  defaultValue={feature.color}
                                  onBlur={(e) => handleUpdateFeature(feature.id, { color: e.target.value })}
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}

          {activeTab === "news" && (
            <motion.div
              key="news"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Daftar Berita</CardTitle>
                  <CardDescription>Kelola artikel dan pengumuman kegiatan.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Judul</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {news.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.category || 'Berita'}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(item.created_at).toLocaleDateString('id-ID')}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon"><Settings className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {news.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                            Belum ada berita.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Akun Admin</CardTitle>
                  <CardDescription>Kelola kredensial dan akses admin.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <ShieldCheck className="w-10 h-10 text-primary" />
                    <div>
                      <p className="font-bold">Super Admin Access</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Nama Lengkap</Label>
                      <Input defaultValue="Admin Korwil Jatim" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Password Baru</Label>
                      <Input type="password" placeholder="••••••••" />
                      <p className="text-xs text-muted-foreground">Kosongkan jika tidak ingin mengubah password.</p>
                    </div>
                    <Button className="gap-2">
                      <Save className="w-4 h-4" />
                      Simpan Perubahan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
