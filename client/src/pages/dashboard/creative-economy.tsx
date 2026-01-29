import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  MoreHorizontal, 
  Filter, 
  Lightbulb,
  TrendingUp,
  BarChart3,
  Download
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const SECTORS = [
  "Pengembangan Permainan", "Arsitektur", "Desain Interior", "Musik", "Desain Produk",
  "Fashion", "Desain Komunikasi Visual", "Kuliner", "Film, Animasi dan Video",
  "Fotografi", "Kriya", "Televisi dan Radio", "Periklanan", "Seni Pertunjukan",
  "Penerbitan", "Seni Rupa", "Aplikasi"
];

const KECAMATAN_BOGOR = [
  "Babakan Madang", "Bojong Gede", "Caringin", "Cariu", "Ciampea", "Ciawi", 
  "Cibinong", "Cibungbulang", "Cigombong", "Cigudeg", "Cijeruk", "Cileungsi", 
  "Ciomas", "Cisarua", "Ciseeng", "Citeureup", "Dramaga", "Gunung Putri", 
  "Gunung Sindur", "Jasinga", "Jonggol", "Kemang", "Klapanunggal", "Leuwiliang", 
  "Leuwisadeng", "Megamendung", "Nanggung", "Pamijahan", "Parung", "Parung Panjang", 
  "Rancabungur", "Rumpin", "Sukajaya", "Sukamakmur", "Sukaraja", "Tajurhalang", 
  "Tamansari", "Tanjungsari", "Tenjo", "Tenjolaya"
];

const INITIAL_DATA = [
  { id: "1", name: "Batik Bogor Tradisiku", sector: "Fashion", kecamatan: "Tanah Sareal", owner: "Siti Fatimah", employees: 15, revenue: "Rp 50jt/bln" },
  { id: "2", name: "Bogor Raincake", sector: "Kuliner", kecamatan: "Bogor Tengah", owner: "Syahrini", employees: 40, revenue: "Rp 250jt/bln" },
  { id: "3", name: "Kerajinan Bambu Kreatif", sector: "Kriya", kecamatan: "Ciampea", owner: "Ahmad", employees: 8, revenue: "Rp 15jt/bln" },
  { id: "4", name: "Studio Animasi Bogor", sector: "Film, Animasi dan Video", kecamatan: "Cibinong", owner: "Budi", employees: 25, revenue: "Rp 120jt/bln" },
];

const MONTHLY_VISITS = [
  { month: "Jan", visits: 1200 },
  { month: "Feb", visits: 1500 },
  { month: "Mar", visits: 1100 },
  { month: "Apr", visits: 1800 },
  { month: "May", visits: 2200 },
  { month: "Jun", visits: 2500 },
];

export default function CreativeEconomyPage() {
  const [data, setData] = useState(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSector, setFilterSector] = useState<string | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { toast } = useToast();

  const filteredData = data.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = filterSector ? item.sector === filterSector : true;
    return matchesSearch && matchesSector;
  });

  const handleDelete = (id: string) => {
    setData(data.filter(item => item.id !== id));
    toast({
      title: "Berhasil",
      description: "Data pelaku ekraf berhasil dihapus.",
      variant: "destructive"
    });
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newItem = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      sector: formData.get("sector") as string,
      kecamatan: formData.get("kecamatan") as string,
      owner: formData.get("owner") as string,
      employees: parseInt(formData.get("employees") as string) || 0,
      revenue: `Rp ${formData.get("revenue")}jt/bln`,
    };
    
    setData([...data, newItem]);
    setIsAddOpen(false);
    toast({ title: "Berhasil", description: "Pelaku Ekraf baru berhasil ditambahkan" });
  };

  const handleDownload = () => {
    toast({
      title: "Mengunduh",
      description: "Data Ekonomi Kreatif sedang diunduh dalam format Excel.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ekonomi Kreatif</h1>
          <p className="text-muted-foreground">Data pelaku usaha ekonomi kreatif Kabupaten Bogor.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button variant="outline" onClick={() => setShowReport(!showReport)} className="gap-2">
            <BarChart3 className="h-4 w-4" />
            {showReport ? "Tutup Laporan" : "Lihat Laporan"}
          </Button>
        </div>
      </div>

      {showReport && (
        <Card className="animate-in fade-in slide-in-from-top-4">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Laporan Kunjungan Gerai Ekraf (Bulanan)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_VISITS}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="visits" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex flex-1 gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama usaha/pemilik..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" /> Filter Sektor
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="max-h-80 overflow-y-auto">
              {SECTORS.map(s => (
                <DropdownMenuCheckboxItem
                  key={s}
                  checked={filterSector === s}
                  onCheckedChange={(checked) => setFilterSector(checked ? s : null)}
                >
                  {s}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Tambah Pelaku Ekraf
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Pelaku Ekraf</DialogTitle>
              <DialogDescription>Masukkan data pelaku ekonomi kreatif baru.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Usaha</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sector">Sektor</Label>
                  <Select name="sector" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Sektor" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {SECTORS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kecamatan">Kecamatan</Label>
                  <Select name="kecamatan" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kecamatan" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {KECAMATAN_BOGOR.map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner">Nama Pemilik</Label>
                <Input id="owner" name="owner" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employees">Jumlah Karyawan</Label>
                  <Input id="employees" name="employees" type="number" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="revenue">Omzet (Juta/Bln)</Label>
                  <Input id="revenue" name="revenue" type="number" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Simpan</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary/20">
            <TableRow>
              <TableHead>Nama Usaha</TableHead>
              <TableHead>Sektor</TableHead>
              <TableHead>Pemilik</TableHead>
              <TableHead>Kecamatan</TableHead>
              <TableHead>Karyawan</TableHead>
              <TableHead>Omzet</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell><Badge variant="outline">{row.sector}</Badge></TableCell>
                <TableCell>{row.owner}</TableCell>
                <TableCell>{row.kecamatan}</TableCell>
                <TableCell>{row.employees}</TableCell>
                <TableCell>{row.revenue}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(row.id)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
